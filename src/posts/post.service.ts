import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll() {
    return this.postRepository.find({ relations: ['author'] });
  }

  async findById(id: number) {
    return this.postRepository.findOne({ where: { id }, relations: ['author'] });
  }

  async create(title: string, desc: string, authorId: number) {
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
}
