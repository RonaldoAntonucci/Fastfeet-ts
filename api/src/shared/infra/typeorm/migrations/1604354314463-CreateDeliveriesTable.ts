import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateDeliveriesTable1604354314463
  implements MigrationInterface {
  private table = new Table({
    name: 'deliveries',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'deliveryman_id',
        type: 'uuid',
        isNullable: true,
      },
      {
        name: 'product',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'adress',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'postalCode',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'neighborhood',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'city',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'state',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'start_date',
        type: 'timestamp',
        isNullable: true,
      },
      {
        name: 'end_date',
        type: 'timestamp',
        isNullable: true,
      },
      {
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      },
    ],
  });

  private foreignKey = new TableForeignKey({
    name: 'DeliverymanDelivery',
    columnNames: ['deliveryman_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey(this.table, this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.table, this.foreignKey);
    await queryRunner.dropTable(this.table);
  }
}
