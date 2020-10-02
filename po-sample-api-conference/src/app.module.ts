import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConferencesModule } from './conferences/conferences.module';
import { LecturesModule } from './lectures/lectures.module';
import { NotesModule } from './notes/notes.module';
import { SpeakersModule } from './speakers/speakers.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SpeakersModule,
    TracksModule,
    ConferencesModule,
    LecturesModule,
    NotesModule,
    UsersModule,
    CoreModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
