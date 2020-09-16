export interface PoResponse {
  /**
   * Indicate if has next page of data.
   */
  hasNext: boolean;
  /**
   * PO response list.
   */
  items: Array<any>;
}
