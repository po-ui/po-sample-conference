import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PoSyncDateInterceptor } from './interceptor/po-sync-date.interceptor';

@Module({
  providers: [{ provide: APP_INTERCEPTOR, useClass: PoSyncDateInterceptor }],
})
export class CoreModule {}
