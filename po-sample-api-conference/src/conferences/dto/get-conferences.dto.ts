import { ApiProperty } from '@nestjs/swagger';
import { CreateConferencesDto } from './create-conferences.dto';

export class GetConferencesDto {
  @ApiProperty()
  hasNext: boolean;
  
  @ApiProperty({ type: () => [CreateConferencesDto] })
  items: Array<CreateConferencesDto>;

  @ApiProperty()
  po_sync_date: Date;
}
