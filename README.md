# Market Data Microservice

A small backend service that pretends to be a live stock market feed. It streams fake price updates for a few tickers in real time, and also lets you look up price history via a regular HTTP endpoint.

---

## What it does

- **GET /tickers** — returns the list of supported tickers
- **GET /history/:ticker** — returns 20 simulated historical price points for a given ticker
- **WebSocket /prices/live** — streams live price updates every second for all tickers

Supported tickers: `AAPL`, `TSLA`, `BTC-USD`, `XAGUSD`, `XAUUSD`, `ETHUSD`, `USDTUSD`, `USOIL`, `SPX`

---

## Install

```bash
cd real-time-dashboard-api
npm install
```

---

## How to run the tests

```bash
cd real-time-dashboard-api
npm test
```

To run tests in watch mode (re-runs on file changes):

```bash
npm run test:watch
```

---

## How to start the server

For development (auto-restarts on file changes):

```bash
npm run dev
```

For production (runs compiled JS):

```bash
npm run build
npm start
```

---

## Assumptions & trade-offs

- **All data is fake.** Prices start at fixed values and fluctuate randomly each second. Nothing is pulled from a real market API.
- **No database.** Everything lives in memory and resets on restart.
- **Single process.** The market feed is a singleton — all WebSocket clients share the same event emitter.
- **Validation with Zod.** The `:ticker` param is validated against the known list; invalid tickers return a 400 error.
- **No auth.** The API is wide open — this is a dev/demo service, not production-ready.

---

## Bonus features implemented

- Zod schema validation for route parameters
- Jest unit tests for the core market service logic
- In-memory caching for historical data (last 5 minutes per ticker)
