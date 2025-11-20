/**
 * In-Memory Repository Implementation
 * Replace with real database implementation (TypeORM/Prisma)
 */

import { Injectable } from '@nestjs/common';
import { IExampleRepository } from '../../domain/ports/example.repository.port';
import { ExampleEntity } from '../../domain/entities/example.entity';

@Injectable()
export class InMemoryExampleRepository implements IExampleRepository {
  private readonly storage = new Map<string, ExampleEntity>();

  async findById(id: string): Promise<ExampleEntity | null> {
    return this.storage.get(id) || null;
  }

  async save(entity: ExampleEntity): Promise<ExampleEntity> {
    this.storage.set(entity.getId(), entity);
    return entity;
  }

  async delete(id: string): Promise<void> {
    this.storage.delete(id);
  }

  async findAll(): Promise<ExampleEntity[]> {
    return Array.from(this.storage.values());
  }
}
