/**
 * Domain Event - Pure TypeScript
 */

export class ExampleCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
