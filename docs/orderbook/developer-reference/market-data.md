---
title: Market Data API
description: Public production market-data REST and WebSocket schemas.
sidebar_position: 6
---

Base URL: `https://market.liquideuclid.com`

Use this page in order: pick REST or WebSocket from the indexes below, then go to the endpoint or channel section for the exact payload shape.

## REST Endpoints

| Endpoint | Use it for | Response shape |
| --- | --- | --- |
| `GET /health` | check market-data availability | `"ok"` |
| `GET /klines/:pair_id` | fetch OHLCV candles | `{ pair_id, interval, candles[] }` |

### Health
**Endpoint**: `GET /health`

**Request**
- no request body

**Response example**
```json
"ok"
```

### Klines
**Endpoint**: `GET /klines/:pair_id`

**Path params**
- `pair_id`: market pair id, for example `ETH-USDC`

**Query params**
- `interval`: candle interval such as `1m`, `5m`, `1h`, `1d`
- `limit` (optional, default `100`, max `1000`)

**Response example**
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

## WebSocket Channels

**Endpoint**: `wss://market.liquideuclid.com/ws`

**Connection**
- WebSocket handshake only
- no HTTP request body

| Channel | Use it for | Payload shape |
| --- | --- | --- |
| `depth` | full order book snapshot | `{ pair_id, lastUpdateId, bids, asks }` |
| `depth_diff` | incremental order book updates | `{ pair_id, event_time_ms, first_update_id, final_update_id, bids, asks, price_scale, size_scale }` |
| `trade` | live trades | `{ trade_id, trade_seq, pair_id, price, size, taker_id, maker_id, taker_is_bid, timestamp_ms }` |
| `kline` | streaming candle updates | `{ pair_id, interval, candle }` |
| `bookTicker` | best bid and ask only | `{ pair_id, best_bid_price, best_bid_size, best_ask_price, best_ask_size, event_time_ms }` |

### Depth Snapshot
**Channel**: `depth`

**Payload example**
```json
{
  "pair_id": "ETH-USDC",
  "lastUpdateId": 42,
  "bids": [[99000, 10], [98000, 5]],
  "asks": [[100000, 4], [101000, 3]]
}
```

### Depth Diff
**Channel**: `depth_diff`

**Payload example**
```json
{
  "pair_id": "ETH-USDC",
  "event_time_ms": 1700000000000,
  "first_update_id": 42,
  "final_update_id": 42,
  "bids": [[99000, 10]],
  "asks": [[100000, 4]],
  "price_scale": 0,
  "size_scale": 0
}
```

### Trade
**Channel**: `trade`

**Payload example**
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

### Kline
**Channel**: `kline`

**Payload example**
```json
{
  "pair_id": "ETH-USDC",
  "interval": "1m",
  "candle": {
    "start_ms": 1700000000000,
    "open": 100000,
    "high": 101000,
    "low": 99000,
    "close": 100500,
    "volume_base": 123,
    "volume_quote": 12345678,
    "trades": 7
  }
}
```

### Book Ticker
**Channel**: `bookTicker`

**Payload example**
```json
{
  "pair_id": "ETH-USDC",
  "best_bid_price": 99000,
  "best_bid_size": 10,
  "best_ask_price": 100000,
  "best_ask_size": 4,
  "event_time_ms": 1700000000000
}
```
