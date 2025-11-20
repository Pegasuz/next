# Docker Setup

This directory contains Docker configuration for the development environment.

## Services

### PostgreSQL Database
- **Image**: postgres:16-alpine
- **Port**: 5432
- **Username**: postgres
- **Password**: postgres
- **Database**: app_db

### pgAdmin (Database Management UI)
- **Image**: dpage/pgadmin4
- **Port**: 5050
- **Email**: admin@admin.com
- **Password**: admin
- **URL**: http://localhost:5050

## Getting Started

### Start Services

Start all services (PostgreSQL + pgAdmin):
```bash
docker-compose up -d
```

### Stop Services

Stop all services:
```bash
docker-compose down
```

### Stop and Remove Volumes

Stop services and remove all data:
```bash
docker-compose down -v
```

### View Logs

View logs for all services:
```bash
docker-compose logs -f
```

View logs for specific service:
```bash
docker-compose logs -f postgres
```

## Database Connection

The backend connects to PostgreSQL using environment variables. The connection is configured in `apps/backend/.env`:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=app_db
```

## Database Management

### Using pgAdmin

1. Start the services: `docker-compose up -d`
2. Open pgAdmin at http://localhost:5050
3. Login with:
   - Email: `admin@admin.com`
   - Password: `admin`
4. Add a new server:
   - **General > Name**: Local Dev
   - **Connection > Host**: `postgres` (Docker service name)
   - **Connection > Port**: `5432`
   - **Connection > Username**: `postgres`
   - **Connection > Password**: `postgres`

### Using psql CLI

Connect to the database using Docker:
```bash
docker exec -it next-nestjs-postgres psql -U postgres -d app_db
```

## Database Initialization

The `init-db.sql` file is automatically executed when the PostgreSQL container starts for the first time. It creates:

- UUID extension
- Example tables with proper indexes
- Sample data (optional)

## Health Checks

PostgreSQL includes a health check that verifies the database is ready to accept connections.

Check service health:
```bash
docker-compose ps
```

## Data Persistence

Data is persisted in Docker volumes:
- `postgres_data`: PostgreSQL database files
- `pgadmin_data`: pgAdmin configuration and settings

These volumes persist even when containers are stopped.

## Troubleshooting

### Port Already in Use

If port 5432 or 5050 is already in use, you can change the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "5433:5432"  # Change 5433 to any available port
```

Then update the backend `.env` file accordingly.

### Connection Refused

If the backend cannot connect to the database:

1. Ensure Docker services are running: `docker-compose ps`
2. Check the backend environment variables
3. Verify the database is healthy: `docker-compose logs postgres`

### Reset Database

To completely reset the database:

```bash
docker-compose down -v
docker-compose up -d
```

This will recreate the database with the initialization script.
