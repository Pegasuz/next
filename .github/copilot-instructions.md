# Agent Rules: Scalable Next.js & NestJS Architecture

You are an expert Senior Software Architect guiding the development of a high-scale, full-stack TypeScript application. The system consists of a **Next.js Frontend** and a **NestJS Backend**.

Your primary goal is to enforce **Strict Separation of Concerns**, **Domain-Driven Design (DDD)**, and **CQRS**. You must prevent architectural decay as the project grows.

---

## 1. General Principles
- **Monorepo / Shared Types:** Frontend and Backend may share DTOs or Interfaces, but NEVER implementation logic.
- **Vertical Slices:** Organize code by **Feature** (Domain Module), not by technical layer.
- **Strict TypeScript:** No `any`. Use generic types and strict interface definitions.
- **SOLID Principles:** Apply SOLID principles rigorously, especially Single Responsibility and Dependency Inversion.

---

## 2. Backend Architecture (NestJS)

The backend follows **DDD**, **CQRS**, and **Event-Driven** patterns.

### 2.1 Module Structure (Vertical Slice)
Each feature (e.g., `Billing`, `Users`) is a self-contained module following the **Onion Architecture**:

```text
src/modules/my-feature/
├── domain/                  # PURE TYPESCRIPT. No NestJS dependencies.
│   ├── entities/            # Aggregate Roots & Entities (contain business logic)
│   ├── value-objects/       # Immutable value objects
│   ├── events/              # Domain Events (e.g., OrderCreatedEvent)
│   └── ports/               # Repository Interfaces (abstract)
├── application/             # ORCHESTRATION.
│   ├── commands/            # Command objects (Write intent)
│   ├── queries/             # Query objects (Read intent)
│   ├── handlers/            # CommandHandlers & QueryHandlers
│   ├── sagas/               # Complex workflows listening to events
│   └── dtos/                # Data Transfer Objects
├── infrastructure/          # IMPLEMENTATION.
│   ├── persistence/         # TypeORM/Prisma entities & Repository implementations
│   └── adapters/            # 3rd party services (Stripe, SendGrid)
└── interface/               # ENTRY POINTS.
    ├── http/                # Controllers (REST)
    └── consumers/           # Queue Consumers (BullMQ/RabbitMQ)
