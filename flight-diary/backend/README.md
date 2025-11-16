# Flight Diary Backend

Minimal TypeScript + Express backend for storing flight diary entries.

## Quick start

Install dependencies and run from the project root:

```bash
cd flight-diary/backend
npm install

# development (auto-reload)
npm run dev

# build and run
npm run build
npm start
```

## API

- **GET** `/api/ping` — health check, responds with `{ message: 'pong' }`
- **GET** `/api/diaries` — returns all diary entries
- **GET** `/api/diaries/:id` — returns a single diary entry by id

- **POST** `/api/diaries` — create a diary entry. JSON body must include:
  - `date` (string, ISO format)
  - `weather` (one of `sunny`, `windy`, `cloudy`, `rainy`, `stormy`)
  - `visibility` (one of `great`, `good`, `ok`, `poor`)
  - `comment` (string)

On validation error the API responds with status `400` and a JSON error message.

## Examples

Create a diary entry (curl):

```bash
curl -X POST http://localhost:3003/api/diaries \
  -H "Content-Type: application/json" \
  -d '{"date":"2020-01-01","weather":"sunny","visibility":"good","comment":"Smooth flight"}'
```

Fetch all diaries:

```bash
curl http://localhost:3003/api/diaries
```

## Notes

- The server listens on port `3000` by default.
- This project uses a small in-memory/sample data store (`src/data/entries.json`).
