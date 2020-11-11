import {
  Controller,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  @Post('upload')
  @UseInterceptors(FilesInterceptor('photo'))
  uploadFile(@UploadedFiles() files): void {
    console.log('Ola');
    console.log(files);
  }
}
