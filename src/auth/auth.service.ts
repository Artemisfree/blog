import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { MikroORM } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly orm: MikroORM,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string): Promise<User> {
    const em = this.orm.em.fork();
    const user = new User();
    user.email = email;
    user.password = password;
    await em.persistAndFlush(user);
    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const em = this.orm.em.fork();
    const user = await em.findOne(User, { email });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
