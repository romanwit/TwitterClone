import { Controller, Post, Body, Param, UseGuards, Request, HttpCode } from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('likes')
export class LikeController {
  constructor(
    private readonly likeService: LikeService
  ) {}

  @Post(':id/like')
  @UseGuards(AuthGuard('jwt'))
  async likePost(
    @Param('id') postId: number,
    @Request() req     
  ) {
    const userId = req.user.id;
    return this.likeService.likePost(userId, postId);
  }

  @Post(':id/unlike')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async unlikePost(
    @Param('id') postId: number,
    @Request() req
  ) {
    const userId = req.user.id;
    return this.likeService.unlikePost(userId, postId);
  }
}
