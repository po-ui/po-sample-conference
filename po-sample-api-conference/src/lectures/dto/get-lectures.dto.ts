import { ApiProperty } from '@nestjs/swagger';
import { CreateLecturesDto } from './create-lectures.dto';

export class GetLecturesDto {
  @ApiProperty()
  hasNext: boolean;

  @ApiProperty({ type: () => [CreateLecturesDto] })
  items: Array<CreateLecturesDto>;

  @ApiProperty()
  po_sync_date: Date;
}
