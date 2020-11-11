export interface PhotosAPI extends Collection {
  items: Photos;
}

export type Photos = Array<Photo>;

export interface Photo extends Item {
  title?: string;
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

export interface Collection extends PoSyncDate {
  hasNext?: boolean;
  items?: Array<Item>;
}

export interface Item extends PoSyncDate {
  id?: string;
  createdDate?: string;
  updatedDate?: string;
  deleted?: boolean;
}

export interface PoSyncDate {
  po_sync_date?: string;
}
