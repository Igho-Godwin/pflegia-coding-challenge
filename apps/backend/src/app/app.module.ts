import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import path, { join } from 'path';
import { envSchema } from '../../env-schema';
// Modules
import { PizzaModule } from '../modules/pizza/pizza.module';
// App Module
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Database
import { migrations } from '../database/migrations';
import { entities } from '../database/entities';
import { PizzaController } from '../modules/pizza/pizza.controller';
import { PizzaService } from '../modules/pizza/pizza.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/backend/schema.gql'),
      playground: true,
    }),
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [path.resolve('.env')],
      validationSchema: envSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities,
      migrations,
      migrationsRun: true,
    }),
    TypeOrmModule.forFeature(entities),
    PizzaModule,
  ],
})
export class AppModule {}
