/**
 * Command Handler - Orchestrates the command execution
 */

import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateExampleCommand } from '../commands/create-example.command';
import { ExampleEntity } from '../../domain/entities/example.entity';
import { IExampleRepository, EXAMPLE_REPOSITORY } from '../../domain/ports/example.repository.port';

@CommandHandler(CreateExampleCommand)
export class CreateExampleHandler implements ICommandHandler<CreateExampleCommand> {
  constructor(
    @Inject(EXAMPLE_REPOSITORY)
    private readonly repository: IExampleRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateExampleCommand): Promise<ExampleEntity> {
    const entity = ExampleEntity.create(command.id, command.name);
    const savedEntity = await this.repository.save(entity);

    // Publish domain events
    entity.getDomainEvents().forEach((event) => {
      this.eventBus.publish(event);
    });
    entity.clearDomainEvents();

    return savedEntity;
  }
}
