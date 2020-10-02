import { ApiProperty } from '@nestjs/swagger';
import { CreateUsersDto } from './create-users.dto';

export class GetUsersDto {
  @ApiProperty()
  hasNext: boolean;

  @ApiProperty({ type: () => [CreateUsersDto] })
  items: Array<CreateUsersDto>;

  @ApiProperty()
  po_sync_date: Date;
}
