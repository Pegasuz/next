/**
 * Domain Entity - Pure TypeScript, no framework dependencies
 * Contains business logic
 */

import { ExampleCreatedEvent } from '../events/example-created.event';

export class ExampleEntity {
  private domainEvents: ExampleCreatedEvent[] = [];

  constructor(
    private readonly id: string,
    private name: string,
    private readonly createdAt: Date,
  ) {}

  // Getters
  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // Business logic
  updateName(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    this.name = newName;
  }

  // Domain events
  getDomainEvents(): ExampleCreatedEvent[] {
    return this.domainEvents;
  }

  clearDomainEvents(): void {
    this.domainEvents = [];
  }

  static create(id: string, name: string): ExampleEntity {
    const entity = new ExampleEntity(id, name, new Date());
    entity.domainEvents.push(new ExampleCreatedEvent(id, name));
    return entity;
  }
}
