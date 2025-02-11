import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity'; 
import { Follow } from '../follows/follow.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
  ) {}

  async findAll() {
    
    const posts = await this.postRepository.find({ relations: ['author'] });

    return posts.map(post => {
      if (post.author) {
        const {password, ...authorWithoutPassword} = post.author;
        return {...post, author: authorWithoutPassword};
      }
      return post;
    })
  }

  async findById(id: number) {
    const post = await this.postRepository.findOne({
       where: { id }, 
       relations: ['author'],
       select: {
        id: true,
        title: true,
        desc: true,
        author: {
          id: true,
          username: true,
          email: true, 
          password: false, 
          },
        }, 
      });
    if (!post) {
        throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async findAllByAuthorId(authorId?: number) {
    const whereCondition = authorId ? { author: { id: authorId } } : {};
    return this.postRepository.find({
      relations: ['author'],
      where: whereCondition,
    });
  }

  async create(title: string, desc: string, authorId: number) {
    if (isNaN(authorId)) {
      throw new BadRequestException('Author ID must be a number');
    }

    const author = await this.userRepository.findOne({ where: { id: authorId } });

    if (!author) {
      throw new NotFoundException('User with this authorId not found');
    }
    const newPost = this.postRepository.create({ title, desc, author: { id: authorId } });
    return this.postRepository.save(newPost);
  }

  async update(id: number, updatedFields: Partial<Post>) {
    await this.postRepository.update(id, updatedFields);
    return this.findById(id);
  }

  async delete(id: number) {
    return this.postRepository.delete(id);
  }

  async getFeed(userId: number) {
    const followings = await this.followRepository.find({
      where: { follower: { id: userId } },
      relations: ['followee'],
    });

    const followingIds = followings.map(f => f.followee.id);
    followingIds.push(userId); 

    return this.postRepository.find({
      where: { author: { id: In(followingIds) } },
      order: { id: 'DESC' },
      relations: ['author'],
      select: {
        id: true,
        title: true,
        desc: true,
        author: {
          id: true,
          username: true,
          email: true, 
          password: false, 
        },
      }, 
    });
  }
}
