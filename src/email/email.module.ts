import { EmailDbStrategy } from './db.stratgey';
import { EmailFactory } from './email.factory';
import { MailtrapEmailService } from './mail-trap-email.service';
import { Module, Logger } from '@nestjs/common';
import { SharedEmailService } from './shared-email.service';
import { EmailService } from './email.service';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [],
  providers: [
    MailtrapEmailService,
    SharedEmailService,
    ConfigService,
    {
      provide: EmailService,
      inject: [ConfigService],
      useFactory(config: ConfigService): EmailService {
        Logger.log('====================', {
          kfkfkf: config.get('EMAIL_PROVIDER'),
        });
        // if (config.get('EMAIL_PROVIDER') === 'mailtrap') {
        //   return new MailtrapEmailService();
        // } else {
        //   return new SharedEmailService();
        // }

        const factory = new EmailFactory();
        return factory.get(new EmailDbStrategy(config));
      },
    },
  ],
  exports: [{ provide: EmailService, useClass: SharedEmailService }],
})
export class EmailModule {}
