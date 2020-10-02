import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ParamQueryId, QueryApi } from 'src/core/interfaces/query.interface';
import { GetNotesDto } from './dto/get-notes.dto';
import { CreateNotesDto } from './dto/create-notes.dto';
import { Note, Notes, NotesAPI } from './notes.interface';
import { NotesService } from './notes.service';
import { Count } from 'src/core/interfaces/collection.interface';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @ApiResponse({ status: 200, type: GetNotesDto })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get()
  getNotes(@Query() query: QueryApi): NotesAPI {
    const { search, filter, page, pageSize } = query;

    return this.notesService.getNotes(search || filter, page, pageSize);
  }

  @Get('count')
  getCount(): Count {
    return this.notesService.getCount();
  }

  @ApiResponse({ status: 204 })
  @Delete()
  deleteNotes(@Body() body: Notes): void {
    this.notesService.deleteAll(body);
  }

  @ApiResponse({ status: 200, type: CreateNotesDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getNote(@Param() params: ParamQueryId): Note {
    return this.notesService.getNote(params['id']);
  }

  @ApiResponse({ status: 200 })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deleteNote(@Param() params: ParamQueryId): any {
    return this.notesService.delete(params['id']);
  }

  @ApiResponse({ status: 201, type: CreateNotesDto })
  @ApiBody({ type: CreateNotesDto })
  @Post()
  save(@Body() note: Note): Note {
    return this.notesService.save(note);
  }

  @ApiResponse({ status: 201, type: CreateNotesDto })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreateNotesDto })
  @Put(':id')
  update(@Body() notes: Note, @Param() param: ParamQueryId): Note {
    return this.notesService.update(param['id'], notes);
  }

  @ApiResponse({ status: 200, type: GetNotesDto })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiParam({ name: 'date' })
  @Get('/diff/:date')
  notesDiffDate(
    @Param() param: { date: string },
    @Query() query: QueryApi,
  ): NotesAPI {
    const { page, pageSize } = query;
    return this.notesService.notesDiffDate(param.date, page, pageSize);
  }
}
