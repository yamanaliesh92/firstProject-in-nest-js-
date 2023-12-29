import { User } from 'src/user/user.entity';
import {
  MigrationInterface,
  QueryRunner,
  Column,
  TableColumn,
  IsNull,
} from 'typeorm';

export class MigrationPHoneNumber1928929929292 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const phoneNumber = new TableColumn({
      name: 'phone',
      type: 'text',
      isNullable: true,
    });

    console.log('11111111111111111111111111111111111111111111111111');
    const usersRepo = queryRunner.manager.getRepository(User);

    await queryRunner.addColumn('user', phoneNumber);

    // await usersRepo.update({ phone: IsNull() }, { phone: 'NOT_KNOWN' });

    await queryRunner.changeColumn(
      'user',
      'phone',
      new TableColumn({ name: 'phone', isNullable: false, type: 'text' }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'phone');
  }
}
