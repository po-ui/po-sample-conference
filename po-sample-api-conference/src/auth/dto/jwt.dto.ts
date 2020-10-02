import { ApiPropertyOptional } from '@nestjs/swagger';

export class JwtDto {
  @ApiPropertyOptional()
  access_token: string;
}
