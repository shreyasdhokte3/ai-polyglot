# PollyGlot (ai-polyglot)

A small translation app: type text in the browser, pick French, Spanish, or Japanese, and get an AI translation. The UI is a mobile-style chat with a PollyGlot header, message bubbles, and a loading overlay while the API responds.

## Stack

- **Frontend:** React 19 + Vite (dev proxy to the API)
- **Backend:** Express (`server/`) + OpenAI Chat Completions
- **Fonts:** Big Shoulders Display (header), Poppins (content)

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- An [OpenAI API key](https://platform.openai.com/)

## Setup

### 1. Frontend dependencies

From the project root:

```bash
npm install
```

### 2. API server dependencies

```bash
cd server
npm install
```

### 3. Environment variables

Create `server/.env` (never commit this file). Example:

```env
AI_KEY=your_openai_api_key_here
AI_URL=https://api.openai.com/v1
AI_MODEL=gpt-5-nano
```

Use the model name that works for your OpenAI account.

## Development

Run **two** terminals:

| Terminal | Directory | Command |
|----------|-----------|---------|
| API | `server/` | `node server.js` |
| UI | project root | `npm run dev` |

Open [http://localhost:5173](http://localhost:5173). Vite proxies `/api/*` to `http://localhost:3000`.

If you see a Vite `ECONNREFUSED` proxy error, the Express server is not running or not on port 3000.

## Scripts (frontend)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project layout

```text
ai-polyglot/
├── src/              React app (Header, Content, styles)
├── server/
│   ├── server.js     POST /api/translate
│   ├── .env          secrets (gitignored)
│   └── package.json
├── vite.config.js    /api → localhost:3000
└── package.json
```

## Security

- Keep `AI_KEY` only in `server/.env` on the server. The React app never sees the key.
- `.gitignore` excludes `.env`, `node_modules`, and `dist`.
