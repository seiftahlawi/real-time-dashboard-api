import { feed } from "../feed";
import { PriceUpdate } from "../types";

afterEach(() => {
  jest.useRealTimers();
});

it("returns all tickers", () => {
  expect(feed.getTickers().map((t) => t.ticker)).toEqual(
    expect.arrayContaining(["AAPL", "TSLA", "BTC-USD", "XAGUSD", "XAUUSD", "ETHUSD", "USDTUSD", "USOIL", "SPX", "NASDAQ-NVDA"])
  );
});

it("has correct initial prices", () => {
  const prices = feed.getCurrentPrices();
  expect(prices.AAPL).toBe(180);
   expect(prices.TSLA).toBe(250);
  expect(prices["BTC-USD"]).toBe(60000);
  expect(prices.XAGUSD).toBe(69);
  expect(prices.XAUUSD).toBe(3300);
  expect(prices.ETHUSD).toBe(2000);
  expect(prices.USDTUSD).toBe(1);
  expect(prices.USOIL).toBe(75);
  expect(prices.SPX).toBe(5500);
  expect(prices["NASDAQ-NVDA"]).toBe(900);
});

it("getHistory returns 20 entries for the requested ticker", () => {
  const data = feed.getHistory("AAPL");
  expect(data).toHaveLength(20);
  expect(data.every((d) => d.ticker === "AAPL")).toBe(true);
});

it("getHistory prices are positive with ≤2 decimals", () => {
  feed.getHistory("TSLA").forEach((d) => {
    expect(d.price).toBeGreaterThan(0);
    expect((d.price.toString().split(".")[1] ?? "").length).toBeLessThanOrEqual(2);
  });
});

it("emits a price event per ticker every second", () => {
  jest.useFakeTimers();
  const updates: PriceUpdate[] = [];
  feed.on("price", (u: PriceUpdate) => updates.push(u));
  feed.start();
  jest.advanceTimersByTime(1000);
  expect(updates).toHaveLength(10);
  expect(updates.map((u) => u.ticker)).toEqual(
    expect.arrayContaining(["AAPL", "TSLA", "BTC-USD", "XAGUSD", "XAUUSD", "ETHUSD", "USDTUSD", "USOIL", "SPX"])
  );
});
