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
import { GetSpeakersDto } from './dto/get-speakers.dto';
import { CreateSpeakersDto } from './dto/create-speakers.dto';
import { Speaker, Speakers, SpeakersAPI } from './speakers.interface';
import { SpeakersService } from './speakers.service';
import { Count } from 'src/core/interfaces/collection.interface';
import { Lectures } from 'src/lectures/lectures.interface';

@ApiTags('Speakers')
@Controller('speakers')
export class SpeakersController {
  constructor(private speakersService: SpeakersService) {}

  @ApiResponse({ status: 200, type: GetSpeakersDto })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get()
  getSpeakers(@Query() query: QueryApi): SpeakersAPI {
    const { search, filter, page, pageSize } = query;

    return this.speakersService.getSpeakers(search || filter, page, pageSize);
  }

  @Get('count')
  getCount(): Count {
    return this.speakersService.getCount();
  }

  @ApiResponse({ status: 204 })
  @Delete()
  deleteSpeakers(@Body() body: Speakers): void {
    this.speakersService.deleteAll(body);
  }

  @ApiResponse({ status: 200, type: CreateSpeakersDto })
  @ApiParam({ name: 'id' })
  @Get(':id/lectures')
  getSpeakerLectures(@Param() params: ParamQueryId): { lectures: Lectures } {
    return { lectures: this.speakersService.getLectures(params['id']) };
  }

  @ApiResponse({ status: 200, type: CreateSpeakersDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getSpeaker(@Param() params: ParamQueryId): Speaker {
    return this.speakersService.getSpeaker(params['id']);
  }

  @ApiResponse({ status: 200 })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deleteSpeaker(@Param() params: ParamQueryId): any {
    return this.speakersService.delete(params['id']);
  }

  @ApiResponse({ status: 201, type: CreateSpeakersDto })
  @ApiBody({ type: CreateSpeakersDto })
  @Post()
  save(@Body() speaker: Speaker): Speaker {
    return this.speakersService.save(speaker);
  }

  @ApiResponse({ status: 201, type: CreateSpeakersDto })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreateSpeakersDto })
  @Put(':id')
  update(@Body() speakers: Speaker, @Param() param: ParamQueryId): Speaker {
    return this.speakersService.update(param['id'], speakers);
  }

  @ApiResponse({ status: 200, type: GetSpeakersDto })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiParam({ name: 'date' })
  @Get('/diff/:date')
  speakersDiffDate(
    @Param() param: { date: string },
    @Query() query: QueryApi,
  ): SpeakersAPI {
    const { page, pageSize } = query;
    return this.speakersService.speakersDiffDate(param.date, page, pageSize);
  }
}
