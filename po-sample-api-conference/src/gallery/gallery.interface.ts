import { Collection, Item } from 'src/core/interfaces/collection.interface';

export interface PhotosAPI extends Collection {
  items: Photos;
}

export type Photos = Array<Photo>;

export interface Photo extends Item {
  id: string;
  title: string;
  photo: string;
}
