import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  constructor(dto: Partial<UpdateCommentDto>) {
    Object.assign(this, dto);
  }
}
