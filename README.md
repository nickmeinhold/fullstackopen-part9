# Full Stack Open - Part 9 Projects

This workspace contains multiple projects used for exercises in the Full Stack Open course (part 9). Each project has a separate folder and can be run independently.

Projects in this workspace

- `patientor-backend` - Patientor backend API (Express, TypeScript). Port: 3001
- `patientor-frontend` - Patientor frontend (React, Vite, TypeScript, Material UI). Vite default port: 5173
- `flight-diary-backend` - Flight diary backend (Express, TypeScript). Port: 3000
- `flight-diary-frontend` - Flight diary frontend (React, Vite, TypeScript). Vite default port: 5173
- `typed-notes` - Frontend exercise using a JSON server for api (Vite + json-server)
- `projects` - Course exercises (various projects)

---

## Quick setup (applies to each project)

From the repo root you can change to each project folder and run the following commands:

Install dependencies:

```bash
cd <project-folder>
npm install
```

Start the dev server (depending on project):

-- Backend (TypeScript/Node server):

```bash
npm run dev
```

This typically runs using `ts-node-dev` and starts the server on the configured port (see project-specific instructions below).

-- Frontend (Vite):

```bash
npm run dev
```

This uses Vite and runs a dev server (default host and port appear on the console, usually `http://localhost:5173`).

Build (production):

```bash
npm run build
```

Run production build:

```bash
npm run start
```

Lint (if configured):

```bash
npm run lint
```

---

## Project-specific instructions

### patientor-backend

- Folder: `patientor-backend`
- Port: 3001
- Scripts:
  - `npm run dev` – start dev server (ts-node-dev) (watch / reload)
  - `npm run build` – compile TypeScript (tsc)
  - `npm run start` – run compiled build
  - `npm run lint` – lint TypeScript files

Start the back-end in dev mode:

```bash
cd patientor-backend
npm install
npm run dev
# endpoint: http://localhost:3001/api
```

### patientor-frontend

- Folder: `patientor-frontend`
- Uses Vite for dev server; default port for Vite is 5173 (see console when you run `npm run dev`).

Start the frontend in dev mode:

```bash
cd patientor-frontend
npm install
npm run dev
# open http://localhost:5173 in your browser (or check url from Vite output)
```

To run the app together, first start the backend (`patientor-backend`) on `:3001`, then start the frontend (`patientor-frontend`) on `:5173`.

### flight-diary-backend

- Folder: `flight-diary-backend`
- Port: 3000
- Scripts:
  - `npm run dev` – start dev server (ts-node-dev)
  - `npm run start` – run production build (compiled)

Start the backend in dev mode:

```bash
cd flight-diary-backend
npm install
npm run dev
```

The API endpoint is usually available at `http://localhost:3000/api/diaries`.

### flight-diary-frontend

- Folder: `flight-diary-frontend`
- Uses Vite dev server

Start the frontend in dev mode:

```bash
cd flight-diary-frontend
npm install
npm run dev
```

Check the Vite output for the URL (usually `http://localhost:5173`).

### typed-notes

- Folder: `typed-notes`
- Runs a JSON server for fake API data as well as the front end

Start JSON server and frontend dev server in separate shells:

```bash
cd typed-notes
npm install
npm run server  # starts json-server on port 3001
npm run dev     # starts the frontend dev server
```

Open the frontend (usually `http://localhost:5173`) and the JSON server (`http://localhost:3001`).

---

## Tips

- You can run many of the frontends and backends at the same time if they use different ports. If a port is already in use, change the dev server port by adding configuration or environment variables (Vite apps can use `--port` or `vite.config.ts` to set it).

- If you change the backend port, update the frontend API base URL(s) accordingly.

- For debugging and linting:

  - Run `npm run lint` in a project to check lint issues.
  - Run `npm run build` to ensure the TypeScript compiles.

- If you want to serve both backend and frontend together, start backend(s) first, then frontends.
