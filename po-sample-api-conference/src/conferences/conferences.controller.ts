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
import { Count } from 'src/core/interfaces/collection.interface';

import { ParamQueryId, QueryApi } from 'src/core/interfaces/query.interface';

import {
  Conference,
  Conferences,
  ConferencesAPI,
} from './conferences.interface';

import { ConferencesService } from './conferences.service';

import { CreateConferencesDto } from './dto/create-conferences.dto';
import { GetConferencesDto } from './dto/get-conferences.dto';

@ApiTags('Conferences')
@Controller('conferences')
export class ConferencesController {
  constructor(private conferencesService: ConferencesService) {}

  @ApiResponse({ status: 200, type: GetConferencesDto })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get()
  getConferences(@Query() query: QueryApi): ConferencesAPI {
    const { search, filter, page, pageSize } = query;

    return this.conferencesService.getConferences(
      search || filter,
      page,
      pageSize,
    );
  }

  @Get('count')
  getCount(): Count {
    return this.conferencesService.getCount();
  }

  @ApiResponse({ status: 204 })
  @Delete()
  deleteConferences(@Body() body: Conferences): void {
    this.conferencesService.deleteAll(body);
  }

  @ApiResponse({ status: 200, type: CreateConferencesDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getConference(@Param() params: ParamQueryId): Conference {
    return this.conferencesService.getConference(params['id']);
  }

  @ApiResponse({ status: 200 })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deleteConference(@Param() params: ParamQueryId): any {
    return this.conferencesService.delete(params['id']);
  }

  @ApiResponse({ status: 201, type: CreateConferencesDto })
  @ApiBody({ type: CreateConferencesDto })
  @Post()
  save(@Body() conference: Conference): Conference {
    return this.conferencesService.save(conference);
  }

  @ApiResponse({ status: 201, type: CreateConferencesDto })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreateConferencesDto })
  @Put(':id')
  update(@Body() conferences: Conference, @Param() param: ParamQueryId): void {
    this.conferencesService.update(param['id'], conferences);
  }

  @ApiResponse({ status: 200, type: GetConferencesDto })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiParam({ name: 'date' })
  @Get('/diff/:date')
  conferencesDiffDate(
    @Param() param: { date: string },
    @Query() query: QueryApi,
  ): ConferencesAPI {
    const { page, pageSize } = query;
    return this.conferencesService.conferencesDiffDate(
      param.date,
      page,
      pageSize,
    );
  }
}
