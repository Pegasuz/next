# Next.js + NestJS Monorepo

A scalable, production-ready full-stack TypeScript monorepo featuring **Next.js 14** frontend and **NestJS** backend with **Domain-Driven Design (DDD)**, **CQRS**, and **Event-Driven Architecture**.

## 🏗️ Architecture Overview

This monorepo follows strict architectural principles to ensure scalability, maintainability, and separation of concerns:

- **Frontend**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Backend**: NestJS with DDD, CQRS, and Event-Driven patterns
- **Shared Types**: Common DTOs and interfaces shared between frontend and backend
- **Vertical Slices**: Features organized by domain, not technical layers
- **Strict TypeScript**: No `any` types allowed

## 📁 Project Structure

```
├── apps/
│   ├── frontend/          # Next.js 14 application
│   │   ├── src/
│   │   │   ├── app/       # Next.js App Router
│   │   │   ├── components/
│   │   │   │   ├── ui/    # Reusable UI components
│   │   │   │   └── features/  # Feature-specific components
│   │   │   └── lib/
│   │   │       ├── api/   # API client
│   │   │       ├── hooks/ # Custom hooks
│   │   │       └── utils/ # Utilities
│   │   └── public/
│   │
│   └── backend/           # NestJS application
│       └── src/
│           ├── modules/   # Feature modules (DDD vertical slices)
│           │   └── example-feature/
│           │       ├── domain/         # Pure TypeScript (no framework)
│           │       │   ├── entities/   # Business logic
│           │       │   ├── value-objects/
│           │       │   ├── events/     # Domain events
│           │       │   └── ports/      # Repository interfaces
│           │       ├── application/    # Orchestration
│           │       │   ├── commands/   # Write operations
│           │       │   ├── queries/    # Read operations
│           │       │   ├── handlers/   # CQRS handlers
│           │       │   ├── sagas/      # Workflows
│           │       │   └── dtos/       # Data transfer objects
│           │       ├── infrastructure/ # Implementation
│           │       │   ├── persistence/
│           │       │   └── adapters/
│           │       └── interface/      # Entry points
│           │           ├── http/       # REST controllers
│           │           └── consumers/  # Queue consumers
│           ├── core/      # Shared core functionality
│           └── common/    # Common utilities
│
└── packages/
    └── shared-types/      # Shared TypeScript types
        └── src/
            ├── dtos/      # Data Transfer Objects
            ├── interfaces/
            └── enums/
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker and Docker Compose (for PostgreSQL database)

### Installation

1. **Clone the repository**

2. **Start the database**

```bash
docker-compose up -d
```

This starts PostgreSQL and pgAdmin. See [DOCKER.md](DOCKER.md) for details.

3. **Install dependencies**

Install dependencies for all workspaces:

```bash
npm install
```

### Development

Run both frontend and backend in development mode:

```bash
npm run dev
```

Or run them separately:

```bash
# Frontend only (http://localhost:3000)
cd apps/frontend && npm run dev

# Backend only (http://localhost:3001/api)
cd apps/backend && npm run dev
```

### Build

Build all workspaces:

```bash
npm run build
```

### Testing

Run tests for all workspaces:

```bash
npm run test
```

### Linting

Lint all workspaces:

```bash
npm run lint
```

Format code:

```bash
npm run format
```

## 🐳 Database

The project uses PostgreSQL as the primary database, configured via Docker Compose.

### Quick Start

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View logs
docker-compose logs -f postgres
```

### Access Database

- **PostgreSQL**: `localhost:5432`
  - Username: `postgres`
  - Password: `postgres`
  - Database: `app_db`

- **pgAdmin UI**: http://localhost:5050
  - Email: `admin@admin.com`
  - Password: `admin`

For detailed database setup and management, see [DOCKER.md](DOCKER.md).

## 🏛️ Architectural Principles

> **Project Constitution**: All architectural principles are formally defined in [`.specify/memory/constitution.md`](.specify/memory/constitution.md). This constitution is the authoritative source for all architecture decisions and must be followed for all new code.

### 1. Domain-Driven Design (DDD)

The backend follows DDD principles with clear bounded contexts:

- **Domain Layer**: Pure TypeScript business logic (no framework dependencies)
- **Application Layer**: Use cases and orchestration (CQRS handlers)
- **Infrastructure Layer**: Technical implementations (database, external APIs)
- **Interface Layer**: Entry points (HTTP controllers, message consumers)

### 2. CQRS (Command Query Responsibility Segregation)

- **Commands**: Write operations that change state
- **Queries**: Read operations that return data
- **Handlers**: Execute commands and queries
- **Events**: Domain events for async communication

### 3. Separation of Concerns

- **Frontend**: No business logic, only presentation and user interaction
- **Backend**: All business logic resides in domain entities
- **Shared Types**: Only DTOs and interfaces, never implementation

### 4. Dependency Rule

Dependencies point inward:
- Domain layer has NO external dependencies
- Application layer depends on Domain
- Infrastructure depends on Application and Domain
- Interface depends on Application

## 🔧 Adding New Features

### Backend (NestJS)

1. Create a new module in `apps/backend/src/modules/[feature-name]/`
2. Follow the DDD structure:
   - Domain layer: entities, value objects, events, ports
   - Application layer: commands, queries, handlers, DTOs
   - Infrastructure layer: repository implementations, adapters
   - Interface layer: controllers, consumers
3. Register the module in `app.module.ts`

### Frontend (Next.js)

1. Create new pages in `apps/frontend/src/app/`
2. Create reusable components in `apps/frontend/src/components/`
3. Add API services in `apps/frontend/src/lib/api/`
4. Use shared types from `@monorepo/shared-types`

## 📦 Workspace Management

This monorepo uses npm workspaces:

```json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

## 🔐 Environment Variables

### Backend (apps/backend/.env)
```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=app_db
DATABASE_SYNCHRONIZE=true
DATABASE_LOGGING=true
```

### Frontend (apps/frontend/.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Copy the example files to get started:
```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.local.example apps/frontend/.env.local
```

## 📚 Documentation

- [**Project Constitution**](.specify/memory/constitution.md) - **Authoritative architectural principles**
- [Backend README](apps/backend/README.md) - Detailed backend architecture
- [Frontend README](apps/frontend/README.md) - Frontend structure and patterns
- [Architecture Guidelines](.github/copilot-instructions.md) - Coding standards

## 🤝 Contributing

1. **Read the [Project Constitution](.specify/memory/constitution.md)** - All contributions must comply
2. Follow the established architectural patterns (DDD, CQRS, vertical slices)
3. Maintain strict TypeScript typing (no `any`)
4. Keep domain layer pure (no framework dependencies)
5. Write tests for new features
6. Run linters before committing
7. Ensure all constitution principles are followed

## 📝 License

This project is private and proprietary.