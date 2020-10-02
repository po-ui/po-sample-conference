import { Injectable, NotFoundException } from '@nestjs/common';
import { Count } from 'src/core/interfaces/collection.interface';
import { Lecture, Lectures } from 'src/lectures/lectures.interface';
import { Utils } from 'src/utils/utils';
import { speakers } from './db/speakers.data';
import { Speaker, Speakers, SpeakersAPI } from './speakers.interface';

@Injectable()
export class SpeakersService {
  speakers = speakers;

  private getFullSpeaker(speaker: Speaker): Speaker {
    const lectures = this.getLectures(speaker.id) ?? [];
    return { ...speaker, lectures };
  }

  getSpeakers(search?: string, page?: string, pageSize?: string): SpeakersAPI {
    let filteredSpeakers = this.filter(search);
    filteredSpeakers = this.paginate(
      filteredSpeakers,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    filteredSpeakers = filteredSpeakers.map(speaker =>
      this.getFullSpeaker(speaker),
    );

    return {
      items: filteredSpeakers,
      hasNext:
        this.speakers.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getSpeaker(id: string): Speaker {
    const speaker = this.speakers.find(speaker => speaker.id === id);
    if (!speaker) {
      return {};
    }
    return this.getFullSpeaker(speaker);
  }

  delete(id: string, softDelete = true): { message: string } {
    const index = this.speakers.findIndex(speaker => speaker.id === id);

    if (index === -1) {
      throw new NotFoundException(`Speaker ${id} não existe!`);
    }

    if (softDelete) {
      this.speakers[index] = Utils.softDelete(this.speakers[index]);
    } else {
      this.speakers = this.speakers.filter(
        speakersItem => speakersItem.id !== id,
      );
    }

    return { message: 'Speaker removida com sucesso' };
  }

  deleteAll(speakersToDelete: Speakers): void {
    speakersToDelete.forEach(speaker => this.delete(speaker.id));
  }

  save(speaker: Speaker): Speaker {
    const saved = { ...Utils.completePost(), ...speaker };
    this.speakers.push(saved);
    return saved;
  }

  update(id: string, updatedSpeaker: Speaker): Speaker {
    const speaker = this.getSpeaker(id);
    const updatedDate = new Date().toString();
    const updated = { ...speaker, ...updatedSpeaker, updatedDate };
    this.delete(id, false);
    return this.save(updated);
  }

  private paginate(filteredSpeaker, page?: number, pageSize?: number) {
    if (pageSize || page) {
      return Utils.paginate(filteredSpeaker, page, pageSize);
    }

    return filteredSpeaker;
  }

  private filter(search?: string) {
    return search ? Utils.filterByAll(search, this.speakers) : this.speakers;
  }

  speakersDiffDate(
    date: string,
    page?: string,
    pageSize?: string,
  ): SpeakersAPI {
    let speakersDiff = this.speakers.filter(speaker => {
      return new Date(speaker.updatedDate) >= new Date(date);
    });

    speakersDiff = speakersDiff.map(speaker => this.getFullSpeaker(speaker));

    speakersDiff = this.paginate(
      speakersDiff,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    return {
      items: speakersDiff,
      hasNext:
        this.speakers.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getCount(): Count {
    return { length: this.speakers.length };
  }

  getLectures(id: string): Lectures {
    const speaker = this.speakers.find(speaker => speaker.id === id);
    const lectures = speaker.lectures;
    return lectures;
  }

  updateLectures(id: string, lecture: Lecture, remove = false): void {
    const speaker = this.getSpeaker(id);

    const lectures = speaker.lectures.filter(
      lectureItem => lectureItem.id !== lecture.id,
    );
    let updatedLectures: Lectures;

    if (remove) {
      updatedLectures = [...lectures];
    } else {
      updatedLectures = [...lectures, lecture];
    }

    speaker.lectures = updatedLectures;
    this.update(speaker.id, speaker);
  }
}
