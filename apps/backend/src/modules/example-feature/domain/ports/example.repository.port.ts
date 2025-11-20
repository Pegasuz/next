/**
 * Repository Port (Interface) - Pure TypeScript
 * Defines the contract for persistence
 */

import { ExampleEntity } from '../entities/example.entity';

export interface IExampleRepository {
  findById(id: string): Promise<ExampleEntity | null>;
  save(entity: ExampleEntity): Promise<ExampleEntity>;
  delete(id: string): Promise<void>;
  findAll(): Promise<ExampleEntity[]>;
}

export const EXAMPLE_REPOSITORY = Symbol('IExampleRepository');
