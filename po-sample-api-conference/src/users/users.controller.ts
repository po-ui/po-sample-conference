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
import { GetUsersDto } from './dto/get-users.dto';
import { CreateUsersDto } from './dto/create-users.dto';
import { User, Users, UsersAPI } from './users.interface';
import { UsersService } from './users.service';
import { Count } from 'src/core/interfaces/collection.interface';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ status: 200, type: GetUsersDto })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get()
  getUsers(@Query() query: QueryApi): UsersAPI {
    const { search, filter, page, pageSize } = query;

    return this.usersService.getUsers(search || filter, page, pageSize);
  }

  @Get('count')
  getCount(): Count {
    return this.usersService.getCount();
  }

  @ApiResponse({ status: 204 })
  @Delete()
  deleteUsers(@Body() body: Users): void {
    this.usersService.deleteAll(body);
  }

  @ApiResponse({ status: 200, type: CreateUsersDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getUser(@Param() params: ParamQueryId): User {
    return this.usersService.getUser(params['id']);
  }

  @ApiResponse({ status: 200 })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deleteUser(@Param() params: ParamQueryId): any {
    return this.usersService.delete(params['id']);
  }

  @ApiResponse({ status: 201, type: CreateUsersDto })
  @ApiBody({ type: CreateUsersDto })
  @Post()
  save(@Body() user: User): User {
    return this.usersService.save(user);
  }

  @ApiResponse({ status: 201, type: CreateUsersDto })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreateUsersDto })
  @Put(':id')
  update(@Body() users: User, @Param() param: ParamQueryId): User {
    return this.usersService.update(param['id'], users);
  }

  @ApiResponse({ status: 200, type: GetUsersDto })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiParam({ name: 'date' })
  @Get('/diff/:date')
  usersDiffDate(
    @Param() param: { date: string },
    @Query() query: QueryApi,
  ): UsersAPI {
    const { page, pageSize } = query;
    return this.usersService.usersDiffDate(param.date, page, pageSize);
  }
}
