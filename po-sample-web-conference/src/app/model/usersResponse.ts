import { User } from './user';

export interface UsersResponse {
  /**
   * Indicate if has next page of data.
   */
  hasNext: boolean;
  /**
   * User list.
   */
  items: Array<User>;
}
