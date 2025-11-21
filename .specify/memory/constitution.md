<!--
Sync Impact Report

Version: 0.0.0 → 1.0.0
Change Type: MAJOR (Initial constitution ratification)

Modified Principles: N/A (Initial creation)
Added Sections:
  - Core Principles (6 principles)
  - Technical Constraints
  - Development Workflow
  - Governance

Templates Status:
  ✅ .specify/templates/plan-template.md - Constitution Check references aligned
  ✅ .specify/templates/spec-template.md - User story structure supports principles
  ✅ .specify/templates/tasks-template.md - Task organization reflects architecture
  ✅ .specify/templates/agent-file-template.md - Generic structure, no updates needed
  ✅ .specify/templates/checklist-template.md - Generic structure, no updates needed

Documentation Status:
  ✅ .github/copilot-instructions.md - Already aligned with DDD, CQRS, and vertical slice principles
  ✅ README.md - Constitution referenced as authoritative source
  ✅ QUICKSTART.md - Constitution listed in required reading
  ✅ apps/backend/README.md - Architecture details consistent with constitution

Follow-up TODOs: None
-->

# Next.js + NestJS Monorepo Constitution

## Core Principles

### I. Domain-Driven Design (DDD)

The backend MUST follow DDD principles with clear bounded contexts and layer separation:

- **Domain Layer**: Pure TypeScript business logic with NO framework dependencies
- **Application Layer**: Use cases and orchestration using CQRS handlers  
- **Infrastructure Layer**: Technical implementations (database, external APIs)
- **Interface Layer**: Entry points (HTTP controllers, message consumers)

**Rationale**: DDD ensures business logic remains independent of technical implementation details, enabling long-term maintainability and testability. The domain layer's framework independence allows business rules to evolve without being constrained by infrastructure choices.

### II. CQRS (Command Query Responsibility Segregation)

All state-changing operations MUST be separated from data-retrieval operations:

- **Commands**: Write operations that change state (handled by command handlers)
- **Queries**: Read operations that return data (handled by query handlers)  
- **Handlers**: Execute commands and queries following single responsibility
- **Events**: Domain events enable async communication between aggregates

**Rationale**: CQRS enables independent scaling of read and write operations, clearer separation of concerns, and explicit modeling of business operations as commands.

### III. Separation of Concerns

Each layer and component MUST have a single, well-defined responsibility:

- **Frontend**: Presentation and user interaction only—NO business logic
- **Backend**: ALL business logic resides in domain entities
- **Shared Types**: Only DTOs and interfaces—NEVER implementation code
- **Features**: Organized by domain (vertical slices), NOT by technical layer

**Rationale**: Clear boundaries prevent cross-layer contamination, reduce coupling, and make the codebase easier to understand and modify.

### IV. Dependency Rule

Dependencies MUST point inward toward the domain:

- Domain layer has NO external dependencies (pure TypeScript)
- Application layer depends on Domain only
- Infrastructure depends on Application and Domain
- Interface depends on Application

**Rationale**: The Dependency Rule ensures the business logic remains independent and stable while allowing infrastructure and interface details to change freely.

### V. Strict TypeScript Typing

The codebase MUST maintain strict TypeScript typing throughout:

- NO `any` types allowed anywhere in the codebase
- All function parameters and return types MUST be explicitly typed
- Shared types package provides type safety across frontend and backend
- Domain entities MUST be strongly typed

**Rationale**: Strict typing catches errors at compile time, improves IDE support, serves as implicit documentation, and prevents runtime type errors.

### VI. Repository Pattern

Data access MUST be abstracted through repository interfaces:

- Domain layer defines repository ports (interfaces)
- Infrastructure layer implements repositories (e.g., TypeORM)
- Domain entities remain independent of persistence mechanism
- Repository interfaces enable testing with in-memory implementations

**Rationale**: Repository pattern decouples domain logic from data access implementation, enabling database technology changes without affecting business logic and facilitating unit testing.

## Technical Constraints

### Technology Stack Requirements

**Backend**:
- NestJS framework (Progressive Node.js)
- TypeORM for database operations
- PostgreSQL as primary database
- @nestjs/cqrs for command/query handling
- Event Emitter for domain events

**Frontend**:
- Next.js 14 with App Router
- TypeScript (strict mode)
- Tailwind CSS for styling
- Shared types from @monorepo/shared-types

**Development**:
- Node.js >= 18.0.0 required
- npm >= 9.0.0 required
- Docker for PostgreSQL database
- npm workspaces for monorepo management

### Database Management

- TypeORM automatic entity discovery (`**/*.entity.orm.ts`)
- Database synchronization MUST be disabled in production
- Migrations MUST be used for schema changes in production
- Environment-based configuration required

### Project Structure

Features MUST follow vertical slice architecture:
```
src/modules/[feature-name]/
├── domain/          # Pure TypeScript (no framework)
├── application/     # CQRS handlers, DTOs
├── infrastructure/  # TypeORM repositories, adapters
└── interface/       # Controllers, consumers
```

## Development Workflow

### Adding New Features

1. Create feature specification following user story format
2. Design domain model with entities and value objects
3. Define repository ports in domain layer
4. Implement CQRS command and query handlers
5. Create infrastructure implementations (TypeORM repositories)
6. Add HTTP controllers or message consumers
7. Register module in app.module.ts
8. Write tests for domain logic and integration points

### Testing Requirements

- Unit tests MUST be written for domain logic
- Integration tests MUST be written for handlers
- E2E tests MUST be written for API endpoints
- Repository implementations SHOULD have in-memory versions for testing
- Tests MUST maintain strict TypeScript typing

### Code Quality Standards

- All code MUST pass linting (ESLint configuration)
- All code MUST be formatted with Prettier
- Type checking MUST pass without errors
- No `any` types allowed without explicit justification
- Domain layer MUST remain framework-independent

## Governance

### Constitution Authority

This constitution supersedes all other development practices and guidelines. All architectural decisions, code reviews, and implementation approaches MUST align with these principles.

### Amendment Process

Constitution amendments require:
1. Documented rationale for the change
2. Impact analysis on existing templates and codebase
3. Version increment following semantic versioning
4. Update of all dependent templates and documentation
5. Sync Impact Report detailing changes

### Versioning Policy

Constitution follows semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR**: Backward incompatible governance/principle changes or removals
- **MINOR**: New principles/sections added or materially expanded guidance
- **PATCH**: Clarifications, wording fixes, non-semantic refinements

### Compliance

- All pull requests MUST verify compliance with constitution principles
- Violation of core principles requires explicit justification
- Template consistency MUST be maintained (plan, spec, tasks, checklists)
- README and documentation MUST reference constitution as authoritative source

### Runtime Guidance

Development teams SHOULD consult:
- [README.md](../../README.md) for project overview
- [QUICKSTART.md](../../QUICKSTART.md) for setup instructions  
- [apps/backend/README.md](../../apps/backend/README.md) for backend architecture details
- Feature specifications in `/specs/` for feature-specific guidance

**Version**: 1.0.0 | **Ratified**: 2025-11-21 | **Last Amended**: 2025-11-21