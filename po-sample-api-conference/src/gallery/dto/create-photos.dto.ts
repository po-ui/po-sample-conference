import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePhotosDto {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  photo: string;

  @ApiPropertyOptional()
  po_sync_date: Date;
}
