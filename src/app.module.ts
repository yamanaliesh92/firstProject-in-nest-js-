import { UserSubscriber } from './user/user.subscriber';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { Post } from './post/post.entity';
import { LikeModule } from './like/like.module';
import { Like } from './like/like.entity';
import { FollowModule } from './follow/follow.module';
import { Followe } from './follow/follow.entity';
import { InfoModule } from './Info/info.module';
import { Info } from './Info/info.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/comment.entity';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/chat.entity';
import { ConfigModule } from '@nestjs/config';
import { MigrationPHoneNumber1928929929292 } from './migrations/phone-number-migration';

@Module({
  imports: [
    UserModule,
    LikeModule,
    PostModule,
    InfoModule,
    CommentModule,
    FollowModule,
    ConfigModule.forRoot(),
    ChatModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dev-database',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test',
      subscribers: [UserSubscriber],
      entities: [User, Post, Like, Followe, Info, Comment, Chat],
      synchronize: true,
      migrationsTableName: 'migrations',
      migrations: [MigrationPHoneNumber1928929929292],
      migrationsRun: true,
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
