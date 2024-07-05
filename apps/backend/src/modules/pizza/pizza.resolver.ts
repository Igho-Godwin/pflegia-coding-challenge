// pizza.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Pizza } from './pizza.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver(() => Pizza)
export class PizzaResolver {
  constructor(
    @InjectRepository(Pizza)
    private pizzaRepository: Repository<Pizza>
  ) {}

  @Query(() => [Pizza])
  async getPizzas() {
    return this.pizzaRepository.find();
  }
  @Query(() => Pizza)
  async getPizza(@Args('id') id: number) {
    return this.pizzaRepository.findOneBy({ id });
  }
}
