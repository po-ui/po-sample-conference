import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateConferencesDto {
  @ApiPropertyOptional()
  id: number;

  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  date: Date;

  @ApiPropertyOptional()
  location: string;

  @ApiPropertyOptional()
  description: string;
    
  @ApiPropertyOptional()
  po_sync_date: Date;
}
