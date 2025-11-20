/**
 * DTO - Data Transfer Object
 */

export class CreateExampleDto {
  name: string;
}

export class ExampleResponseDto {
  id: string;
  name: string;
  createdAt: Date;
}
