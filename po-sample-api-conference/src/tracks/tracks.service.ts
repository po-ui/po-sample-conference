import { Injectable, NotFoundException } from '@nestjs/common';
import { Count } from 'src/core/interfaces/collection.interface';
import { Utils } from 'src/utils/utils';
import { tracks } from './db/tracks.data';
import { Track, Tracks, TracksAPI } from './tracks.interface';

@Injectable()
export class TracksService {
  tracks = tracks;

  getTracks(search?: string, page?: string, pageSize?: string): TracksAPI {
    let filteredTracks = this.filter(search);
    filteredTracks = this.paginate(
      filteredTracks,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    return {
      items: filteredTracks,
      hasNext: this.tracks.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getTrack(id: string): Track {
    return this.tracks.find(track => track.id === id);
  }

  delete(id: string): { message: string } {
    const index = this.tracks.findIndex(track => track.id === id);

    if (index === -1) {
      throw new NotFoundException(`Track ${id} não existe!`);
    }

    this.tracks[index] = Utils.softDelete(this.tracks[index]);

    return { message: 'Track removida com sucesso' };
  }

  deleteAll(tracksToDelete: Tracks): void {
    tracksToDelete.forEach(track => this.delete(track.id));
  }

  save(track: Track): Track {
    const saved = { ...Utils.completePost(), ...track };
    this.tracks.push(saved);
    return saved;
  }

  update(id: string, updatedTrack: Track): Track {
    const track = this.getTrack(id);
    const updatedDate = new Date().toString();
    const updated = {...track, ...updatedTrack, updatedDate}
    this.delete(id);
    return this.save(updated);
  }

  private paginate(filteredTrack, page?: number, pageSize?: number) {
    if (pageSize || page) {
      return Utils.paginate(filteredTrack, page, pageSize);
    }

    return filteredTrack;
  }

  private filter(search?: string) {
    return search ? Utils.filterByAll(search, this.tracks) : this.tracks;
  }

  tracksDiffDate(date: string, page?: string, pageSize?: string): TracksAPI {
    let tracksDiff = this.tracks.filter(track => {
      return new Date(track.updatedDate) >= new Date(date);
    });

    tracksDiff = this.paginate(
      tracksDiff,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    return {
      items: tracksDiff,
      hasNext: this.tracks.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getCount(): Count {
    return { length: this.tracks.length };
  }
}
