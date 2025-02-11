import { Controller, Get, Post, Body, Param, Delete, Request, BadRequestException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Delete() 
  @UseGuards(AuthGuard('jwt')) 
  async deleteUser(
    @Request() req
  ) {
    const user = req.user;
    if (!user) {
      throw new BadRequestException("user not found");
    }
    const userId = user.id;
    if (!userId) {
      throw new BadRequestException("userId not found");
    }
    await this.userService.delete(userId);
  }
}
