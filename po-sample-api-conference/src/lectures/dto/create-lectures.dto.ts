import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateSpeakersDto } from 'src/speakers/dto/create-speakers.dto';
import { CreateTracksDto } from 'src/tracks/dto/create-tracks.dto';

export class CreateLecturesDto {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  room: string;

  @ApiPropertyOptional()
  startTime: string;

  @ApiPropertyOptional()
  endTime: string;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional()
  track: CreateTracksDto;

  @ApiPropertyOptional()
  speaker: CreateSpeakersDto;

  @ApiPropertyOptional()
  po_sync_date: Date;
}
