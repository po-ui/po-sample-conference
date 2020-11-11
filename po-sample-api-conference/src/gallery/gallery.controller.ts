import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Photo, PhotosAPI } from './gallery.interface';
import { GalleryService } from './gallery.service';
import { editFileName } from 'src/utils/utils';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @Post('photo')
  async savePhoto(@Body() body: Photo): Promise<Photo> {
    return this.galleryService.save(body);
  }

  @Post('photo/file/:title')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      })
    })
  )
  async uploadedFile(@UploadedFile() file: Photo, @Param('title') title: string): Promise<any> {
    if (file) {
      this.savePhoto({ title: title, filename: file.filename });
      return { file: file.filename };
    }
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

  @Get('photo')
  async getPhotos(): Promise<PhotosAPI> {
    return this.galleryService.getPhotos();
  }

  @Put('photo/file/:id/:title')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      })
    })
  )
  update(@UploadedFile() file: Photo, @Param('id') id: string, @Param('title') title: string) {
    return this.galleryService.update(id, file, title);
  }

  @Delete('photo/:id')
  async deletePhoto(@Param('id') id: string): Promise<Object> {
    return this.galleryService.delete(id);
  }
}
