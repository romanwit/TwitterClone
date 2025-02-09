import { ConflictException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './follow.entity';
import { User } from '../users/user.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async checkExistence(userId: number):Promise<boolean> {
    const follower = await this.userRepository.findOne({ where: { id: userId } });
    if (follower) {
      Logger.log(`User ID: ${userId} found`);
      return true;
    }
    Logger.log(`User ID: ${userId} not found`);
    return false;
  }

  async followUser(followerId: number, followeeId: number) {
    
    if (! await this.checkExistence(followerId)) {
      throw new NotFoundException("FollowerId not found");
    }
    if (! await this.checkExistence(followeeId)) {
      throw new NotFoundException("FolloweeId not found");
    }

    const existingFollow = await this.followRepository.findOne({ 
      where: { follower: { id: followerId }, followee: { id: followeeId } } 
    });
  
    if (existingFollow) {
      throw new ConflictException('Already following this user');
    }

    const follow = this.followRepository.create({ follower: { id: followerId }, followee: { id: followeeId } });
    return this.followRepository.save(follow);
  }

  async unfollowUser(followerId: number, followeeId: number) {
    
    if (!this.checkExistence(followerId)) throw new NotFoundException("FollowerId not found");
    if (!this.checkExistence(followeeId)) throw new NotFoundException("FolloweeId not found");

    const existingFollow = await this.followRepository.findOne({ 
      where: { follower: { id: followerId }, followee: { id: followeeId } } 
    });
  
    if (!existingFollow) {
      throw new ConflictException('This user is not being followed');
    }

    return this.followRepository.delete({ follower: { id: followerId }, followee: { id: followeeId } });
  }
}
