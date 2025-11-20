/**
 * DTO - Data Transfer Object
 */

import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateExampleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}

export class ExampleResponseDto {
  id: string;
  name: string;
  createdAt: Date;
}
