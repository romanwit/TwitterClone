import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from '../comments/comment.entity';
import { Post } from '../posts/post.entity';
import { Follow } from '../follows/follow.entity';
import { Like } from '../likes/like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  following: Follow[];
  
  @OneToMany(() => Follow, (follow) => follow.followee)
  followers: Follow[];
  
  @OneToMany(() => Like, (like) => like.user, { cascade: true })
  likes: Like[];

}

