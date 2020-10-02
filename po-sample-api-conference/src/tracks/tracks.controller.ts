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
import { GetTracksDto } from './dto/get-tracks.dto';
import { CreateTracksDto } from './dto/create-tracks.dto';
import { Track, Tracks, TracksAPI } from './tracks.interface';
import { TracksService } from './tracks.service';
import { Count } from 'src/core/interfaces/collection.interface';

@ApiTags('Tracks')
@Controller('tracks')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @ApiResponse({ status: 200, type: GetTracksDto })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get()
  getTracks(@Query() query: QueryApi): TracksAPI {
    const { search, filter, page, pageSize } = query;

    return this.tracksService.getTracks(search || filter, page, pageSize);
  }

  @Get('count')
  getCount(): Count {
    return this.tracksService.getCount();
  }

  @ApiResponse({ status: 204 })
  @Delete()
  deleteTracks(@Body() body: Tracks): void {
    this.tracksService.deleteAll(body);
  }

  @ApiResponse({ status: 200, type: CreateTracksDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getTrack(@Param() params: ParamQueryId): Track {
    return this.tracksService.getTrack(params['id']);
  }

  @ApiResponse({ status: 200 })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deleteTrack(@Param() params: ParamQueryId): any {
    return this.tracksService.delete(params['id']);
  }

  @ApiResponse({ status: 201, type: CreateTracksDto })
  @ApiBody({ type: CreateTracksDto })
  @Post()
  save(@Body() track: Track): void {
    this.tracksService.save(track);
  }

  @ApiResponse({ status: 201, type: CreateTracksDto })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreateTracksDto })
  @Put(':id')
  update(@Body() tracks: Track, @Param() param: ParamQueryId): void {
    this.tracksService.update(param['id'], tracks);
  }

  @ApiResponse({ status: 200, type: GetTracksDto })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiParam({ name: 'date' })
  @Get('/diff/:date')
  tracksDiffDate(
    @Param() param: { date: string },
    @Query() query: QueryApi,
  ): TracksAPI {
    const { page, pageSize } = query;
    return this.tracksService.tracksDiffDate(param.date, page, pageSize);
  }
}
