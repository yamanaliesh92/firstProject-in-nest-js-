import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from './email.service';

@Injectable()
export class SharedEmailService implements EmailService {
  send(msg: string) {
    throw new Error();
    Logger.log('Email was sent via shared', { msg });
  }
}
