import { Injectable } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly orm: MikroORM) {}

  async findAll() {
    const em = this.orm.em.fork();
    return em.find(User, {});
  }

  async findUserPosts(userId: number) {
    const em = this.orm.em.fork();
    const user = await em.findOne(User, userId, { populate: ['posts'] });
    if (!user) {
      throw new Error('User not found');
    }
    return user.posts.getItems();
  }
}
