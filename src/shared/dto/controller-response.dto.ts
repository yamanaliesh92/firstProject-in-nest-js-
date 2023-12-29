import { ApiProperty } from '@nestjs/swagger';

export class ControllerResponse<T> {
  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T;

  constructor(dto: Partial<ControllerResponse<T>>) {
    Object.assign(this, dto);
  }
}
