import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts() {
    return this.postService.findAll();
  }

  @Get(':id')
  async getPostById(@Param('id') id: number) {
    return this.postService.findById(id);
  }

  @Get('author/:authorId')
  async getPostsByAuthorId(@Param('authorId') authorId: number) {
    return this.postService.findAllByAuthorId(authorId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt')) 
  async createPost(@Body() postData: CreatePostDto) {
    const { title, desc, authorId } = postData;
    return this.postService.create(title, desc, authorId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: { title?: string; desc?: string },
  ) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deletePost(@Param('id') id: number) {
    return this.postService.delete(id);
  }
}
