import { MigrationInterface, QueryRunner } from 'typeorm';
import { STATIC_PIZZAS } from '@pizzaria/shared/pizzas';

// I have a bad feeling about this
function transformArrayIntoSQLParam(array: string[]) {
  return `ARRAY(${array.map((e) => `'${e}'`).join(', ')})`;
}

function transformPizzaDataIntoSQLParams() {
  return STATIC_PIZZAS.map(
    (pizza) =>
      `(
        '${pizza.name}', 
        ${pizza.rating}, 
        '${pizza.imageUrl}',
        ${transformArrayIntoSQLParam(pizza.ingredients)}, 
        ${transformArrayIntoSQLParam(pizza.instructions)}
      )`
  ).join(', ');
}

export class SeedData1999999999999 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    // Hope this can hold up with 10k insertion 🙏
    queryRunner.query(`
      INSERT INTO "pizza" (name, rating, image_url, ingredients, instructions)
      VALUES
      ${transformPizzaDataIntoSQLParams()}
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DELETE FROM "pizza"`);
  }
}
