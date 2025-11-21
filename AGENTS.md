# Repository Guidelines

## Project Structure & Module Organization
- Monorepo managed with npm workspaces (`apps/*`, `packages/*`).
- `apps/frontend/`: Next.js 14 (App Router). Key folders: `src/app` (routes), `src/components/ui` and `src/components/features`, `src/lib` (api/hooks/utils), `public/`.
- `apps/backend/`: NestJS with DDD + CQRS vertical slices under `src/modules/[feature]/{domain,application,infrastructure,interface}`; shared helpers in `src/core` and `src/common`.
- `packages/shared-types/`: DTOs and interfaces consumed by both apps.

## Build, Test, and Development Commands
- Install deps: `npm install`. Database: `docker-compose up -d` (PostgreSQL + pgAdmin).
- Run both apps in watch mode: `npm run dev`. Per app: `cd apps/frontend && npm run dev` or `cd apps/backend && npm run dev`.
- Build all workspaces: `npm run build`. Shared types build: `cd packages/shared-types && npm run build`.
- Quality: `npm run lint` and `npm run format` from repo root. Frontend type safety: `cd apps/frontend && npm run type-check`.
- Tests: `npm run test` (workspace-aware). Backend extras: `npm run test:e2e`, `npm run test:cov`.

## Coding Style & Naming Conventions
- TypeScript is strict (`tsconfig.base.json`); avoid `any` and keep domain layer framework-free.
- Format with Prettier (`npm run format`); lint fixes via `npm run lint`. Default Prettier spacing (2 spaces) and import order should be kept.
- Follow DDD boundaries: domain depends on nothing, application on domain, infrastructure on inner layers, interface on application.
- Frontend: favor Server Components; place reusable pieces in `components/ui`; name files kebab-case (e.g., `user-card.tsx`) and hooks `useSomething.ts`.
- Backend: name DTOs and ports explicitly (`example.dto.ts`, `example.repository.port.ts`); CQRS handlers in `application/handlers`.

## Testing Guidelines
- Backend unit/integration specs live alongside code as `*.spec.ts`; E2E configs are under `apps/backend/test/`.
- Add tests for new behaviors and keep coverage stable (`npm run test:cov`). Mock infrastructure; keep domain tests pure.
- When adding frontend logic, include lightweight component or hook tests if applicable and ensure `type-check` and `lint` stay clean.

## Commit & Pull Request Guidelines
- Use conventional-style subjects seen in history (`feat:`, `fix:`, `chore:`, `docs:`); keep scopes meaningful.
- Each PR should include a short summary, linked issue/task, and screenshots for UI-visible changes. Note DB or env var changes and update `.env.example`/docs when applicable.
- Run `npm run lint`, `npm run test`, and relevant build/test subsets before requesting review; mention any skipped checks.

## Environment & Security Notes
- Copy env examples before running services: `cp apps/backend/.env.example apps/backend/.env` and `cp apps/frontend/.env.local.example apps/frontend/.env.local`.
- Do not commit secrets; prefer Docker for local PostgreSQL (`docker-compose up -d`) and keep `DATABASE_SYNCHRONIZE` false outside local dev.
- The architectural constitution at `.specify/memory/constitution.md` is authoritative—validate new designs against it before implementation.
