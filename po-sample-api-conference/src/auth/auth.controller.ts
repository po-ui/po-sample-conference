import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthJWT, AuthUser } from './auth.interface';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtDto } from './dto/jwt.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 201, type: JwtDto })
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: AuthDto })
  @Post('login')
  async login(@Request() req: { user: AuthUser }): Promise<AuthJWT> {
    return this.authService.login(req.user);
  }
}
