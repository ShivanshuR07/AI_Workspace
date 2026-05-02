# AI Workspace

AI Workspace is a full-stack productivity platform that brings documents, meetings, emails, tasks, insights, and workspace activity into one AI-ready dashboard.

The project is designed as a modular workspace application where a user can organize knowledge, track action items, review meeting outputs, draft emails, and view AI-generated insights from one place.

## Features

- User and workspace management
- Document storage, chunking, and analysis records
- Meeting records with transcripts and summaries
- Email threads and email drafts
- Task creation, assignment, due dates, and status tracking
- AI insight records for documents, meetings, emails, tasks, and workspace context
- Activity timeline for workspace events
- Dashboard and settings modules
- Modular REST API under `/api`

## Tech Stack

### Frontend

- React
- Vite
- Material UI
- Radix UI
- Recharts
- React Router
- Tailwind/Vite tooling

### Backend

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite for local development
- Zod validation
- dotenv
- CORS

## Project Structure

```text
AI_Workspace/
  frontend/
    package.json
    src/
  backend/
    package.json
    prisma/
      schema.prisma
    src/
      server.ts
      app.ts
      api/
  docs/
    project-overview.md
    srs.md
    architecture.md
    database-design.md
    api-documentation.md
```

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev
npm run dev
```

Default backend URL:

```text
http://localhost:5000/api
```

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Default frontend URL:

```text
http://localhost:5173
```

## Environment Variables

Backend:

```env
DATABASE_URL="file:./dev.db"
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Frontend:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Main API Modules

| Module | Base Path | Purpose |
| --- | --- | --- |
| Health | `/api/health` | Backend status check |
| Auth | `/api/auth` | User authentication and identity |
| Documents | `/api/documents` | Document records, chunks, and analysis |
| Meetings | `/api/meetings` | Meeting records, transcripts, and summaries |
| Emails | `/api/emails` | Email threads and drafts |
| Tasks | `/api/tasks` | Task creation and status tracking |
| Insights | `/api/insights` | AI-generated insights |
| Activity | `/api/activity` | Workspace event timeline |
| AI | `/api/ai` | AI assistant and generation endpoints |
| Dashboard | `/api/dashboard` | Workspace overview data |
| Settings | `/api/settings` | User/workspace preferences |

## Documentation

Detailed project documentation is available in [`docs/`](docs/):

- [Project Overview](docs/project-overview.md)
- [Project Report](docs/project-report.md)
- [SRS](docs/srs.md)
- [Architecture](docs/architecture.md)
- [ER Diagram](docs/er-diagram.md)
- [Data Flow Diagram](docs/data-flow-diagram.md)
- [Use Cases](docs/use-cases.md)
- [User Flow](docs/user-flow.md)
- [Database Design](docs/database-design.md)
- [API Documentation](docs/api-documentation.md)
- [Error Handling](docs/error-handling.md)
- [Test Plan](docs/test-plan.md)
- [Security](docs/security.md)
- [Deployment](docs/deployment.md)
- [Limitations](docs/limitations.md)
- [Future Scope](docs/future-scope.md)

## Development Scripts

Backend:

```bash
npm run dev
npm run build
npm start
npm run db:generate
npm run db:migrate
```

Frontend:

```bash
npm run dev
npm run build
```

## Recommended Production Notes

- Use PostgreSQL instead of SQLite for production.
- Restrict CORS origins instead of allowing all origins.
- Store secrets only in environment variables.
- Add automated API tests before production deployment.
- Use cloud storage for uploaded files if real file upload support is enabled.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
