import { ApiProperty } from '@nestjs/swagger';
import { CreateSpeakersDto } from './create-speakers.dto';

export class GetSpeakersDto {
  @ApiProperty()
  hasNext: boolean;

  @ApiProperty({ type: () => [CreateSpeakersDto] })
  items: Array<CreateSpeakersDto>;

  @ApiProperty()
  po_sync_date: Date;
}
