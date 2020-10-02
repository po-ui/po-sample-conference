import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNotesDto {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  text: string;

  @ApiPropertyOptional()
  lectureId: string;

  @ApiPropertyOptional()
  userId: string;

  @ApiPropertyOptional()
  po_sync_date: Date;
}
