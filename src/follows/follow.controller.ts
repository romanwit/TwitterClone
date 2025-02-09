import { Controller, Post, Param, UseGuards, Request, Logger, HttpCode } from '@nestjs/common';
import { FollowService } from './follow.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('follows')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':id/follow')
  @UseGuards(AuthGuard('jwt'))
  async followUser(
    @Param('id') followeeId: number,
    @Request() req
  ) {
    const followerId = req.user.id;

    Logger.log(`Follower ID: ${followerId}, Followee ID: ${followeeId}`, 'FollowController');

    return this.followService.followUser(followerId, followeeId);
  }

  @Post(':id/unfollow')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async unfollowUser(
    @Param('id') followeeId: number,
    @Request() req
  ) {
    const followerId = req.user.id;

    Logger.log(`Follower ID: ${followerId}, Followee ID: ${followeeId}`, 'FollowController');

    return this.followService.unfollowUser(followerId, followeeId);
  }
}
