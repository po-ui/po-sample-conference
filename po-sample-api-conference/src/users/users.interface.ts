import { Collection, Item } from 'src/core/interfaces/collection.interface';
import { Notes } from 'src/notes/notes.interface';

export interface UsersAPI extends Collection {
  items: Users;
}

export type Users = Array<User>;

export interface User extends Item {
  id?: string;
  username?: string;
  password?: string;
  isSuperUser?: boolean;
  notes?: Notes;
}
