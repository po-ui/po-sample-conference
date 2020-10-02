import { Injectable, NotFoundException } from '@nestjs/common';
import { Count } from 'src/core/interfaces/collection.interface';
import { Utils } from '../utils/utils';

import {
  Conference,
  Conferences,
  ConferencesAPI,
} from './conferences.interface';
import { conferences } from './db/conferences.data';

@Injectable()
export class ConferencesService {
  conferences = conferences;

  getConferences(
    search?: string,
    page?: string,
    pageSize?: string,
  ): ConferencesAPI {
    let filteredConferences = this.filter(search);
    filteredConferences = this.paginate(
      filteredConferences,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    return {
      items: filteredConferences,
      hasNext:
        this.conferences.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getConference(id: string): Conference {
    return this.conferences.find(conference => conference.id === id);
  }

  delete(id: string): { message: string } {
    const index = this.conferences.findIndex(
      conference => conference.id === id,
    );

    if (index === -1) {
      throw new NotFoundException(`Conferência ${id} não existe!`);
    }

    this.conferences[index] = Utils.softDelete(this.conferences[index]);
    return { message: 'Conferência removida com sucesso' };
  }

  deleteAll(conferencesToDelete: Conferences): void {
    conferencesToDelete.forEach(conference => this.delete(conference.id));
  }

  save(conference: Conference): Conference {
    const confereceSaved = { ...Utils.completePost(), ...conference };
    this.conferences.push(confereceSaved);
    return confereceSaved;
  }

  update(id: string, updatedConference: Conference): void {
    const conference = this.getConference(id);
    Object.assign(conference, updatedConference);
  }

  private paginate(filteredConference, page?: number, pageSize?: number) {
    if (pageSize || page) {
      return Utils.paginate(filteredConference, page, pageSize);
    }

    return filteredConference;
  }

  private filter(search?: string) {
    return search
      ? Utils.filterByAll(search, this.conferences)
      : this.conferences;
  }

  conferencesDiffDate(
    date: string,
    page?: string,
    pageSize?: string,
  ): ConferencesAPI {
    let conferencesDiff = this.conferences.filter(conference => {
      return new Date(conference.updatedDate) >= new Date(date);
    });

    conferencesDiff = this.paginate(
      conferencesDiff,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    return {
      items: conferencesDiff,
      hasNext:
        this.conferences.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getCount(): Count {
    return { length: this.conferences.length };
  }
}
