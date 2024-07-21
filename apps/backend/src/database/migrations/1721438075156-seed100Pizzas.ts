import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { times } from 'lodash';

export class Seed100Pizzas1721438075156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 1; i <= 100; i++) {
      const name = faker.commerce.product() + ' pizza';
      const rating = faker.number.int({ min: 1, max: 12 });
      const imageUrl = faker.image.urlLoremFlickr({
        category: 'food'
      });
      const ingredients = times(faker.number.int({ min: 1, max: 7 }), () =>
        faker.lorem.words({ min: 1, max: 3 })
      );
      const instructions = times(faker.number.int({ min: 2, max: 7 }), () =>
        faker.lorem.sentence()
      );
      queryRunner.query(`
            INSERT INTO "pizza" (name, rating, image_url, ingredients, instructions)
            VALUES
            ('${name}','${rating}','${imageUrl}',ARRAY[${ingredients
        .map((e) => `'${e}'`)
        .join(', ')}],ARRAY[${instructions.map((e) => `'${e}'`).join(', ')}])
          `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DELETE  FROM "pizza"`);
  }
}
