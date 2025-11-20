/**
 * Query Handler - Handles read operations
 */

import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetExampleQuery } from '../queries/get-example.query';
import { ExampleEntity } from '../../domain/entities/example.entity';
import { IExampleRepository, EXAMPLE_REPOSITORY } from '../../domain/ports/example.repository.port';

@QueryHandler(GetExampleQuery)
export class GetExampleHandler implements IQueryHandler<GetExampleQuery> {
  constructor(
    @Inject(EXAMPLE_REPOSITORY)
    private readonly repository: IExampleRepository,
  ) {}

  async execute(query: GetExampleQuery): Promise<ExampleEntity | null> {
    return this.repository.findById(query.id);
  }
}
