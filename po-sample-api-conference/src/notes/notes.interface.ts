import { Collection, Item } from 'src/core/interfaces/collection.interface';

export interface NotesAPI extends Collection {
  items: Notes;
}

export type Notes = Array<Note>;

export interface Note extends Item {
  id: string;
  title: string;
  text: string;
  lectureId: string;
  userId: string;
}
