import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, User])],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
