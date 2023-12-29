import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class EmailService {
  abstract send(message: string): void;
}
