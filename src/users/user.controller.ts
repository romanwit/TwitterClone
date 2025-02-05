import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserData: { username: string, email: string, password: string }) {
    return this.userService.create(createUserData.username, createUserData.email, createUserData.password);
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.findById(id);
  }
}
