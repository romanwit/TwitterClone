import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
  ) {}

  async followUser(followerId: number, followeeId: number) {
    const follow = this.followRepository.create({ follower: { id: followerId }, followee: { id: followeeId } });
    return this.followRepository.save(follow);
  }

  async unfollowUser(followerId: number, followeeId: number) {
    return this.followRepository.delete({ follower: { id: followerId }, followee: { id: followeeId } });
  }
}
