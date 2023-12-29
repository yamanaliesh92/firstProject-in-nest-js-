import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class createLike {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @ApiProperty({ example: 2 })
  postId: number;
}
