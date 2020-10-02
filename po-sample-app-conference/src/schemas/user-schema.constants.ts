import { PoSyncSchema } from '@po-ui/ng-sync';
import { environment } from 'src/environments/environment';

export const userSchema: PoSyncSchema = {
  getUrlApi: `${environment.apiURL}/users`,
  diffUrlApi: `${environment.apiURL}/users/diff`,
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
