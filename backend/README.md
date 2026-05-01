# Backend

Node.js + TypeScript API scaffold for the AI workspace.

## Setup

```powershell
cd backend
npm install
copy .env.example .env
npm run db:generate
npm run db:migrate
npm run dev
```

Health endpoint:

```text
GET http://localhost:4000/api/health
```
