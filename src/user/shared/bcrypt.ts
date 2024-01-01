import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bycrpt from 'bcryptjs';

@Injectable()
export class Bcrypt {
  async hashPassword(str: string): Promise<string> {
    try {
      return await bycrpt.hash(str, 10);
    } catch (err) {
      throw new UnauthorizedException('error in hashing');
    }
  }
  async comparePassword(str: string, hash: string): Promise<boolean> {
    try {
      return await bycrpt.compare(str, hash);
    } catch (err) {
      throw new UnauthorizedException(
        'some thing wnet wrong try again please..',
      );
    }
  }
}
