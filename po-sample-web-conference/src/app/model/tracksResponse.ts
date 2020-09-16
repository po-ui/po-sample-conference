import { Track } from './track';

export interface TracksResponse {
  /**
   * Indicate if has next page of data.
   */
  hasNext: boolean;
  /**
   * Track list.
   */
  items: Array<Track>;
}
