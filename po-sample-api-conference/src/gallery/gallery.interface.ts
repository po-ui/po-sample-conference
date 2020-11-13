import { Collection, Item } from 'src/core/interfaces/collection.interface';

export interface PhotosAPI extends Collection {
  items: Photos;
}

export type Photos = Array<Photo>;

export interface Photo extends Item {
  title: string;
  filename?: string;
}

export interface PhotoFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
