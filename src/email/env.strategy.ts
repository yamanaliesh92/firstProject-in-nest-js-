import { ConfigService } from '@nestjs/config';
import { MailtrapEmailService } from './mail-trap-email.service';
import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from './email.service';
import { SharedEmailService } from './shared-email.service';

@Injectable()
export class EmailEnvStrategy {
  constructor(private readonly config: ConfigService) {}

  get(): EmailService {
    if (this.config.get('EMAIL_PROVIDER') === 'mailtrap') {
      return new MailtrapEmailService();
    } else {
      return new SharedEmailService();
    }
  }
}
