import { Module } from '@nestjs/common';
import { NotesService } from 'src/notes/notes.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, NotesService],
  exports: [UsersService],
})
export class UsersModule {}
