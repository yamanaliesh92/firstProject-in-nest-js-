import { MigrationPHoneNumber1928929929292 } from './migrations/phone-number-migration';
import { Post } from './post/post.entity';
/* eslint-disable @typescript-eslint/no-var-requires */
import { DataSource } from 'typeorm';
import { Chat } from './chat/chat.entity';
import { Followe } from './follow/follow.entity';
import { Info } from './Info/info.entity';
import { User } from './user/user.entity';
import { Comment } from './comment/comment.entity';
import { Like } from './like/like.entity';

const config = {
  type: 'postgres',
  host: 'localhost',
  port: 5439,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [User, Like, Followe, Info, Chat, Post, Comment],
  migrationsTableName: 'migrations',
  migrations: [MigrationPHoneNumber1928929929292],
};

const datasource = new DataSource(config as any);
datasource.initialize();

export default datasource;
