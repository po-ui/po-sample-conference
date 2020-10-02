import { PoSyncSchema } from '@po-ui/ng-sync';
import { environment } from 'src/environments/environment';

export const noteSchema: PoSyncSchema = {
  getUrlApi: `${environment.apiURL}/notes` ,
  diffUrlApi: `${environment.apiURL}/notes/diff` ,
  deletedField: 'deleted',
  fields: [ 'id', 'title', 'text', 'lectureId', 'userId' ],
  idField: 'id',
  name: 'Notes',
  pageSize: 10
};
