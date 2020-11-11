import { Test, TestingModule } from '@nestjs/testing';
import { GalleryService } from './gallery.service';

describe('GalleryService', () => {
  let service: GalleryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GalleryService],
    }).compile();

    service = module.get<GalleryService>(GalleryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
