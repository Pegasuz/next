/**
 * HTTP Controller - REST API Entry Point
 */

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateExampleCommand } from '../../application/commands/create-example.command';
import { GetExampleQuery } from '../../application/queries/get-example.query';
import { CreateExampleDto, ExampleResponseDto } from '../../application/dtos/example.dto';
import { randomUUID } from 'crypto';

@Controller('examples')
export class ExampleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateExampleDto): Promise<ExampleResponseDto> {
    const id = randomUUID();
    const entity = await this.commandBus.execute(new CreateExampleCommand(id, dto.name));

    return {
      id: entity.getId(),
      name: entity.getName(),
      createdAt: entity.getCreatedAt(),
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ExampleResponseDto | null> {
    const entity = await this.queryBus.execute(new GetExampleQuery(id));

    if (!entity) {
      return null;
    }

    return {
      id: entity.getId(),
      name: entity.getName(),
      createdAt: entity.getCreatedAt(),
    };
  }
}
