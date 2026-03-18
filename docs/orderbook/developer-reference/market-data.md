---
title: Market Data API
description: Public production market-data REST and WebSocket schemas.
sidebar_position: 6
---

Base URL: `https://market.liquideuclid.com`

## Quick Navigation
- [REST Endpoints](#rest-endpoints): health and historical kline retrieval.
- [WebSocket Channels](#websocket-channels): channel list, normalized shapes, and runtime key mapping.
- [Depth Snapshot](#depth-snapshot): full book snapshot payload.
- [Depth Diff](#depth-diff): incremental book update payload and key mapping.
- [Trade](#trade): live trade event payload and key mapping.
- [Kline](#kline): streaming candle payload and key mapping.
- [Book Ticker](#book-ticker): top-of-book payload and key mapping.

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

| Channel | Use it for | Payload shape (normalized) | Runtime keys actually returned by WebSocket |
| --- | --- | --- | --- |
| `depth` | full order book snapshot | `{ pair_id, lastUpdateId, bids, asks }` | same as normalized |
| `depth_diff` | incremental order book updates | `{ event_type, event_time_ms, pair_id, first_update_id, final_update_id, bids, asks }` | `{ e, E, s, U, u, b, a }` |
| `trade` | live trades | `{ event_type, event_time_ms, pair_id, trade_seq, trade_id, price, size, trade_time_ms, is_buyer_maker }` | `{ e, E, s, t, trade_id, p, q, T, m, M }` |
| `kline` | streaming candle updates | `{ event_type, event_time_ms, pair_id, candle }` | `{ e, E, s, k }` |
| `bookTicker` | best bid and ask only | `{ update_id, pair_id, best_bid_price, best_bid_size, best_ask_price, best_ask_size }` | `{ u, s, b, B, a, A }` |

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
  "event_type": "depthUpdate",
  "pair_id": "ETH-USDC",
  "event_time_ms": 1700000000000,
  "first_update_id": 42,
  "final_update_id": 42,
  "bids": [[99000, 10]],
  "asks": [[100000, 4]]
}
```

**Normalized field to runtime key mapping**

| Normalized field | Runtime key | Description |
| --- | --- | --- |
| `event_type` | `e` | Event type label (`depthUpdate`). |
| `event_time_ms` | `E` | Event timestamp in milliseconds. |
| `pair_id` | `s` | Market pair symbol. |
| `first_update_id` | `U` | First update ID covered by this diff payload. |
| `final_update_id` | `u` | Final update ID covered by this diff payload. |
| `bids` | `b` | Bid-side level updates (`[price, size]`). |
| `asks` | `a` | Ask-side level updates (`[price, size]`). |

### Trade
**Channel**: `trade`

**Payload example**
```json
{
  "event_type": "trade",
  "event_time_ms": 1700000000000,
  "trade_time_ms": 1700000000000,
  "is_buyer_maker": true,
  "trade_id": "3f5b8b86-4b67-4b1f-a1cc-3f3bafc6c2b3",
  "trade_seq": 101,
  "pair_id": "ETH-USDC",
  "price": 100000,
  "size": 2
}
```

**Normalized field to runtime key mapping**

| Normalized field | Runtime key | Description |
| --- | --- | --- |
| `event_type` | `e` | Event type label (`trade`). |
| `event_time_ms` | `E` | Event timestamp in milliseconds. |
| `pair_id` | `s` | Market pair symbol. |
| `trade_seq` | `t` | Per-pair incremental trade sequence number. |
| `trade_id` | `trade_id` | Durable UUID trade identifier. |
| `price` | `p` | Trade price in integer base units. |
| `size` | `q` | Trade size in integer base units. |
| `trade_time_ms` | `T` | Trade execution timestamp in milliseconds. |
| `is_buyer_maker` | `m` | `true` when buyer is maker; `false` when seller is maker. |

### Kline
**Channel**: `kline`

**Payload example**
```json
{
  "event_type": "kline",
  "event_time_ms": 1700000000000,
  "pair_id": "ETH-USDC",
  "candle": {
    "start_ms": 1700000000000,
    "close_time_ms": 1700000059999,
    "interval": "1m",
    "open": 100000,
    "high": 101000,
    "low": 99000,
    "close": 100500,
    "volume_base": 123,
    "volume_quote": 12345678,
    "trade_count": 7,
    "is_closed": false
  }
}
```

**Normalized field to runtime key mapping**

| Normalized field | Runtime key | Description |
| --- | --- | --- |
| `event_type` | `e` | Event type label (`kline`). |
| `event_time_ms` | `E` | Event timestamp in milliseconds. |
| `pair_id` | `s` | Market pair symbol. |
| `candle` | `k` | Candle payload container. |
| `candle.start_ms` | `k.t` | Candle start timestamp in milliseconds. |
| `candle.close_time_ms` | `k.T` | Candle close timestamp in milliseconds. |
| `candle.interval` | `k.i` | Candle interval label (for example `1m`). |
| `candle.open` | `k.o` | Open price for the candle window. |
| `candle.close` | `k.c` | Latest/closing price for the candle window. |
| `candle.high` | `k.h` | High price for the candle window. |
| `candle.low` | `k.l` | Low price for the candle window. |
| `candle.volume_base` | `k.v` | Base-asset traded volume in window. |
| `candle.volume_quote` | `k.q` | Quote-asset traded volume in window. |
| `candle.trade_count` | `k.n` | Number of trades in the window. |
| `candle.is_closed` | `k.x` | `true` once the interval has closed. |

### Book Ticker
**Channel**: `bookTicker`

**Payload example**
```json
{
  "update_id": 42,
  "pair_id": "ETH-USDC",
  "best_bid_price": 99000,
  "best_bid_size": 10,
  "best_ask_price": 100000,
  "best_ask_size": 4
}
```

**Normalized field to runtime key mapping**

| Normalized field | Runtime key | Description |
| --- | --- | --- |
| `update_id` | `u` | Last applied book update ID. |
| `pair_id` | `s` | Market pair symbol. |
| `best_bid_price` | `b` | Current best bid price. |
| `best_bid_size` | `B` | Size at current best bid price. |
| `best_ask_price` | `a` | Current best ask price. |
| `best_ask_size` | `A` | Size at current best ask price. |
