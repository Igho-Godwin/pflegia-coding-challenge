import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pizza } from './pizza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PizzaService {
  constructor(
    @InjectRepository(Pizza)
    private pizzaRepository: Repository<Pizza>
  ) {}

  findAll() {
    return this.pizzaRepository.find();
  }

  findOne(id: number) {
    return this.pizzaRepository.findOneBy({ id });
  }
}
