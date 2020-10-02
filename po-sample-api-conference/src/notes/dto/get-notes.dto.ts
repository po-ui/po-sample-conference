import { ApiProperty } from '@nestjs/swagger';
import { CreateNotesDto } from './create-notes.dto';

export class GetNotesDto {
  @ApiProperty()
  hasNext: boolean;

  @ApiProperty({ type: () => [CreateNotesDto] })
  items: Array<CreateNotesDto>;

  @ApiProperty()
  po_sync_date: Date;
}
