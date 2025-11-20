/**
 * Feature Module - Wires everything together
 */

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleController } from './interface/http/example.controller';
import { CreateExampleHandler } from './application/handlers/create-example.handler';
import { GetExampleHandler } from './application/handlers/get-example.handler';
import { TypeOrmExampleRepository } from './infrastructure/persistence/typeorm-example.repository';
import { ExampleEntity as OrmEntity } from './infrastructure/persistence/example.entity.orm';
import { EXAMPLE_REPOSITORY } from './domain/ports/example.repository.port';

const CommandHandlers = [CreateExampleHandler];
const QueryHandlers = [GetExampleHandler];
const Repositories = [
  {
    provide: EXAMPLE_REPOSITORY,
    useClass: TypeOrmExampleRepository,
  },
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([OrmEntity])],
  controllers: [ExampleController],
  providers: [...CommandHandlers, ...QueryHandlers, ...Repositories],
})
export class ExampleFeatureModule {}
