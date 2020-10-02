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
import { GetLecturesDto } from './dto/get-lectures.dto';
import { CreateLecturesDto } from './dto/create-lectures.dto';
import { Lecture, Lectures, LecturesAPI } from './lectures.interface';
import { LecturesService } from './lectures.service';
import { Count } from 'src/core/interfaces/collection.interface';

@ApiTags('Lectures')
@Controller('lectures')
export class LecturesController {
  constructor(private lecturesService: LecturesService) {}

  @ApiResponse({ status: 200, type: GetLecturesDto })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get()
  getLectures(@Query() query: QueryApi): LecturesAPI {
    const { search, filter, page, pageSize } = query;

    return this.lecturesService.getLectures(search || filter, page, pageSize);
  }

  @Get('count')
  getCount(): Count {
    return this.lecturesService.getCount();
  }

  @ApiResponse({ status: 204 })
  @Delete()
  deleteLectures(@Body() body: Lectures): void {
    this.lecturesService.deleteAll(body);
  }

  @ApiResponse({ status: 200, type: CreateLecturesDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getLecture(@Param() params: ParamQueryId): Lecture {
    return this.lecturesService.getLecture(params['id']);
  }

  @ApiResponse({ status: 200 })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deleteLecture(@Param() params: ParamQueryId): any {
    return this.lecturesService.delete(params['id']);
  }

  @ApiResponse({ status: 201, type: CreateLecturesDto })
  @ApiBody({ type: CreateLecturesDto })
  @Post()
  save(@Body() lecture: Lecture): Lecture {
    return this.lecturesService.save(lecture);
  }

  @ApiResponse({ status: 201, type: CreateLecturesDto })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreateLecturesDto })
  @Put(':id')
  update(@Body() lectures: Lecture, @Param() param: ParamQueryId): Lecture {
    return this.lecturesService.update(param['id'], lectures);
  }

  @ApiResponse({ status: 200, type: GetLecturesDto })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiParam({ name: 'date' })
  @Get('/diff/:date')
  lecturesDiffDate(
    @Param() param: { date: string },
    @Query() query: QueryApi,
  ): LecturesAPI {
    const { page, pageSize } = query;
    return this.lecturesService.lecturesDiffDate(param.date, page, pageSize);
  }
}
