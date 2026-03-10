# Market Data Service (draft)

Purpose: consume trade events from Kafka, aggregate OHLCV candles, and expose a simple REST API for klines. Runs independently of the matching engine so the hot path stays clean.

## Env vars
- `MARKET_DATA_KAFKA_BROKERS` (default `localhost:9092`)
- `MARKET_DATA_KAFKA_TOPIC` (default `trades`)
- `MARKET_DATA_ORDERBOOK_TOPIC` (default `orderbook-deltas`)
- `MARKET_DATA_GROUP_ID` (default `market-data`)
- `MARKET_DATA_INTERVALS` (default `1m,5m,1h`) – comma-separated list of intervals to maintain
- `MARKET_DATA_PORT` (default `3100`)
- `MARKET_DATA_DB_URL` (optional) – Postgres URL; when set, trades are persisted to `trades` table
- `MARKET_DATA_ENGINE_URL` (default `http://localhost:3000`) – engine REST base URL used for depth snapshot resync

## Trade message format
Expects JSON-encoded `common::TradeEvent` on the Kafka topic:
```json
{
  "trade_id": "3f5b8b86-4b67-4b1f-a1cc-3f3bafc6c2b3",
  "trade_seq": 101,
  "pair_id": "ETH-USDC",
  "price": 100000,
  "size": 2,
  "taker_id": 1,
  "maker_id": 2,
  "taker_is_bid": true,
  "timestamp_ms": 1700000000000
}
```

## Order book delta format
Expects JSON-encoded `common::DepthUpdate` on the orderbook topic:
```json
{
  "pair_id": "ETH-USDC",
  "event_time_ms": 1700000000000,
  "first_update_id": 42,
  "final_update_id": 42,
  "bids": [[99000,10]],
  "asks": [[100000,4]],
  "price_scale": 0,
  "size_scale": 0
}
```

## API
- `GET /health` → `"ok"`
- `GET /klines/:pair_id?interval=1m&limit=100`
  - `interval`: one of `Xs`, `Xm`, `Xh`, `Xd`
  - `limit`: up to 1000 (default 100)
  - Response:
    ```json
    {
      "pair_id": "ETH-USDC",
      "interval": "1m",
      "candles": [
        {
          "start_ms": 1700000000000,
          "open": 100000,
          "high": 101000,
          "low": 99000,
          "close": 100500,
          "volume_base": 123,
          "volume_quote": 12345678,
          "trades": 7
        }
      ]
    }
```

## WebSocket
- `GET /ws` supports `depth`, `trade`, `depth_diff`, `bookTicker`, and `kline` channels. See `WEBSOCKET.md` for payloads.

## Running locally
```bash
# ensure Kafka is running (e.g., make kafka)
cd market-data
cargo run
# visit http://localhost:3100/health
```

## Notes / Next steps
- Trades are persisted to Postgres when `MARKET_DATA_DB_URL` is set; candles remain in-memory (add DB for OHLCV as a next step).
- Depth snapshots are kept in-memory and rebuilt from `orderbook-deltas` + engine snapshot resync.
