import {
  ExecutionContext,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CommentService } from '../comment.service';

@Injectable()
export class CommentGuard {
  constructor(public readonly comment: CommentService) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();

      const Id: number = request.params.id;
      const userId: number = request?.user?.id;

      if (!userId) return false;

      const getComment = await this.comment.get(Id);

      if (userId !== getComment.userId) {
        return false;
      }

      return true;
    } catch (err) {
      if (err instanceof NotFoundException) {
        return false;
      }

      Logger.error('Unknwon error in auth guard', { err });
      return false;
    }
  }
}
