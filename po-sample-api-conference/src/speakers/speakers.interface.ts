import { Collection, Item } from 'src/core/interfaces/collection.interface';
import { Lectures } from 'src/lectures/lectures.interface';

export interface SpeakersAPI extends Collection {
  items: Speakers;
}

export type Speakers = Array<Speaker>;

export interface Speaker extends Item {
  id?: string;
  name?: string;
  email?: string;
  photo?: string;
  description?: string;
  lectures?: Lectures;
}
