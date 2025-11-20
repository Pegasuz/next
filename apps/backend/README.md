# Backend - NestJS with DDD & CQRS

This is the backend application built with NestJS, following Domain-Driven Design (DDD), Command Query Responsibility Segregation (CQRS), and Event-Driven Architecture patterns.

## Architecture Overview

### Vertical Slice Architecture
Each feature is organized as a self-contained module with the following layers:

```
src/modules/[feature-name]/
├── domain/                  # PURE TYPESCRIPT - No framework dependencies
│   ├── entities/            # Aggregate Roots & Entities (business logic)
│   ├── value-objects/       # Immutable value objects
│   ├── events/              # Domain Events
│   └── ports/               # Repository Interfaces (abstract contracts)
├── application/             # ORCHESTRATION LAYER
│   ├── commands/            # Command objects (Write operations)
│   ├── queries/             # Query objects (Read operations)
│   ├── handlers/            # Command & Query Handlers
│   ├── sagas/               # Complex workflows
│   └── dtos/                # Data Transfer Objects
├── infrastructure/          # IMPLEMENTATION LAYER
│   ├── persistence/         # Database implementations (TypeORM)
│   └── adapters/            # External service adapters
└── interface/               # ENTRY POINTS
    ├── http/                # REST Controllers
    └── consumers/           # Queue Consumers
```

## Technology Stack

- **NestJS**: Progressive Node.js framework
- **TypeORM**: ORM for PostgreSQL
- **PostgreSQL**: Primary database
- **CQRS**: @nestjs/cqrs package
- **Event Emitter**: For domain events

## Getting Started

### Prerequisites

- PostgreSQL database running (see [../DOCKER.md](../../DOCKER.md))
- Node.js >= 18.0.0

### Environment Setup

Copy the example environment file:
```bash
cp .env.example .env
```

Update the database configuration in `.env`:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=app_db
DATABASE_SYNCHRONIZE=true
DATABASE_LOGGING=true
```

### Install dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

The backend will be available at http://localhost:3001/api

### Build
```bash
npm run build
```

### Test
```bash
npm run test
```

### Lint
```bash
npm run lint
```

## Database

### TypeORM Configuration

TypeORM is configured in `app.module.ts` with:
- Automatic entity discovery (`**/*.entity.orm.ts`)
- Environment-based configuration
- Synchronization in development (set `DATABASE_SYNCHRONIZE=false` in production)

### Creating Migrations

When `DATABASE_SYNCHRONIZE` is disabled, use migrations:

```bash
# Generate migration
npm run typeorm migration:generate -- -n MigrationName

# Run migrations
npm run typeorm migration:run

# Revert migration
npm run typeorm migration:revert
```

### Repository Pattern

The domain layer defines repository interfaces (ports):
```typescript
// domain/ports/example.repository.port.ts
export interface IExampleRepository {
  findById(id: string): Promise<ExampleEntity | null>;
  save(entity: ExampleEntity): Promise<ExampleEntity>;
}
```

The infrastructure layer implements them with TypeORM:
```typescript
// infrastructure/persistence/typeorm-example.repository.ts
@Injectable()
export class TypeOrmExampleRepository implements IExampleRepository {
  // Implementation using TypeORM
}
```

## Key Principles

1. **Dependency Rule**: Dependencies point inward. Domain layer has no dependencies.
2. **CQRS**: Separate read and write operations.
3. **Domain Events**: Use events for cross-aggregate communication.
4. **Repository Pattern**: Abstract data access through ports/interfaces.
5. **No `any` types**: Strict TypeScript typing throughout.
6. **Separation of Concerns**: Domain entities are pure TypeScript, ORM entities map to database.

## Example Module

The `example-feature` module demonstrates the complete DDD structure:
- Pure domain entities with business logic
- Command/Query handlers for CQRS
- Repository port (interface) in domain
- TypeORM repository implementation with entity mapping
- REST controller as entry point
- PostgreSQL integration via TypeORM

## API Endpoints

### Examples API

- `POST /api/examples` - Create a new example
  ```json
  {
    "name": "Example Name"
  }
  ```

- `GET /api/examples/:id` - Get example by ID

## Testing

The backend includes:
- Unit tests for domain logic
- Integration tests for handlers
- E2E tests for API endpoints

Run tests:
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```
