import { Test, TestingModule } from '@nestjs/testing';
import { TracksService } from './tracks.service';

describe('TracksService', () => {
  let service: TracksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TracksService],
    }).compile();

    service = module.get<TracksService>(TracksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
