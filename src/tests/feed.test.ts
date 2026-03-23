import { feed } from "../feed";
import { PriceUpdate } from "../types";

afterEach(() => {
  jest.useRealTimers();
});

it("returns all 3 tickers", () => {
  expect(feed.getTickers()).toEqual(["AAPL", "TSLA", "BTC-USD"]);
});

it("has correct initial prices", () => {
  const prices = feed.getCurrentPrices();
  expect(prices.AAPL).toBe(180);
  expect(prices.TSLA).toBe(250);
  expect(prices["BTC-USD"]).toBe(60000);
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
  expect(updates).toHaveLength(3);
  expect(updates.map((u) => u.ticker)).toEqual(
    expect.arrayContaining(["AAPL", "TSLA", "BTC-USD"])
  );
});
