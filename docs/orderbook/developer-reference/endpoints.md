---
title: API Directory
description: Choose the right public Orderbook service, then open the full request and response reference.
sidebar_position: 2
---

Use this page as the map. Each service page below follows the same structure:
- endpoint index first
- request format next
- response example directly under each endpoint

## Service Directory

| Service | Base URL | Use it for | Full reference |
| --- | --- | --- | --- |
| Matching Engine REST | `https://api.liquideuclid.com` | trading, balances, withdrawals, depth, recent trades | [Matching Engine REST API](./engine-api.md) |
| OMS REST | `https://oms.liquideuclid.com` | open orders, order history, single-order lookup | [OMS API](./oms-service.md) |
| Market Data REST | `https://market.liquideuclid.com` | klines and market snapshots | [Market Data API](./market-data.md#rest-endpoints) |
| Market Data WebSocket | `wss://market.liquideuclid.com/ws` | live depth, trade, kline, and top-of-book streams | [Market Data API](./market-data.md#websocket-channels) |

## Authentication

Use [Authentication Headers](./authentication-and-api-keys.md) for authenticated engine and OMS routes.

## What Lives Where

### Matching Engine REST
Use the engine when you need to submit or cancel orders, read balances, fetch account state, or create withdrawals.

Main route groups:
- public market routes: `/health`, `/time`, `/assets`, `/pairs`, `/depth/:pair_id`, `/trades/:pair_id`
- account routes: `/account`, `/balances/:user_id`, `/balances/:user_id/:asset`, `/trades/user/:user_id`
- order routes: `/orders`, `/signed_orders`, `/orders/cancel`, `/orders/cancel_replace`, `/orders/cancel_all`
- withdrawal routes: `/withdrawals`, `/withdrawals/status`, `/withdrawals/permit`, `/withdrawals/relay`

### OMS REST
Use OMS when you need user-facing order views after execution.

Main routes:
- `/health`
- `/orders/open/:user_id`
- `/orders/history/:user_id`
- `/orders/:order_id`

### Market Data REST and WebSocket
Use market-data for charting and live market views.

Main routes:
- REST: `/health`, `/klines/:pair_id`
- WebSocket: `depth`, `depth_diff`, `trade`, `kline`, `bookTicker`
