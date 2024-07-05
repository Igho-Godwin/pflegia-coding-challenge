import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1000000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "pizza" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        rating INT,
        image_url VARCHAR(255),
        ingredients TEXT[],
        instructions TEXT[]
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pizza"`);
  }
}
