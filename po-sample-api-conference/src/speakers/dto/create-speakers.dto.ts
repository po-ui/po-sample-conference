import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSpeakersDto {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  photo: string;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional()
  lectures: Array<any>;

  @ApiPropertyOptional()
  po_sync_date: string;
}
