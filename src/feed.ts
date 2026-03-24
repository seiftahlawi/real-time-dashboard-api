import { EventEmitter } from "events";
import { PriceUpdate, TickerInfo } from "./types";
import tickerData from "./tickers.json";

const TICKERS = tickerData.map((t) => t.ticker);

const prices: Record<string, number> = Object.fromEntries(
  tickerData.map((t) => [t.ticker, t.initialPrice])
);

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

  getTickers: (): TickerInfo[] =>
    tickerData.map((t) => ({
      ticker: t.ticker,
      label: t.label,
      logo: t.logo,
    })),

  getCurrentPrices: () => prices,

  getHistory: (ticker: string): PriceUpdate[] =>
    Array.from({ length: 20 }, (_, i) => ({
      ticker,
      price: Number((prices[ticker] + (Math.random() - 0.5) * 10).toFixed(2)),
      timestamp: Date.now() - i * 60000,
    })),
};
