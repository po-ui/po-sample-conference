import { Speakers } from '../speakers.interface';

export const speakers: Speakers = [
  {
    id: '1',
    name: 'Peter Benjamin Parker',
    email: 'peter.parker@poui.com.br',
    photo: 'avatar4.png',
    description: 'Nodejs developer with 4 years experience',
    lectures: [
      {
        id: '2',
        title: 'Basic RESTful API in NodeJS',
      },
    ],
    createdDate: '2020-10-08T12:15:58.815Z',
    updatedDate: '2020-10-08T12:15:58.815Z',
    deleted: false,
  },
  {
    id: '2',
    name: 'Natasha Romanova',
    email: 'natasha.romanova@poui.com.br',
    photo: 'avatar2.png',
    description: 'Angular developer with 2 years experience',
    lectures: [
      {
        id: '1',
        title: 'Unit testing for beginners',
      },
      {
        id: '3',
        title: 'Ionic - get started',
      },
    ],
    createdDate: '2020-10-08T12:15:58.815Z',
    updatedDate: '2020-10-08T12:15:58.815Z',
    deleted: false,
  },
  {
    id: '3',
    name: 'Anthony Stark',
    email: 'anthony.stark@poui.com.br',
    photo: 'avatar8.png',
    description: 'Javascript developer with 8 years experience',
    lectures: [],
    createdDate: '2020-10-08T12:15:58.815Z',
    updatedDate: '2020-10-08T12:15:58.815Z',
    deleted: false,
  },
  {
    id: '4',
    name: 'Carol Danvers',
    email: 'carol.danvers@poui.com.br',
    photo: 'avatar3.png',
    description: 'Full stack developer with 2 years experience',
    lectures: [],
    createdDate: '2020-10-08T12:15:58.815Z',
    updatedDate: '2020-10-08T12:15:58.815Z',
    deleted: false,
  },
];
