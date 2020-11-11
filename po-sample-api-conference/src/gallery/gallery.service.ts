import { Injectable, NotFoundException } from '@nestjs/common';

import { Count } from 'src/core/interfaces/collection.interface';
import { Utils } from 'src/utils/utils';
import { photos } from './db/photos.data';
import { Photo, Photos, PhotosAPI } from './gallery.interface';

@Injectable()
export class GalleryService {
  photos = photos;

  getPhotos(search?: string, page?: string, pageSize?: string): PhotosAPI {
    let filteredPhotos = this.filter(search);
    filteredPhotos = this.paginate(
      filteredPhotos,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    return {
      items: filteredPhotos,
      hasNext: this.photos.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getPhoto(id: string): Photo {
    const photo = this.photos.find(photo => photo.id === id && photo.deleted === false);
    return photo;
  }

  delete(id: string): { message: string } {
    const index = this.photos.findIndex(photo => photo.id === id && photo.deleted === false);

    if (index === -1) {
      throw new NotFoundException(`photo ${id} não existe!`);
    }

    this.photos[index] = Utils.softDelete(this.photos[index]);

    return { message: 'photo removida com sucesso' };
  }

  deleteAll(photosToDelete: Photos): void {
    photosToDelete.forEach(photo => this.delete(photo.id));
  }

  save(photo: Photo): Photo {
    const saved = { ...Utils.completePost(), ...photo };
    this.photos.push(saved);
    return saved;
  }

  update(id: string, updatedphoto: Photo, title: string): Photo {
    const photo = this.getPhoto(id);
    photo.title = title;
    const updatedDate = new Date().toString();
    const updated = { ...photo, ...updatedphoto, updatedDate };
    this.delete(id);
    return this.save(updated);
  }

  private paginate(filteredphoto, page?: number, pageSize?: number) {
    if (pageSize || page) {
      return Utils.paginate(filteredphoto, page, pageSize);
    }

    return filteredphoto;
  }

  private filter(search?: string) {
    return search ? Utils.filterByAll(search, this.photos) : this.photos;
  }

  photosDiffDate(date: string, page?: string, pageSize?: string): PhotosAPI {
    let photosDiff = this.photos.filter(photo => {
      return new Date(photo.updatedDate) >= new Date(date);
    });

    photosDiff = this.paginate(
      photosDiff,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    return {
      items: photosDiff,
      hasNext: this.photos.length > parseInt(pageSize, 10) * parseInt(page, 10),
    };
  }

  getCount(): Count {
    return { length: this.photos.length };
  }
}
