import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pizza } from './pizza.entity';
import { PizzaResolver } from './pizza.resolver';
import { PizzaController } from './pizza.controller';
import { PizzaService } from './pizza.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pizza])],
  providers: [PizzaResolver, PizzaService],
  exports: [TypeOrmModule],
  controllers: [PizzaController],
})
export class PizzaModule {}
