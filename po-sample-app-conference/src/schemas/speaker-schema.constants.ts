import { PoSyncSchema } from '@po-ui/ng-sync';
import { environment } from 'src/environments/environment';

export const speakerSchema: PoSyncSchema = {
  getUrlApi: `${environment.apiURL}/speakers`,
  diffUrlApi: `${environment.apiURL}/speakers/diff`,
  deletedField: 'deleted',
  fields: [ 'id', 'name', 'email', 'photo', 'description', 'lectures' ],
  idField: 'id',
  name: 'Speakers',
  pageSize: 10
};
