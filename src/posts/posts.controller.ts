// import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
// import { PostsService } from './posts.service';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @Controller('posts')
// export class PostsController {
//   constructor(private readonly postsService: PostsService) {}

//   @UseGuards(JwtAuthGuard)
//   @Post()
//   async createPost(
//     @Body() body: { userId: number; title: string; content: string },
//   ) {
//     return this.postsService.createPost(body.userId, body.title, body.content);
//   }

//   @Get()
//   async findAll() {
//     return this.postsService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: number) {
//     return this.postsService.findOne(id);
//   }
// }

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @Body() body: { title: string; content: string },
    @Request() req,
  ) {
    return this.postsService.createPost(
      req.user.userId,
      body.title,
      body.content,
    );
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }
}
