import { PoSyncSchema } from '@po-ui/ng-sync';

export const conferenceSchema: PoSyncSchema = {
  getUrlApi: 'http://localhost:8080/conference-api/api/v1/conferences',
  diffUrlApi: 'http://localhost:8080/conference-api/api/v1/conferences/diff',
  deletedField: 'deleted',
  fields: [ 'id', 'title', 'date', 'location', 'description' ],
  idField: 'id',
  name: 'Conferences',
  pageSize: 1
};
