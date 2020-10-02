import { Test, TestingModule } from '@nestjs/testing';
import { SpeakersController } from './speakers.controller';

describe('SpeakersController', () => {
  let controller: SpeakersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeakersController],
    }).compile();

    controller = module.get<SpeakersController>(SpeakersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
