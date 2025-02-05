import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':id/like')
  @UseGuards(AuthGuard('jwt'))
  async likePost(
    @Param('id') postId: number,
    @Body() likeData: { userId: number },
  ) {
    return this.likeService.likePost(likeData.userId, postId);
  }

  @Post(':id/unlike')
  @UseGuards(AuthGuard('jwt'))
  async unlikePost(
    @Param('id') postId: number,
    @Body() likeData: { userId: number },
  ) {
    return this.likeService.unlikePost(likeData.userId, postId);
  }
}
