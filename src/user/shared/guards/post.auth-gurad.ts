import { PostService } from './../../../post/post.service';
import {
  ExecutionContext,
  Logger,
  NotFoundException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class PostGuard {
  constructor(public readonly post: PostService) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();

      const postId: number = request.params.id;
      const userId: number = request?.user?.id;

      if (!userId) return false;

      const post = await this.post.get(postId);

      if (userId !== post.userId) {
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
