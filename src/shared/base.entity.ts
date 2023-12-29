import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updateAt: Date;
}
