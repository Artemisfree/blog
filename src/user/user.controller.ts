import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id/posts')
  async findUserPosts(@Param('id') id: number) {
    return this.usersService.findUserPosts(id);
  }
}
