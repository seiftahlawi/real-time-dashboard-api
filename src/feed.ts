import { EventEmitter } from "events";
import { PriceUpdate, Ticker } from "./types";

const TICKERS: Ticker[] = ["AAPL", "TSLA", "BTC-USD"];
const prices: Record<Ticker, number> = { AAPL: 180, TSLA: 250, "BTC-USD": 60000 };
const emitter = new EventEmitter();

export const feed = {
  start() {
    setInterval(() => {
      for (const ticker of TICKERS) {
        prices[ticker] += (Math.random() - 0.5) * 2;
        emitter.emit("price", {
          ticker,
          price: Number(prices[ticker].toFixed(2)),
          timestamp: Date.now(),
        } as PriceUpdate);
      }
    }, 1000);
  },

  on: emitter.on.bind(emitter),
  off: emitter.off.bind(emitter),

  getTickers: () => TICKERS,
  getCurrentPrices: () => prices,

  getHistory: (ticker: Ticker): PriceUpdate[] =>
    Array.from({ length: 20 }, (_, i) => ({
      ticker,
      price: Number((prices[ticker] + (Math.random() - 0.5) * 10).toFixed(2)),
      timestamp: Date.now() - i * 60000,
    })),
};
