/**
 * Command - Write Intent
 */

export class CreateExampleCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}
}
