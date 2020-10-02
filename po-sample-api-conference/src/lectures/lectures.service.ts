import { Injectable, NotFoundException } from '@nestjs/common';
import { Count } from 'src/core/interfaces/collection.interface';
import { SpeakersService } from 'src/speakers/speakers.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Utils } from 'src/utils/utils';
import { lectures } from './db/lectures.data';
import { Lecture, Lectures, LecturesAPI } from './lectures.interface';

@Injectable()
export class LecturesService {
  lectures = lectures;

  constructor(
    private speakersService: SpeakersService,
    private tracksService: TracksService,
  ) {}

  private getFullLectures(lectures: Lectures): Lectures {
    return lectures.map(lecture => this.getFullLecture(lecture));
  }

  private getFullLecture(lecture: Lecture): Lecture {
    const track = this.tracksService.getTrack(lecture.trackId) ?? {};
    const speaker = this.speakersService.getSpeaker(lecture.speakerId) ?? {};
    const updatedDate = speaker.updatedDate || speaker.updatedDate;
    const deleted = lecture.deleted || speaker.deleted;
    return { ...lecture, track, speaker, updatedDate, deleted };
  }

  getLectures(search?: string, page?: string, pageSize?: string): LecturesAPI {
    let filteredLectures = this.filter(search);
    filteredLectures = this.paginate(
      filteredLectures,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    filteredLectures = this.getFullLectures(filteredLectures);

    return {
      items: filteredLectures,
      hasNext:
        this.lectures.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getLecture(id: string): Lecture {
    const lecture = this.lectures.find(lecture => lecture.id === id);
    return this.getFullLecture(lecture);
  }

  delete(id: string, softDelete = true): { message: string } {
    const index = this.lectures.findIndex(lecture => lecture.id === id);
    const lecture = this.lectures[index];

    if (index === -1) {
      throw new NotFoundException(`Lecture ${id} não existe!`);
    }

    this.speakersService.updateLectures(lecture.speakerId, lecture, true);

    if (softDelete) {
      this.lectures[index] = Utils.softDelete(this.lectures[index]);
    } else {
      this.lectures = this.lectures.filter(
        lectureItem => lectureItem.id !== id,
      );
    }

    return { message: 'Lecture removida com sucesso' };
  }

  deleteAll(lecturesToDelete: Lectures): void {
    lecturesToDelete.forEach(lecture => this.delete(lecture.id));
  }

  save(lecture: Lecture): Lecture {
    const saved = { ...Utils.completePost(), ...lecture };
    this.lectures.push(saved);
    this.speakersService.updateLectures(lecture.speakerId, saved);
    return saved;
  }

  update(id: string, updatedLecture: Lecture): Lecture {
    const lecture = this.getLecture(id);
    const updatedDate = new Date().toString();
    const updated = { ...lecture, ...updatedLecture, updatedDate };
    this.delete(id, false);
    return this.save(updated);
  }

  private paginate(filteredLecture, page?: number, pageSize?: number) {
    if (pageSize || page) {
      return Utils.paginate(filteredLecture, page, pageSize);
    }

    return filteredLecture;
  }

  private filter(search?: string) {
    return search ? Utils.filterByAll(search, this.lectures) : this.lectures;
  }

  lecturesDiffDate(
    date: string,
    page?: string,
    pageSize?: string,
  ): LecturesAPI {
    const lectures = this.getFullLectures(this.lectures);

    let lecturesDiff = lectures.filter(lecture => {
      return new Date(lecture.updatedDate) >= new Date(date);
    });

    lecturesDiff = this.getFullLectures(lecturesDiff);

    lecturesDiff = this.paginate(
      lecturesDiff,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    return {
      items: lecturesDiff,
      hasNext:
        this.lectures.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getCount(): Count {
    return { length: this.lectures.length };
  }

  getLectureFromSpeaker(userId: string): Lectures {
    return this.lectures.filter(lecture => lecture.speaker.id === userId);
  }
}
