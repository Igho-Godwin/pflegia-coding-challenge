import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pizza } from './pizza.entity';

import { PageOptionsDto } from './dto/page-options.dto';
import { PageDto } from './dto/page.dto';
import { PageMetaDto } from './dto/page-meta.dto';
import { GetPizzaDTO } from './dto/get-pizza.dto';

@Injectable()
export class PizzaService {
  constructor(
    @InjectRepository(Pizza)
    private pizzaRepository: Repository<Pizza>
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<GetPizzaDTO>> {
    const queryBuilder = this.pizzaRepository.createQueryBuilder('pizza');
    queryBuilder.orderBy('pizza.id', pageOptionsDto.order);
    queryBuilder.skip(pageOptionsDto.skip).take(pageOptionsDto.take);
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number): Promise<GetPizzaDTO> {
    return await this.pizzaRepository.findOneBy({ id });
  }
}
