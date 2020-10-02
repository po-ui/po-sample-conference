import { Collection, Item } from 'src/core/interfaces/collection.interface';
import { Speaker } from 'src/speakers/speakers.interface';
import { Track } from 'src/tracks/tracks.interface';

export interface LecturesAPI extends Collection {
  items: Lectures;
}

export type Lectures = Array<Lecture>;

export interface Lecture extends Item {
  id?: string;
  title?: string;
  room?: string;
  startTime?: string;
  endTime?: string;
  description?: string;
  track?: Track;
  trackId?: string;
  speaker?: Speaker;
  speakerId?: string;
}
