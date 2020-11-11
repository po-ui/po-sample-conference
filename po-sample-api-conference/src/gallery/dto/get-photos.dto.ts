import { ApiProperty } from '@nestjs/swagger';
import { CreatePhotosDto } from './create-photos.dto';

export class GetPhotosDto {
  @ApiProperty()
  hasNext: boolean;

  @ApiProperty({ type: () => [CreatePhotosDto] })
  items: Array<CreatePhotosDto>;

  @ApiProperty()
  po_sync_date: Date;
}
