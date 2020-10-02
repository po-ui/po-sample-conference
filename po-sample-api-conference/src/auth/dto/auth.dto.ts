import { ApiPropertyOptional } from '@nestjs/swagger';

export class AuthDto {
  @ApiPropertyOptional()
  username: string;

  @ApiPropertyOptional()
  password: string;
}
