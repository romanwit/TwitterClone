import { Controller, Post, Body, Param, Delete, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from 'src/posts/post.service';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly postService: PostService
  ) {}

  @Post(':id')
  @UseGuards(AuthGuard('jwt'))
  async addComment(
    @Param('id') postId: number,
    @Request() req,
    @Body() commentData: {comment: string },
  ) {
    const userId = req.user.id;

    const post = await this.postService.findById(postId);
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    return this.commentService.addComment(userId, postId, commentData.comment);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteComment(@Param('id') commentId: number) {
    const comment = await this.commentService.findById(commentId);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }
    return this.commentService.deleteComment(commentId);
  }
}
