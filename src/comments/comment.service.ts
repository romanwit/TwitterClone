import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

    async findById(id: number): Promise<Comment | undefined> {
      return this.commentRepository.findOne({ where: { id } });
    }

  async addComment(userId: number, postId: number, comment: string) {
    const newComment = this.commentRepository.create({ user: { id: userId }, post: { id: postId }, comment });
    return this.commentRepository.save(newComment);
  }

  async deleteComment(commentId: number) {
    return this.commentRepository.delete(commentId);
  }
}
