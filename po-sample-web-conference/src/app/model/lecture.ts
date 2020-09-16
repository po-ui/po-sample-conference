import { Speaker } from './speaker';
import { Track } from './track';

export class Lecture {
  /**
   * Lecture id.
   */
  id?: string;
  /**
   * Lecture title.
   */
  title: string;
  /**
   * Lecture description.
   */
  description: string;
  /**
   * Lecture room.
   */
  room: string;
  /**
   * Lecture start.
   */
  startTime: string;
  /**
   * Lecture end.
   */
  endTime: string;
  /**
   * Lecture track.
   */
  track?: Track;
  /**
   * Lecture track.
   */
  trackId?: string;
  /**
   * Speaker.
   */
  speaker?: Speaker;
  /**
   * Speaker id.
   */
  speakerId?: string;

  constructor() { }
}
