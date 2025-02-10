import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Post } from '../posts/post.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PostService } from 'src/posts/post.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, User])],
  providers: [CommentService, PostService],
  controllers: [CommentController],
})
export class CommentModule {}
