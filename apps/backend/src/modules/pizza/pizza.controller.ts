import { Controller, Get, Param, Query } from '@nestjs/common';

import { PizzaService } from './pizza.service';

import { PageOptionsDto } from './dto/page-options.dto';
import { PageDto } from './dto/page.dto';
import { GetPizzaDTO } from './dto/get-pizza.dto';

@Controller('pizza')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Get('all')
  findAll(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<GetPizzaDTO>> {
    return this.pizzaService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<GetPizzaDTO> {
    return this.pizzaService.findOne(id);
  }
}
