import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from './email.service';

@Injectable()
export class MailtrapEmailService implements EmailService {
  send(msg: string) {
    Logger.log('Email was sent via mail trap', { msg });
  }
}
