import { Role, State } from '../user.entity';
import { ExecutionContext, Injectable, mixin, Logger } from '@nestjs/common';

import { Jwt } from './jsonWebToken';
export interface IRequest {
  user: {
    id: number;
    role: Role;
    state: State;
  };
}

const TOKEN_HEADER = 'auth';
export function AuthGuard(role?: Role, state?: State) {
  @Injectable()
  class AuthGuard {
    constructor(public readonly jwt: Jwt) {}
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const token = request.headers[TOKEN_HEADER];
      if (!token) {
        return false;
      }
      const decode = this.jwt.decode(token);
      request.user = decode;

      if (role && decode.role !== role) {
        return false;
      }
      if (state && decode.state !== state) {
        return false;
      }
      return true;
    }
  }
  return mixin(AuthGuard);
}
