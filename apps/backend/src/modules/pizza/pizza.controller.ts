import { Controller, Get, Query } from '@nestjs/common';
import { PizzaService } from './pizza.service';

@Controller('pizza')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Get('all')
  findAll() {
    return this.pizzaService.findAll();
  }

  @Get(':id')
  findOne(@Query('id') id: number) {
    return this.pizzaService.findOne(id);
  }
}
