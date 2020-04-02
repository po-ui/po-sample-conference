import { PoSyncSchema } from '@po-ui/ng-sync';

export const lectureSchema: PoSyncSchema = {
  getUrlApi: 'http://localhost:8080/conference-api/api/v1/lectures',
  diffUrlApi: 'http://localhost:8080/conference-api/api/v1/lectures/diff',
  deletedField: 'deleted',
  fields: [ 'id', 'title', 'room', 'startTime', 'endTime', 'description', 'track', 'speaker' ],
  idField: 'id',
  name: 'Lectures',
  pageSize: 10
};
