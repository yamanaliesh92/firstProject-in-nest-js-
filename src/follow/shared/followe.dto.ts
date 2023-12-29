import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateFollowDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  followingId: number;
}
