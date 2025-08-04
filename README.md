# Ezra Tasker - A Task/Todo App (Fullstack monorepo)

Ezra Tasker is a fullstack task management app built with:

- **.NET Core 9** (C#) for the backend API
- **React + Vite** for the frontend UI
- **Tailwind CSS v3** and **shadcn/ui** for styling
- **Entity Framework Core InMemory** for temporary backend persistence
- **Prettier** for code formatting

## Monorepo Structure

ezra-tasker/

- backend/ # .NET Core Web API project
- frontend/ # React app (Vite, Tailwind, shadcn)

## Prerequisites

- [.NET SDK 9](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- [Node.js (LTS)](https://nodejs.org/)
- [VS Code](https://code.visualstudio.com/) recommended
- (Optional) [Postman](https://www.postman.com/) or `curl` for testing the API

## Backend Setup (.NET Core)

1. Navigate to the backend directory:

```bash
cd backend
dotnet restore
dotnet run
```

You can optionally use `dotnet watch run` to enable hot-reloading

API will be available at:
http://localhost:5289/tasks

### API Endpoints

- GET /tasks – fetch all tasks
- POST /tasks – create a task
- PATCH /tasks/{id} – update a task (e.g. isCompleted, title)

**NOTE:** In-memory DB resets on restart.

## Frontend Setup (React + Vite)

1. Navigate to the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Frontend will be served at:
http://localhost:5173

## Styling + Tooling

- Tailwind CSS v3 (downgraded from v4 for shadcn/ui support)
- shadcn/ui for accessible components
- Prettier runs on save (ensure VS Code extension is installed)

## Features

- Add tasks with title, description, and isCompleted status
- View all tasks (most recent first)
- Update task fields
- Data resets on restart (as this is for testing only)

## Future Ideas

- Add persistent database (SQLite, PostgreSQL)
- Add login/auth
- Add delete functionality
- Add filtering (open/completed), search, and pagination
