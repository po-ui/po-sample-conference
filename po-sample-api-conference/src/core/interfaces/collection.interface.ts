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

export interface Count extends PoSyncDate {
  length?: number;
}

export interface PoSyncDate {
  po_sync_date?: string;
}
