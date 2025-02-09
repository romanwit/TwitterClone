import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { User } from 'src/users/user.entity';
import { UserModule } from 'src/users/users.module';
import { UserService } from 'src/users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Follow, User]), UserModule],
  providers: [FollowService, UserService],
  controllers: [FollowController],
})
export class FollowModule {}
