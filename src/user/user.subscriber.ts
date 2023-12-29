import {
  AfterLoad,
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  afterLoad(user: User) {
    if (user.follows) {
      user.followCount = user.follows.length;
    }
  }
}
