---
title: Matching Engine REST API
description: Public production engine endpoints with request and response schemas.
sidebar_position: 4
---

Base URL: `https://api.liquideuclid.com`

Authenticated endpoints require headers from [Authentication Headers](./authentication-and-api-keys.md).

Use this page in order: find the route in the index, then jump to the matching section for request params, request body, and response example.

## Endpoint Index

### Public Market Endpoints

| Endpoint | Use it for | Response shape |
| --- | --- | --- |
| `GET /health` | check engine availability | `"ok"` |
| `GET /time` | read engine server time | `{ serverTime }` |
| `GET /assets` | list assets or fetch one asset | `{ message, assets[] }` |
| `GET /pairs` | list tradable pairs | `{ pairs[] }` |
| `GET /depth/:pair_id` | read order book depth | `{ pair_id, lastUpdateId, bids, asks }` |
| `GET /trades/:pair_id` | read recent public trades | `{ trades[] }` |

### Account and Balance Endpoints

| Endpoint | Use it for | Response shape |
| --- | --- | --- |
| `GET /account` | read account permissions and balances | account object |
| `GET /balances/:user_id` | read all balances for one user | `{ message, data }` |
| `GET /balances/:user_id/:asset` | read one asset balance | `{ message, data }` |
| `GET /trades/user/:user_id` | read user trades | `{ user_id, trades[] }` |

### Order Endpoints

| Endpoint | Use it for | Response shape |
| --- | --- | --- |
| `POST /orders` | place an authenticated order | `{ message, order_id, fills, trades }` |
| `POST /signed_orders` | place a signed order | same as `/orders` |
| `POST /orders/cancel` | cancel one order | `{ message }` |
| `POST /orders/cancel_replace` | atomically cancel and submit a new order | `{ message, cancel_result, new_order_result, ... }` |
| `POST /orders/cancel_all` | cancel all open orders on one pair | `{ message, pair_id, cancelled, results }` |

### Withdrawal Endpoints

| Endpoint | Use it for | Response shape |
| --- | --- | --- |
| `POST /withdrawals` | create a withdrawal request | `{ message, data }` |
| `POST /withdrawals/status` | check one withdrawal | `{ message, data }` |
| `POST /withdrawals/permit` | get permit and proof for withdrawal execution | `{ message, data }` |
| `POST /withdrawals/relay` | relay withdrawal on-chain | `{ message, data }` |

## Public Market Endpoints

### Health
**Endpoint**: `GET /health`

**Request**
- no request body

**Response example**
```json
"ok"
```

### Server Time
**Endpoint**: `GET /time`

**Request**
- no request body

**Response example**
```json
{
  "serverTime": 1700000000000
}
```

### Assets
**Endpoint**: `GET /assets`

**Query params**
- `asset` (optional): filter by asset symbol

**Response example**
```json
{
  "message": "ok",
  "assets": [
    {
      "asset": "USDC",
      "decimals": 6
    }
  ]
}
```

### Trading Pairs
**Endpoint**: `GET /pairs`

**Request**
- no request body

**Response example**
```json
{
  "pairs": [
    {
      "pair_id": "ETH-USDC",
      "base": "ETH",
      "quote": "USDC",
      "tick_size": 1,
      "lot_size": 1,
      "min_notional": 0
    }
  ]
}
```

### Order Book Depth
**Endpoint**: `GET /depth/:pair_id`

**Path params**
- `pair_id`: market pair id such as `ETH-USDC`

**Query params**
- `limit` (optional, default `100`, max `5000`)

**Response example**
```json
{
  "pair_id": "ETH-USDC",
  "lastUpdateId": 42,
  "bids": [[99000, 10], [98000, 5]],
  "asks": [[100000, 4], [101000, 3]]
}
```

### Recent Trades
**Endpoint**: `GET /trades/:pair_id`

**Path params**
- `pair_id`: market pair id

**Query params**
- `limit` (optional, default `50`)

**Response example**
```json
{
  "trades": [
    {
      "id": 1,
      "price": 100000,
      "size": 2,
      "taker_is_bid": true,
      "timestamp_ms": 1700000000000
    }
  ]
}
```

## Account and Balance Endpoints

### Account
**Endpoint**: `GET /account`

**Query params**
- `omitZeroBalances` (optional boolean)
- `recvWindow` (optional number, max `60000`)
- `timestamp` (optional milliseconds)

**Response example**
```json
{
  "makerCommission": 10,
  "takerCommission": 20,
  "buyerCommission": 0,
  "sellerCommission": 0,
  "commissionRates": {
    "maker": "0.00100000",
    "taker": "0.00200000",
    "buyer": "0.00000000",
    "seller": "0.00000000"
  },
  "canTrade": true,
  "canWithdraw": true,
  "canDeposit": true,
  "brokered": false,
  "requireSelfTradePrevention": false,
  "preventSor": false,
  "updateTime": 1700000000123,
  "accountType": "SPOT",
  "balances": [
    {
      "asset": "USDC",
      "free": "1000.000000",
      "locked": "50.000000"
    }
  ],
  "permissions": ["SPOT"],
  "uid": 123
}
```

### All Balances
**Endpoint**: `GET /balances/:user_id`

**Path params**
- `user_id`: authenticated user id

**Response example**
```json
{
  "message": "ok",
  "data": [
    ["USDC", { "available": 123, "reserved": 10, "locked": 0 }],
    ["ETH", { "available": 5, "reserved": 1, "locked": 0 }]
  ]
}
```

### Asset Balance
**Endpoint**: `GET /balances/:user_id/:asset`

**Path params**
- `user_id`: authenticated user id
- `asset`: asset symbol

**Response example**
```json
{
  "message": "ok",
  "data": {
    "available": 123,
    "reserved": 10,
    "locked": 0
  }
}
```

### User Trades
**Endpoint**: `GET /trades/user/:user_id`

**Path params**
- `user_id`: authenticated user id

**Query params**
- `pair_id` (optional)
- `limit` (optional, default `100`, max `5000`)

**Response example**
```json
{
  "user_id": 1,
  "trades": [
    {
      "id": "3f5b8b86-4b67-4b1f-a1cc-3f3bafc6c2b3",
      "pair_id": "ETH-USDC",
      "taker_id": 1,
      "maker_id": 2,
      "price": 100000,
      "size": 2,
      "taker_is_bid": true,
      "timestamp_ms": 1700000000000
    }
  ]
}
```

## Order Endpoints

### Place Order
**Endpoint**: `POST /orders`

**Request body**
```json
{
  "pair_id": "ETH-USDC",
  "order_type": "Limit",
  "is_bid": true,
  "price": 100000,
  "size": 5,
  "user_id": 1
}
```

**Response example**
```json
{
  "message": "order accepted",
  "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8N",
  "fills": [
    { "taker_id": 123, "maker_id": 456, "price": 100000, "size": 2 }
  ],
  "trades": [
    {
      "id": 1,
      "taker_id": 123,
      "maker_id": 456,
      "price": 100000,
      "size": 2,
      "taker_is_bid": true,
      "timestamp_ms": 1700000000000
    }
  ]
}
```

### Place Signed Order
**Endpoint**: `POST /signed_orders`

**Request body**
```json
{
  "pair_id": "ETH-USDC",
  "price": "1000",
  "size": "1",
  "is_bid": true,
  "order_type": "Limit",
  "wallet": "0x...",
  "pubkey": "0x...",
  "nonce": 1,
  "expiry_ms": 1700000005000,
  "signature": "0x..."
}
```

**Response example**
```json
{
  "message": "order accepted",
  "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8N",
  "fills": [],
  "trades": []
}
```

### Cancel Order
**Endpoint**: `POST /orders/cancel`

**Request body**
```json
{
  "pair_id": "ETH-USDC",
  "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8N"
}
```

**Response example**
```json
{
  "message": "cancelled"
}
```

### Cancel And Replace
**Endpoint**: `POST /orders/cancel_replace`

**Request body**
```json
{
  "pair_id": "ETH-USDC",
  "cancel_order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8N",
  "cancel_replace_mode": "STOP_ON_FAILURE",
  "price": 100000,
  "size": 5,
  "is_bid": true,
  "user_id": 1,
  "order_type": "Limit",
  "new_order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8M"
}
```

**Response example**
```json
{
  "message": "cancel-replace succeeded",
  "cancel_result": "SUCCESS",
  "new_order_result": "SUCCESS",
  "cancel_response": {
    "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8N",
    "cancelled": true
  },
  "new_order_response": {
    "message": "order accepted",
    "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8M",
    "fills": []
  }
}
```

### Cancel All Open Orders
**Endpoint**: `POST /orders/cancel_all`

**Request body**
```json
{
  "pair_id": "ETH-USDC"
}
```

**Response example**
```json
{
  "message": "orders cancelled",
  "pair_id": "ETH-USDC",
  "cancelled": 2,
  "results": [
    { "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8N", "cancelled": true },
    { "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8M", "cancelled": true }
  ]
}
```

## Withdrawal Endpoints

### Create Withdrawal
**Endpoint**: `POST /withdrawals`

**Request body**
```json
{
  "asset": "USDC",
  "amount": "100.5",
  "destination_chain_uid": "euclid",
  "destination": "cosmos1..."
}
```

**Response example**
```json
{
  "message": "withdrawal reserved",
  "data": {
    "id": 123,
    "nonce": 42,
    "user_id": 1,
    "asset": "USDC",
    "amount": 100500000,
    "destination_chain_uid": "euclid",
    "destination": "cosmos1...",
    "state": "reserved",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z",
    "balance": {
      "available": 899500000,
      "reserved": 100500000,
      "locked": 0
    }
  }
}
```

### Get Withdrawal Status
**Endpoint**: `POST /withdrawals/status`

**Request body**
```json
{
  "asset": "USDC",
  "nonce": 42
}
```

**Response example**
```json
{
  "message": "ok",
  "data": {
    "id": 123,
    "nonce": 42,
    "user_id": 1,
    "asset": "USDC",
    "amount": 100500000,
    "destination_chain_uid": "euclid",
    "destination": "cosmos1...",
    "state": "reserved",
    "root_id": "uuid",
    "tx_hash": "0x...",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

### Get Withdrawal Permit
**Endpoint**: `POST /withdrawals/permit`

**Request body**
```json
{
  "asset": "USDC",
  "nonce": 42,
  "destination_chain_uid": "euclid",
  "destination": "cosmos1..."
}
```

**Response example**
```json
{
  "message": "permit issued",
  "data": {
    "permit": {
      "data": "{\"account_number\":\"0\",\"chain_id\":\"neuron-1\"}",
      "signature": "base64"
    },
    "proof": [
      { "hash": "base64", "position": "left" },
      { "hash": "base64", "position": "right" }
    ],
    "leaf": {
      "user": "1",
      "token_id": "USDC",
      "balance": "100500000"
    },
    "root_hash": "base64"
  }
}
```

### Relay Withdrawal
**Endpoint**: `POST /withdrawals/relay`

**Request body**
```json
{
  "permit": {
    "data": "{\"account_number\":\"0\",\"chain_id\":\"neuron-1\"}",
    "signature": "base64"
  },
  "proof": [
    { "hash": "base64", "position": "left" },
    { "hash": "base64", "position": "right" }
  ],
  "leaf": {
    "user": "1",
    "token_id": "USDC",
    "balance": "100500000"
  }
}
```

**Response example**
```json
{
  "message": "withdrawal submitted",
  "data": {
    "tx_hash": "ABCDEF..."
  }
}
```

## Error Format

```json
{
  "message": "rejected",
  "error_code": "POST_ONLY_WOULD_CROSS"
}
```
