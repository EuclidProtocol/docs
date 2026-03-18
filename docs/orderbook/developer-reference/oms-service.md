---
title: OMS API
description: Public production OMS endpoints with request and response schemas.
sidebar_position: 5
---

Base URL: `https://oms.liquideuclid.com`

Authenticated endpoints require headers from [Authentication Headers](./authentication-and-api-keys.md).
For OMS requests, use `Authorization: Bearer <token>` (OMS validates Bearer JWT auth).

## Quick Navigation
- [Endpoint Index](#endpoint-index): complete OMS route list.
- [Endpoints](#endpoints): request params and response examples for each route.
- [Response Schemas](#response-schemas): reusable payload shapes used across endpoints.

## Endpoint Index

| Endpoint | Use it for | Response shape |
| --- | --- | --- |
| `GET /health` | check OMS availability | `"ok"` |
| `GET /orders/open/:user_id` | list open and partially filled orders | `OrdersResponse` |
| `GET /orders/history/:user_id` | list historical orders with optional filters | `OrdersResponse` |
| `GET /orders/:order_id` | fetch one order by id | `OrderResponse` |

## Endpoints

### Health
**Endpoint**: `GET /health`

**Request**
- no request body

**Response example**
```json
"ok"
```

### Open Orders
**Endpoint**: `GET /orders/open/:user_id`

**Path params**
- `user_id`: authenticated user id

**Query params**
- `pair_id` (optional): filter by pair id
- `limit` (optional, default `100`, max `1000`)
- `offset` (optional, default `0`)

**Response example**
```json
{
  "message": "ok",
  "orders": [
    {
      "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8N",
      "user_id": 42,
      "pair_id": "ETH-USDC",
      "is_bid": true,
      "order_type": "limit",
      "price": 100000,
      "size": 2,
      "filled": 1,
      "remaining": 1,
      "status": "partially_filled",
      "created_at_ms": 1700000000000,
      "updated_at_ms": 1700000005000
    }
  ],
  "error_code": null
}
```

**Notes**
- only `open` and `partially_filled` orders are returned

### Order History
**Endpoint**: `GET /orders/history/:user_id`

**Path params**
- `user_id`: authenticated user id

**Query params**
- `pair_id` (optional): filter by pair id
- `status` (optional): `open | partially_filled | filled | cancelled`
- `limit` (optional, default `100`, max `1000`)
- `offset` (optional, default `0`)

**Response example**
```json
{
  "message": "ok",
  "orders": [
    {
      "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8N",
      "user_id": 42,
      "pair_id": "ETH-USDC",
      "is_bid": true,
      "order_type": "limit",
      "price": 100000,
      "size": 2,
      "filled": 2,
      "remaining": 0,
      "status": "filled",
      "created_at_ms": 1700000000000,
      "updated_at_ms": 1700000005000
    }
  ],
  "error_code": null
}
```

### Order By ID
**Endpoint**: `GET /orders/:order_id`

**Path params**
- `order_id`: target order id

**Response example**
```json
{
  "message": "ok",
  "order": {
    "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8N",
    "user_id": 42,
    "pair_id": "ETH-USDC",
    "is_bid": true,
    "order_type": "limit",
    "price": 100000,
    "size": 2,
    "filled": 1,
    "remaining": 1,
    "status": "partially_filled",
    "created_at_ms": 1700000000000,
    "updated_at_ms": 1700000005000
  },
  "error_code": null
}
```

**Error example**
```json
{
  "message": "not found",
  "error_code": "ORDER_NOT_FOUND"
}
```

## Response Schemas

**OrderView**

```json
{
  "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8N",
  "user_id": 42,
  "pair_id": "ETH-USDC",
  "is_bid": true,
  "order_type": "limit",
  "price": 100000,
  "size": 2,
  "filled": 1,
  "remaining": 1,
  "status": "partially_filled",
  "created_at_ms": 1700000000000,
  "updated_at_ms": 1700000005000
}
```

**OrdersResponse**

```json
{
  "message": "ok",
  "orders": [
    {
      "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8N",
      "user_id": 42,
      "pair_id": "ETH-USDC",
      "is_bid": true,
      "order_type": "limit",
      "price": 100000,
      "size": 2,
      "filled": 1,
      "remaining": 1,
      "status": "partially_filled",
      "created_at_ms": 1700000000000,
      "updated_at_ms": 1700000005000
    }
  ],
  "error_code": null
}
```

**OrderResponse**

```json
{
  "message": "ok",
  "order": {
    "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8N",
    "user_id": 42,
    "pair_id": "ETH-USDC",
    "is_bid": true,
    "order_type": "limit",
    "price": 100000,
    "size": 2,
    "filled": 1,
    "remaining": 1,
    "status": "partially_filled",
    "created_at_ms": 1700000000000,
    "updated_at_ms": 1700000005000
  },
  "error_code": null
}
```
