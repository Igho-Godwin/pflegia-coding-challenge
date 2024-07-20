import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

export class Seed100Pizzas1721438075156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 1; i <= 100; i++) {
      const name = faker.person.firstName() + ' pizza';
      const rating = faker.number.int({ min: 1, max: 12 });
      const imageUrl = faker.image.urlLoremFlickr({ category: 'food' });
      const ingredients = [
        'Pizza dough',
        'Tomato sauce',
        'Fresh mozzarella cheese',
        'Fresh basil leaves',
        'Olive oil',
        'Salt',
      ];
      const instructions = [
        'Preheat the oven to 475°F (245°C).',
        'Roll out the pizza dough on a floured surface.',
        'Spread tomato sauce evenly on the dough.',
        'Add slices of fresh mozzarella cheese on top.',
        'Bake in the oven for 10-12 minutes until the crust is golden brown and the cheese is bubbly.',
        'Garnish with fresh basil leaves and a drizzle of olive oil before serving.',
      ];
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
