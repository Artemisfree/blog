// import { Injectable } from '@nestjs/common';
// import { MikroORM } from '@mikro-orm/core';
// import { Post } from '../entities/post.entity';
// import { User } from '../entities/user.entity';

// @Injectable()
// export class PostsService {
//   constructor(private readonly orm: MikroORM) {}

//   async createPost(userId: number, title: string, content: string) {
//     const em = this.orm.em.fork();
//     const user = await em.findOne(User, userId);
//     if (!user) {
//       throw new Error('User not found');
//     }
//     const post = new Post();
//     post.title = title;
//     post.content = content;
//     post.author = user;
//     await em.persistAndFlush(post);
//     return post;
//   }

//   async findAll() {
//     const em = this.orm.em.fork();
//     return em.find(Post, {});
//   }

//   async findOne(id: number) {
//     const em = this.orm.em.fork();
//     return em.findOne(Post, id);
//   }

//   async getUserPosts(userId: number) {
//     const em = this.orm.em.fork();
//     const user = await em.findOne(User, userId, { populate: ['posts'] });
//     if (!user) {
//       throw new Error('User not found');
//     }
//     return user.posts.getItems();
//   }
// }

import { Injectable } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class PostsService {
  constructor(private readonly orm: MikroORM) {}

  async createPost(userId: number, title: string, content: string) {
    const em = this.orm.em.fork();
    const user = await em.findOne(User, { id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    const post = new Post();
    post.title = title;
    post.content = content;
    post.author = user;
    await em.persistAndFlush(post);
    return post;
  }

  async findAll() {
    const em = this.orm.em.fork();
    return em.find(Post, {});
  }

  async findOne(id: number) {
    const em = this.orm.em.fork();
    return em.findOne(Post, id);
  }

  async getUserPosts(userId: number) {
    const em = this.orm.em.fork();
    const user = await em.findOne(User, userId, { populate: ['posts'] });
    if (!user) {
      throw new Error('User not found');
    }
    return user.posts.getItems();
  }
}
