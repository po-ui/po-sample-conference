import { Module } from '@nestjs/common';
import { SpeakersModule } from 'src/speakers/speakers.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { LecturesController } from './lectures.controller';
import { LecturesService } from './lectures.service';

@Module({
  controllers: [LecturesController],
  providers: [LecturesService],
  imports: [TracksModule, SpeakersModule],
})
export class LecturesModule {}
