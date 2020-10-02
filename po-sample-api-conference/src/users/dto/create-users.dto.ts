import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateNotesDto } from 'src/notes/dto/create-notes.dto';

export class CreateUsersDto {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  username: string;

  @ApiPropertyOptional()
  password: string;

  @ApiPropertyOptional()
  isSuperUser: boolean;

  @ApiPropertyOptional()
  notes: CreateNotesDto;

  @ApiPropertyOptional()
  po_sync_date: string;
}
