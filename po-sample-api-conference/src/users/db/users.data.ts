import { Users } from '../users.interface';

export const users: Users = [
  {
    id: '1',
    username: 'admin',
    password: 'admin',
    isSuperUser: true,
    notes: [],
    createdDate: '2020-10-07T21:45:06.697Z',
    updatedDate: '2020-10-07T21:45:06.697Z',
    deleted: false,
  },
  {
    id: '2',
    username: 'dev',
    password: 'poui',
    isSuperUser: false,
    notes: [],
    createdDate: '2020-10-07T21:45:06.697Z',
    updatedDate: '2020-10-07T21:45:06.697Z',
    deleted: false,
  },
];
