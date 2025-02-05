import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async likePost(userId: number, postId: number) {
    const newLike = this.likeRepository.create({ user: { id: userId }, post: { id: postId } });
    return this.likeRepository.save(newLike);
  }

  async unlikePost(userId: number, postId: number) {
    return this.likeRepository.delete({ user: { id: userId }, post: { id: postId } });
  }
}
