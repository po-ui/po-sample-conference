import { Test, TestingModule } from '@nestjs/testing';
import { SpeakersService } from './speakers.service';

describe('SpeakersService', () => {
  let service: SpeakersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeakersService],
    }).compile();

    service = module.get<SpeakersService>(SpeakersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
