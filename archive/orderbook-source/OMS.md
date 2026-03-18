# OMS Service (draft)

Purpose: consume order events from Kafka, persist a read model to Postgres, and expose open orders + order history via REST.

## Env vars
- `OMS_DB_URL` (required)
- `OMS_KAFKA_BROKERS` (default `localhost:9092`)
- `OMS_KAFKA_TOPIC` (default `orders`)
- `OMS_KAFKA_GROUP_ID` (default `oms-service`)
- `OMS_PORT` (default `3300`)
- `AUTH_JWT_SECRET` (optional) – enables Bearer JWT auth
- `AUTH_SERVICE_URL` or `AUTH_API_URL` (optional) – enables API key auth via auth-service `/api_keys/verify`

Auth behavior:
- If JWT and/or API key auth is configured, OMS requires credentials and enforces user ownership.
- If neither is configured, OMS startup fails unless `ALLOW_INSECURE_USER_AUTH=true`; with insecure mode enabled, auth is disabled for local/dev use.
- Supported user credentials:
  - `Authorization: Bearer <token>`
  - `X-API-KEY: <key>` + `X-API-SECRET: <secret>`

## Order event format
Expects JSON-encoded `common::OrderEvent` on the Kafka topic:
```json
{
  "event_key": "order:01J0Z4Y2X2C0FQ3F1F5PZQ1J8N:accepted",
  "event_type": "accepted",
  "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8N",
  "user_id": 42,
  "pair_id": "ETH-USDC",
  "is_bid": true,
  "order_type": "limit",
  "price": 100000,
  "size": 2,
  "timestamp_ms": 1700000000000
}
```

Filled events include `fill_price`, `fill_size`, and `trade_id` (UUID). Cancel events include `reason`.

## API
- `GET /health` → `"ok"`
- `GET /orders/open/:user_id?pair_id=ETH-USDC&limit=100&offset=0`
- `GET /orders/history/:user_id?pair_id=ETH-USDC&status=filled&limit=100&offset=0`
- `GET /orders/:order_id`

Order status values: `open`, `partially_filled`, `filled`, `cancelled`.

### Response types
All responses are JSON and use integer values in base units (already scaled by pair config). `order_id` is a string.

```json
// OrderView
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

```json
// OrdersResponse
{
  "message": "ok",
  "orders": [/* OrderView */],
  "error_code": null
}
```

```json
// OrderResponse
{
  "message": "ok",
  "order": {/* OrderView */},
  "error_code": null
}
```

```json
// Error response
{
  "message": "unauthorized",
  "error_code": "UNAUTHORIZED"
}
```

### Endpoint details
`GET /orders/open/:user_id`
- Query params: `pair_id` (optional), `limit` (optional, default 100, max 1000), `offset` (optional, default 0)
- Returns orders with `status` in `open` or `partially_filled`.

`GET /orders/history/:user_id`
- Query params: `pair_id` (optional), `status` (optional), `limit` (optional, default 100, max 1000), `offset` (optional, default 0)
- Returns all orders for user, optionally filtered by `pair_id` and `status`.

`GET /orders/:order_id`
- Returns a single order if found; 404 otherwise.

## Running locally
```bash
# ensure Kafka and Postgres are running (e.g., make kafka && make postgres)
OMS_DB_URL=postgres://postgres:postgres@localhost:5432/omsdb cargo run -p oms-service
```
