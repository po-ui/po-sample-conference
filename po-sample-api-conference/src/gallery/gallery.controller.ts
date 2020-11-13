import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Photo, PhotoFile } from './gallery.interface';
import { GalleryService } from './gallery.service';
import { editFileName, imageFileFilter } from 'src/utils/utils';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @Post('photo')
  async savePhoto(@Body() body: Photo): Promise<Photo> {
    console.log(body);
    return this.galleryService.save(body);
  }

  @Post('photo/file')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      })
    }),
  )
  async uploadedFile(@UploadedFile() file: PhotoFile): Promise<any> {
    return { file: file.filename };
  }

  @Post('photos')
  @UseInterceptors(
    FilesInterceptor('photos', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      })
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() photos): Promise<any> {
    const response = [];
    photos.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get('photo/file/:id')
  async serveImage(@Param('id') id: string, @Res() res): Promise<any> {
    const filename = this.galleryService.getPhoto(id)?.filename;
    if (filename) {
      res.sendFile(filename, { root: 'files' });
    }
  }

  @Get('photo/:id')
  async getPhoto(@Param('id') id: string): Promise<Photo> {
    return this.galleryService.getPhoto(id);
  }
}
