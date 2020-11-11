import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';

@Module({
  providers: [GalleryService],
  controllers: [GalleryController]
})
export class GalleryModule {}
