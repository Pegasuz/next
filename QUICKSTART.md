# Quick Start Guide

Get up and running with the Next.js + NestJS monorepo in 5 minutes.

## 1. Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) >= 18.0.0
- [npm](https://www.npmjs.com/) >= 9.0.0
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for database)

## 2. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd next

# Install dependencies
npm install
```

## 3. Start the Database

```bash
# Start PostgreSQL and pgAdmin
docker-compose up -d

# Verify services are running
docker-compose ps
```

You should see:
- `next-nestjs-postgres` - Running on port 5432
- `next-nestjs-pgadmin` - Running on port 5050

## 4. Configure Environment

```bash
# Backend environment
cp apps/backend/.env.example apps/backend/.env

# Frontend environment
cp apps/frontend/.env.local.example apps/frontend/.env.local
```

The default configuration should work out of the box.

## 5. Start Development Servers

### Option A: Start Both Services

```bash
npm run dev
```

This starts both frontend and backend concurrently.

### Option B: Start Separately

Terminal 1 - Backend:
```bash
cd apps/backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd apps/frontend
npm run dev
```

## 6. Access the Applications

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **pgAdmin**: http://localhost:5050 (admin@admin.com / admin)

## 7. Test the API

Create an example:
```bash
curl -X POST http://localhost:3001/api/examples \
  -H "Content-Type: application/json" \
  -d '{"name": "My First Example"}'
```

Get the example (use the ID from the response):
```bash
curl http://localhost:3001/api/examples/<id>
```

## 8. Project Structure

```
├── apps/
│   ├── backend/          # NestJS backend
│   └── frontend/         # Next.js frontend
├── packages/
│   └── shared-types/     # Shared TypeScript types
├── docker-compose.yml    # Database configuration
└── README.md            # Full documentation
```

## Common Commands

```bash
# Development
npm run dev              # Start all services
npm run build            # Build all workspaces
npm run lint             # Lint all code
npm run format           # Format code with Prettier

# Database
docker-compose up -d     # Start database
docker-compose down      # Stop database
docker-compose logs -f   # View logs

# Backend specific
cd apps/backend
npm run dev              # Development mode
npm run build            # Build
npm run test             # Run tests

# Frontend specific
cd apps/frontend
npm run dev              # Development mode
npm run build            # Build
npm run lint             # Lint
```

## Next Steps

1. **Read the Documentation**:
   - [**Project Constitution**](.specify/memory/constitution.md) - **Required reading: Architectural principles**
   - [Main README](README.md) - Architecture overview
   - [Backend README](apps/backend/README.md) - DDD & CQRS patterns
   - [Frontend README](apps/frontend/README.md) - Next.js structure
   - [Docker Documentation](DOCKER.md) - Database management

2. **Explore the Example Module**:
   - Located in `apps/backend/src/modules/example-feature/`
   - Demonstrates complete DDD structure
   - Shows CQRS pattern implementation

3. **Create Your First Feature**:
   - Copy the example module structure
   - Implement your domain logic
   - Add API endpoints
   - Connect frontend to backend

## Troubleshooting

### Port Already in Use

If ports 3000, 3001, 5432, or 5050 are in use:

1. Stop conflicting services
2. Or modify ports in configuration files

### Database Connection Failed

1. Ensure Docker is running: `docker-compose ps`
2. Check database logs: `docker-compose logs postgres`
3. Verify environment variables in `apps/backend/.env`

### Build Errors

1. Clean install: `rm -rf node_modules package-lock.json && npm install`
2. Clear build artifacts: `npm run clean` (if available)
3. Rebuild: `npm run build`

## Getting Help

- Check the [main README](README.md) for detailed documentation
- Review the [architectural guidelines](.github/copilot-instructions.md)
- Examine the example module for reference implementation

## Development Workflow

1. Start the database: `docker-compose up -d`
2. Start development servers: `npm run dev`
3. Make changes to your code
4. Changes are automatically reloaded
5. Test your changes
6. Commit and push

Happy coding! 🚀
