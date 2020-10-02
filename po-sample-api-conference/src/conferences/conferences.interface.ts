import { Collection, Item } from 'src/core/interfaces/collection.interface';

export interface ConferencesAPI extends Collection {
  items: Conferences;
}

export type Conferences = Array<Conference>;

export interface Conference extends Item {
  id?: string;
  title?: string;
  date?: string;
  location?: string;
  description?: string;
}
