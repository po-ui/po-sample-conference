import { Test, TestingModule } from '@nestjs/testing';
import { TracksController } from './tracks.controller';

describe('TracksController', () => {
  let controller: TracksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TracksController],
    }).compile();

    controller = module.get<TracksController>(TracksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
