import { CreateDatabase1000000000000 } from './1000000000000-CreateDatabase';
import { Seed100Pizzas1721438075156 } from './1721438075156-seed100Pizzas';
import { SeedData1999999999999 } from './1999999999999-SeedData';

export const migrations = [
  //list all migrations
  CreateDatabase1000000000000,
  SeedData1999999999999,
  Seed100Pizzas1721438075156,
  // add other migrations
];
