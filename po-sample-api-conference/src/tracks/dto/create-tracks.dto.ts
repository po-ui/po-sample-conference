import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTracksDto {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  color: string;

  @ApiPropertyOptional()
  po_sync_date: string;
}
