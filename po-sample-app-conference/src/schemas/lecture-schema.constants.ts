import { PoSyncSchema } from '@po-ui/ng-sync';
import { environment } from 'src/environments/environment';

export const lectureSchema: PoSyncSchema = {
  getUrlApi: `${environment.apiURL}/lectures` ,
  diffUrlApi: `${environment.apiURL}/lectures/diff` ,
  deletedField: 'deleted',
  fields: [ 'id', 'title', 'room', 'startTime', 'endTime', 'description', 'track', 'speaker' ],
  idField: 'id',
  name: 'Lectures',
  pageSize: 10
};
