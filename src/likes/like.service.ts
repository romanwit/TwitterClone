import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { User } from '../users/user.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async likePost(userId: number, postId: number) {
    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) {
      throw new NotFoundException(`userId ${userId} not found`);
    }
    /*const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }*/
    const like = await this.likeRepository.findOne({
      where: {
        post: {id: postId}, 
        user: {id: userId}
    } });
    if (like) {
      throw new BadRequestException(`post ${postId} is already liked by ${userId}`);
    }
    const newLike = this.likeRepository.create({ user: { id: userId }, post: { id: postId } });
    return await this.likeRepository.save(newLike);
  }

  async unlikePost(userId: number, postId: number) {
    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) {
      throw new NotFoundException(`userId ${userId} not found`);
    }
    return await this.likeRepository.delete({ user: { id: userId }, post: { id: postId } });
  }
}
