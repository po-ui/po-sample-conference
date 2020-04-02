import { PoSyncSchema } from '@po-ui/ng-sync';

export const userSchema: PoSyncSchema = {
  getUrlApi: 'http://localhost:8080/conference-api/api/v1/users',
  diffUrlApi: 'http://localhost:8080/conference-api/api/v1/users/diff',
  deletedField: 'deleted',
  fields: [
    'id',
    'username',
    'password',
    'notes',
    { name: 'favoriteLectures', local: true }
  ],
  idField: 'id',
  name: 'Users',
  pageSize: 20
};
