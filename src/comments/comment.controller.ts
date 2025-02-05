import { Controller, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':id')
  @UseGuards(AuthGuard('jwt'))
  async addComment(
    @Param('id') postId: number,
    @Body() commentData: { userId: number; comment: string },
  ) {
    const { userId, comment } = commentData;
    return this.commentService.addComment(userId, postId, comment);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteComment(@Param('id') commentId: number) {
    return this.commentService.deleteComment(commentId);
  }
}
