import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bycrpt from 'bcryptjs';
const salt = 6;
@Injectable()
export class Bcrypt {
  async hashPassword(str: string) {
    // try {
    const hash = await bycrpt.hash(str, 10);
    Logger.log('han', hash);
    return hash;
    // } catch (err) {
    // Logger.log('worng in hash password', { err });
    throw new UnauthorizedException('error in hashing');
    // }
  }
  async comparePassword(str: string, hash: string) {
    try {
      Logger.log('befor compare');
      return await bycrpt.compare(str, hash);
      Logger.log('after compare');
    } catch (err) {
      Logger.log('worng in compare password', { err });
      throw new UnauthorizedException('error in compare');
    }
  }
}
