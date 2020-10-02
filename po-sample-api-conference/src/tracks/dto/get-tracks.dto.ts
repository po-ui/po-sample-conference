import { ApiProperty } from '@nestjs/swagger';
import { CreateTracksDto } from './create-tracks.dto';

export class GetTracksDto {
  @ApiProperty()
  hasNext: boolean;

  @ApiProperty({ type: () => [CreateTracksDto] })
  items: Array<CreateTracksDto>;

  @ApiProperty()
  po_sync_date: Date;
}
