import { PoSyncSchema } from '@po-ui/ng-sync';
import { environment } from 'src/environments/environment';

export const conferenceSchema: PoSyncSchema = {
  getUrlApi: `${environment.apiURL}/conferences`,
  diffUrlApi: `${environment.apiURL}/conferences/diff`,
  deletedField: 'deleted',
  fields: [ 'id', 'title', 'date', 'location', 'description' ],
  idField: 'id',
  name: 'Conferences',
  pageSize: 1
};
