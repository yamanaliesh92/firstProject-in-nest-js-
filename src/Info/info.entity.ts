import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from 'src/shared/base.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('info')
export class Info extends Base {
  @ApiProperty()
  @Column({ type: 'text' })
  workAt: string;

  @ApiProperty()
  @Column({ type: 'text' })
  livesIn: string;

  @ApiProperty()
  @Column({ type: 'text' })
  country: string;

  @ApiProperty()
  @Column({ type: 'text' })
  relationShip: string;

  @OneToOne(() => User)
  user: User;

  @ApiProperty()
  @Column({ type: 'int4' })
  userId: number;

  constructor(dto: Partial<Info>) {
    super();
    Object.assign(this, dto);
  }

  static mockInfo() {
    return new Info({
      country: faker.datatype.string(),
      livesIn: faker.datatype.string(),
      relationShip: faker.datatype.string(),
      workAt: faker.datatype.string(),
    });
  }
}
