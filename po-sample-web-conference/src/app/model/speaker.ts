import { LectureSummary } from './lectureSummary';

export class Speaker {
  /**
   * Speaker id.
   */
  id?: string;
  /**
   * Speaker name.
   */
  name: string;
  /**
   * Speaker email.
   */
  email: string;
  /**
   * Speaker mini bio.
   */
  description: string;
  /**
   * Speaker photo.
   */
  photo: string;
  /**
   * Logic field to indicate if record was deleted.
   */
  deleted?: boolean;
  /**
   * Record create date.
   */
  createdDate?: Date;
  /**
   * Record last update date.
   */
  updatedDate?: Date;
  /**
   * Record delete date.
   */
  deletedDate?: Date;
  /**
   * Lecture list of speaker.
   */
  lectures?: Array<LectureSummary>;

  constructor() { }
}
