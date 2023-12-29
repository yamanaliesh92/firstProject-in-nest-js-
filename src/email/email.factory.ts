import { EmailDbStrategy } from './db.stratgey';
import { EmailEnvStrategy } from './env.strategy';
import { MailtrapEmailService } from './mail-trap-email.service';
import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from './email.service';

@Injectable()
export class EmailFactory {
  get(strategy: EmailEnvStrategy | EmailDbStrategy): EmailService {
    return strategy.get();
  }
}
