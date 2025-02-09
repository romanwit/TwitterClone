import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UserService } from 'src/users/user.service';
import { UserModule } from 'src/users/users.module';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User]), UserModule],
  providers: [PostService, UserService],
  controllers: [PostController],
})
export class PostModule {}
