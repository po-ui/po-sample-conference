import { Test, TestingModule } from '@nestjs/testing';
import { LecturesService } from './lectures.service';

describe('LecturesService', () => {
  let service: LecturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LecturesService],
    }).compile();

    service = module.get<LecturesService>(LecturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
