import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthJWT } from './auth.interface';
import { User } from 'src/users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);
    if (user && user.password === pass && !user.deleted) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<AuthJWT> {
    const payload = {
      username: user.username,
      id: user.id,
      isSuperUser: user.isSuperUser,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
