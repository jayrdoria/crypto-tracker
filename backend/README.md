# Crypto Tracker — Backend API

Express + TypeScript API server that proxies cryptocurrency data from CoinGecko.

## Quick Start

```bash
# Install dependencies
npm install

# Copy env and add your CoinGecko API key
cp .env.example .env

# Start dev server (hot reload)
npm run dev

# Build for production
npm run build && npm start
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `7070` |
| `COINGECKO_API_KEY` | CoinGecko API key (required) | — |
| `COINGECKO_BASE_URL` | CoinGecko API base URL | `https://api.coingecko.com/api/v3` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:5173` |
| `NODE_ENV` | Environment mode | `development` |

## API Endpoints

### `GET /api/health`

Health check.

**Response:**

```json
{ "status": "ok", "timestamp": "2026-02-13T10:59:22.711Z" }
```

### `GET /api/prices`

Fetch cryptocurrency market data.

**Query Parameters:**

| Param | Type | Default | Description |
|---|---|---|---|
| `vs_currency` | string | `usd` | Target currency (`usd`, `eur`, `gbp`, `jpy`, `aud`, `cad`, `chf`, `cny`, `inr`, `php`) |
| `per_page` | number | `20` | Results per page (1–100) |
| `page` | number | `1` | Page number |

**Example:**

```
GET /api/prices?vs_currency=eur&per_page=5&page=1
```

**Response:**

```json
[
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
    "current_price": 62500,
    "market_cap": 1230000000000,
    "market_cap_rank": 1,
    "price_change_percentage_24h": -1.35,
    "total_volume": 48000000000
  }
]
```

### Error Responses

| Status | Meaning |
|---|---|
| `400` | Invalid query parameters (e.g., unsupported currency) |
| `404` | Unknown route |
| `429` | Rate limited (100 req / 15 min per IP) |
| `500` | Internal server error |
| `502` | Upstream CoinGecko API failure |

```json
{ "error": "Invalid currency: xyz. Allowed: usd, eur, gbp, jpy, aud, cad, chf, cny, inr, php" }
```

## Security

- **Helmet** — secure HTTP headers (CSP, HSTS, X-Frame-Options, etc.)
- **Rate limiting** — 100 requests per 15 min per IP
- **CORS** — restricted to configured frontend origin, GET only
- **Input validation** — currency whitelist, pagination clamping
- **Error sanitization** — internal details never exposed to clients
- **Payload limit** — 1KB max request body

## Project Structure

```
backend/
├── src/
│   ├── config/index.ts           # App configuration
│   ├── controllers/cryptoController.ts  # Route handlers
│   ├── middleware/errorHandler.ts # Global error handler
│   ├── routes/cryptoRoutes.ts    # Route definitions
│   ├── services/coingeckoService.ts # CoinGecko API client
│   └── server.ts                 # Express entry point
├── .env.example
├── tsconfig.json
└── package.json
```
