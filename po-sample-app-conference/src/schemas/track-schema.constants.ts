import { PoSyncSchema } from '@po-ui/ng-sync';

export const trackSchema: PoSyncSchema = {
  getUrlApi: 'http://localhost:8080/conference-api/api/v1/tracks',
  diffUrlApi: 'http://localhost:8080/conference-api/api/v1/tracks/diff',
  deletedField: 'deleted',
  fields: [ 'id', 'name', 'color' ],
  idField: 'id',
  name: 'Tracks',
  pageSize: 10
};
