import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('follows')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':id/follow')
  @UseGuards(AuthGuard('jwt'))
  async followUser(
    @Param('id') followeeId: number,
    @Body() followData: { followerId: number },
  ) {
    return this.followService.followUser(followData.followerId, followeeId);
  }

  @Post(':id/unfollow')
  @UseGuards(AuthGuard('jwt'))
  async unfollowUser(
    @Param('id') followeeId: number,
    @Body() followData: { followerId: number },
  ) {
    return this.followService.unfollowUser(followData.followerId, followeeId);
  }
}
