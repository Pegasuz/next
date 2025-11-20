/**
 * Value Object - Immutable, Pure TypeScript
 */

export class ExampleName {
  private readonly value: string;

  constructor(name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    if (name.length > 100) {
      throw new Error('Name cannot exceed 100 characters');
    }
    this.value = name.trim();
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ExampleName): boolean {
    return this.value === other.value;
  }
}
