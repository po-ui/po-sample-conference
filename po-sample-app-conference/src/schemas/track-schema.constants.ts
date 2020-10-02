import { PoSyncSchema } from '@po-ui/ng-sync';
import { environment } from 'src/environments/environment';

export const trackSchema: PoSyncSchema = {
  getUrlApi: `${environment.apiURL}/tracks`,
  diffUrlApi: `${environment.apiURL}/tracks/diff`,
  deletedField: 'deleted',
  fields: [ 'id', 'name', 'color' ],
  idField: 'id',
  name: 'Tracks',
  pageSize: 10
};
