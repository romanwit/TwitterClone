import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { PostModule } from './posts/post.module';
import { AuthModule } from './auth/auth.module';
import { FollowModule } from './follows/follow.module';
import { LikeModule } from './likes/like.module';
import { CommentModule } from './comments/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    PostModule,
    AuthModule,
    FollowModule,
    LikeModule,
    CommentModule,
  ],
})
export class AppModule {}

