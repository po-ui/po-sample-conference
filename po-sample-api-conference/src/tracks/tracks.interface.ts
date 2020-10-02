import { Collection, Item } from 'src/core/interfaces/collection.interface';

export interface TracksAPI extends Collection {
  items: Tracks;
}

export type Tracks = Array<Track>;

export interface Track extends Item {
  id?: string;
  name?: string;
  color?: string;
}
