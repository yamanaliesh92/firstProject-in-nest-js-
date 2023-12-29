import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResForgetPassword {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  secret: string;

  constructor(dto: Partial<ResForgetPassword>) {
    Object.assign(this, dto);
  }
}
