import { EventEmitter } from "events";
import { PriceUpdate, TickerInfo } from "./types";
import tickerData from "./tickers.json";

const MAX_AGE = 5 * 60 * 1000;

const TICKERS = tickerData.map((t) => t.ticker);

const prices: Record<string, number> = Object.fromEntries(
  tickerData.map((t) => [t.ticker, t.initialPrice])
);

const history: Record<string, PriceUpdate[]> = {};

const emitter = new EventEmitter();

export const feed = {
  start() {
    setInterval(() => {
      for (const ticker of TICKERS) {
        prices[ticker] += (Math.random() - 0.5) * 2;
        const update: PriceUpdate = {
          ticker,
          price: Number(prices[ticker].toFixed(2)),
          timestamp: Date.now(),
        };
        if (!history[ticker]) history[ticker] = [];
        history[ticker].push(update);
        const cutoff = Date.now() - MAX_AGE;
        while (history[ticker].length > 0 && history[ticker][0].timestamp < cutoff) {
          history[ticker].shift();
        }
        emitter.emit("price", update);
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

  getHistory: (ticker: string): PriceUpdate[] => history[ticker] ?? [],
};
