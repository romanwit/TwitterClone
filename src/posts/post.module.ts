import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UserService } from '../users/user.service';
import { UserModule } from '../users/users.module';
import { User } from '../users/user.entity';
import { Follow } from '../follows/follow.entity';
import { FollowModule } from '../follows/follow.module';
import { FollowService } from 'src/follows/follow.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Follow]), UserModule, FollowModule],
  providers: [PostService, UserService, FollowService],
  controllers: [PostController],
})
export class PostModule {}
