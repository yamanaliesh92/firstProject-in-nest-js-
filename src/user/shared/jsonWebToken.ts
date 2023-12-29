import { Role, State } from '../user.entity';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface IPayload {
  id: number;
  role: Role;
  state: State;
}
const secret = 'GDSGDSajwir1r';

@Injectable()
export class Jwt {
  async sign(payload: IPayload) {
    if (!payload.id) {
      throw new InternalServerErrorException('id is required but is not exist');
    }
    const roles = Object.values(Role);
    if (!roles.includes(payload.role)) {
      throw new InternalServerErrorException('role isnot correct');
    }
    const states = Object.values(State);
    if (!states.includes(payload.state)) {
      throw new InternalServerErrorException('state isnot correct');
    }
    try {
      return jwt.sign(payload, secret);
    } catch (error) {
      Logger.log('error occured during signToken');
      throw new InternalServerErrorException('some thing went wrong');
    }
  }
  decode(token: string) {
    try {
      return jwt.decode(token) as IPayload;
    } catch (err) {
      Logger.log('error occured during signToken');
      throw new InternalServerErrorException('some thing went wrong');
    }
  }
}
