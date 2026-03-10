# Matching Engine REST API (draft)

Base URL defaults to `http://localhost:3000` (configurable via `ENGINE_PORT`). JSON everywhere unless noted.

## Authentication
- Supported credentials:
  - Bearer JWT: `Authorization: Bearer <token>` (HS256 with `AUTH_JWT_SECRET` from auth-service).
  - API key: `X-API-KEY: <key>` and `X-API-SECRET: <secret>` (verified via auth-service).
- Unless noted, authenticated routes use the authenticated `user_id`; any `user_id` in the payload must match and is ignored for authorization purposes.

## Health & Time
- `GET /health` → `200 "ok"`
- `GET /time` → `200 {"serverTime": 1700000000000}` (system clock in ms)

## Balances (engine cache)
- Auth required (user): `GET /balances/:user_id/:asset` → `{"message":"ok","data":{"available":123,"reserved":10,"locked":0}}` (path `user_id` must match the auth context)
- Auth required (user): `GET /balances/:user_id` → `{"message":"ok","data":[["USDC",{"available":123,"reserved":10,"locked":0}], ...]}`
- Auth required (internal scope): `GET /balances_dump` → `{"message":"ok","data":[{"user_id":1,"asset":"USDC","available":123,"reserved":10,"locked":0}, ...]}`
- `GET /assets?asset=USDC` → `{"message":"ok","assets":[{"asset":"USDC","decimals":6}]}` (omit `asset` to list all)

## Account
- Auth required (user): `GET /account`
- Query params:
  - `omitZeroBalances` (bool, optional; default false)
  - `recvWindow` (decimal ms, optional; max 60000, up to 3 decimals)
  - `timestamp` (ms, optional; if provided, must be within `recvWindow`, default 5000ms)
Response:
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

## Pairs (markets)
- `POST /pairs` (admin token is read from `admin_token` field in the body; the `ADMIN_TOKEN` env must be set on the engine)  
  Body: `{"pair_id":"ETH-USDC","config":{...},"admin_token":"your-admin-token"}`  
  Resp: `200 {"message":"pair ETH-USDC created"}`  
  Note: the header `X-ADMIN-TOKEN` is **not** used; include the token in the JSON payload.
- `GET /pairs` → `200 {"pairs":[{"pair_id":"ETH-USDC","base":"ETH","quote":"USDC","tick_size":1,"lot_size":1,"min_notional":0}]}`

## Market-wide admin controls
All market-wide admin endpoints require the JSON body field `admin_token` (and `ADMIN_TOKEN` must be set). Each action is appended to the admin audit log (see `ADMIN_AUDIT_LOG_PATH`).

- `POST /admin/market/halt`  
  Body: `{"admin_token":"your-admin-token"}`  
  Resp: `200 {"message":"market state set to halted"}`
- `POST /admin/market/cancel_only`  
  Body: `{"admin_token":"your-admin-token"}`  
  Resp: `200 {"message":"market state set to cancel_only"}`
- `POST /admin/market/auction`  
  Body: `{"admin_token":"your-admin-token"}`  
  Resp: `200 {"message":"market state set to auction"}`
- `POST /admin/market/active`  
  Body: `{"admin_token":"your-admin-token"}`  
  Resp: `200 {"message":"market state set to active"}`

Notes:
- `Auction` collects orders into a separate auction book; orders are uncrossed when returning to `Active`.
- `CancelOnly` rejects new orders but allows cancels.
- `Halted` rejects new orders; cancels are still allowed (pair state still applies after market state checks).

## Orders
All order endpoints require auth (Bearer or API key) with a scope that allows trading. The authenticated `user_id` is used; the `user_id` field in bodies must match and is validated.

Common fields:
- `order_type`: `"Limit" | "Market" | "Ioc" | "PostOnly"`
- `is_bid`: boolean (`true` = buy, `false` = sell)
- `size`: u64 (base units)
- `price`: u64 (quote per base; required for limit/post_only/ioc, ignored for market buy in some flows)
- `user_id`: u64
- Optional `order_id`: string

### Place order (unsigned)
- `POST /orders`  
  Body: `{"pair_id":"ETH-USDC","order_type":"Limit","is_bid":true,"price":100000,"size":5,"user_id":1}` (user_id must match the authenticated user and is enforced)  
  Success `200`:  
  ```json
  {
    "message": "order accepted",
    "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8N",
    "fills": [
      {"taker_id":123,"maker_id":456,"price":100000,"size":2}
    ],
    "trades": [
      {"id":1,"taker_id":123,"maker_id":456,"price":100000,"size":2,"taker_is_bid":true,"timestamp_ms":1700000000000}
    ]
  }
  ```  
  Reject `400`: `{"message":"rejected","error_code":"POST_ONLY_WOULD_CROSS"}` (see `docs/error_codes.md`).
  Auction mode rejects Market/Ioc with `error_code` = `AUCTION_ORDER_TYPE_NOT_SUPPORTED`.

### Place signed order
- `POST /signed_orders`  
  Body: `{"pair_id":"ETH-USDC","price":"1000","size":"1","is_bid":true,"order_type":"Limit","wallet":"0x...","pubkey":"0x...","nonce":1,"expiry_ms":1700000005000,"signature":"0x..."}`  
  Resp identical to `/orders` on success; rejects with `error_code` on signature/expiry/nonce failure. (Signature proves ownership; auth headers are optional.)  
  Error codes (non-exhaustive): `INVALID_SIGNATURE`, `SIGNATURE_EXPIRED`, `BAD_NONCE`, `SIGNED_NONCE_STORE_NOT_CONFIGURED`, `SIGNED_ORDER_DOMAIN_NOT_CONFIGURED`.  
  Notes: nonce must be strictly increasing per user (nonce is consumed after signature validation even if the order later fails validation); signing payload includes `SIGNED_ORDER_DOMAIN_VENUE` + `SIGNED_ORDER_DOMAIN_CHAIN_ID` domain separator.  
  Config: set `SIGNED_ORDER_DOMAIN_VENUE` + `SIGNED_ORDER_DOMAIN_CHAIN_ID`; production nonce persistence requires DB (`--features db` + `TRADE_DB_URL`), or set `ALLOW_INSECURE_SIGNED_ORDERS=true` for dev/test.

### Cancel order
- `POST /orders/cancel`  
  Body: `{"pair_id":"ETH-USDC","order_id":"01J0Z4Y2X2C0FQ3F1F5PZQ1J8N"}` (auth required; cancellation is only allowed for the authenticated user’s resting orders)  
  Resp `200 {"message":"cancelled"}` or `404 {"message":"not found","error_code":"ORDER_NOT_FOUND"}`.

### Cancel-replace (atomic cancel + new order)
- `POST /orders/cancel_replace`  
  Body:
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
  - `cancel_replace_mode`: `"STOP_ON_FAILURE"` or `"ALLOW_FAILURE"`.
  - Cancel is attempted first; if it fails and mode is `STOP_ON_FAILURE`, the new order is not attempted.
  - If mode is `ALLOW_FAILURE`, the new order is attempted even when the cancel fails (old order may remain live).
  - The new order uses the same validation rules as `POST /orders`.
  Success `200`:
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
      "fills": [],
      "accepted": { "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8M", "remaining": 5, "price": 100000, "is_bid": true }
    }
  }
  ```
  Failure example (`STOP_ON_FAILURE`, cancel not found):
  ```json
  {
    "message": "cancel failed; new order not attempted",
    "cancel_result": "FAILURE",
    "new_order_result": "NOT_ATTEMPTED",
    "cancel_response": {
      "order_id": "01J0Z4Y2X2C0FQ3F1F5PZQ1J8N",
      "cancelled": false,
      "error_code": "ORDER_NOT_FOUND"
    }
  }
  ```
  New-order validation failures return `new_order_result: "FAILURE"` and include `error_code` in `new_order_response`.

### Cancel all open orders for a pair
- `POST /orders/cancel_all`  
  Body: `{"pair_id":"ETH-USDC"}` (auth required; cancels only the authenticated user’s open orders on the pair)  
  Success `200`:
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
  If no open orders exist, `cancelled` is `0` and `results` is empty.  
  Limit: a request is rejected if open orders exceed `CANCEL_ALL_MAX_ORDERS` (default 1000) with `error_code: CANCEL_ALL_LIMIT_EXCEEDED`.

## OMS (open orders & history)
Open orders are served by the OMS read model (separate service, default port `3300`). See `docs/OMS.md` for full response types and auth behavior.

### Open orders
- `GET /orders/open/:user_id?pair_id=ETH-USDC&limit=100&offset=0`  
  Returns orders with `status` in `open` or `partially_filled`. Auth may be required when `AUTH_JWT_SECRET` and/or `AUTH_SERVICE_URL` is set on OMS; supported credentials are Bearer JWT or API key/secret, and `user_id` must match the auth context.

## Withdrawals (user-facing)
All withdrawal endpoints require auth (Bearer JWT or API key) and use the authenticated `user_id`. Scope required: `trade` (same as order endpoints).
These endpoints forward to account-service internally and require `ACCOUNT_SERVICE_URL` and `INTERNAL_JWT_TOKEN` to be configured on the engine.

### Request withdrawal
- `POST /withdrawals`  
  Body:
  ```json
  {
    "asset": "USDC",
    "amount": "100.5",
    "destination_chain_uid": "euclid",
    "destination": "cosmos1..."
  }
  ```
  `amount` is human-readable and will be scaled using the configured asset decimals.
  Success `200`:
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
      "balance": {"available":899500000,"reserved":100500000,"locked":0}
    }
  }
  ```
  Reject `400` with `error_code`: `INVALID_AMOUNT`, `INVALID_DESTINATION`, `UNKNOWN_ASSET`, `INSUFFICIENT_FUNDS`.  
  Reject `409` with `error_code`: `NONCE_CONFLICT` (engine retries automatically; surfaced only if retries exhausted).

### Withdrawal status
- `POST /withdrawals/status`  
  Body `{"asset":"USDC","nonce":42}`  
  Success `200`:
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
  Reject `404 {"message":"withdrawal not found","error_code":"NOT_FOUND"}`.

### Issue withdrawal permit + proof
- `POST /withdrawals/permit`  
  Body `{"asset":"USDC","nonce":42,"destination_chain_uid":"euclid","destination":"cosmos1..."}`  
  Success `200`:
  ```json
  {
    "message": "permit issued",
    "data": {
      "permit": {
        "data": "{\"account_number\":\"0\",\"chain_id\":\"neuron-1\",...}",
        "signature": "base64"
      },
      "proof": [
        {"hash":"base64","position":"left"},
        {"hash":"base64","position":"right"}
      ],
      "leaf": {"user":"1","token_id":"USDC","balance":"100500000"},
      "root_hash": "base64"
    }
  }
  ```
  Notes: requires a current withdrawal root and permit signer config.  
  Rejects: `CONFIG_MISSING`, `NOT_FOUND`, `NO_ROOT`, `INVALID_STATE`, `INVALID_DESTINATION`, `LEAF_NOT_FOUND`.

### Relay withdrawal on-chain (backend-driven)
- `POST /withdrawals/relay`  
  Body:
  ```json
  {
    "permit": {
      "data": "{\"account_number\":\"0\",\"chain_id\":\"neuron-1\",...}",
      "signature": "base64"
    },
    "proof": [
      {"hash":"base64","position":"left"},
      {"hash":"base64","position":"right"}
    ],
    "leaf": {"user":"1","token_id":"USDC","balance":"100500000"}
  }
  ```
  Success `200`:
  ```json
  {
    "message": "withdrawal submitted",
    "data": {"tx_hash": "ABCDEF..."}
  }
  ```
  Notes: the engine forwards this to account-service `POST /withdrawals/relay` using `INTERNAL_JWT_TOKEN`.  
  Requires account-service relay config: `ROOT_RPC`, `ROOT_CHAIN_ID`, `ROOT_CONTRACT_ADDR`, `ROOT_SIGNER_PRIVKEY`.  
  Rejects: `CONFIG_MISSING`, `INVALID_PERMIT`, `LEAF_MISMATCH`, `INVALID_DESTINATION`, `PERMIT_EXPIRED`.

## Account adjustments (internal)
- Auth required with `internal` scope:  
  - `POST /deposit` body `{"user_id":1,"asset":"USDC","amount":1000}`  
- `POST /account_updates` body `{"update_id":"uuid","user_id":1,"asset":"USDC","delta_available":-100,"delta_locked":100}`  
  These mutate the in-memory account cache and are intended for trusted services only. Include a unique `update_id` for idempotency (duplicates are ignored).

## Market data
### Depth
- `GET /depth/:pair_id?limit=100`  
  Query: `limit` default 100, max 5000  
  Resp: `{"pair_id":"ETH-USDC","lastUpdateId":42,"bids":[[99000,10],[98000,5]],"asks":[[100000,4],[101000,3]]}`
  - `lastUpdateId` increments with each order book update and aligns with the `depth_diff` stream sequence.

### Trades
- `GET /trades/:pair_id?limit=50`  
  Resp: `{"trades":[{"id":1,"price":100000,"size":2,"taker_is_bid":true,"timestamp_ms":1700000000000}]}` (ordered recent → older)

- `GET /trades/user/:user_id?pair_id=ETH-USDC&limit=100` (DB builds only)  
  Requires `--features db` and `TRADE_DB_URL` configured on the engine. Auth required; the `user_id` must match the authenticated user. Returns trades where the user is taker or maker, optionally filtered by `pair_id`. Limit capped at 5000 (default 100).  
  Example response:  
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

## DB service (ingestion worker)
When built with the `db` feature and run as `offchain-engine --bin db_service` (default port 4000):
- `GET /health` → `"ok"`
- `POST /trades` body `{"pair_id":"ETH-USDC","trades":[...TradeEvent...]}` → `200 {"message":"stored"}`
- `GET /trades?pair_id=ETH-USDC&limit=50` → trades from DB
- `POST /snapshots` body `{"pair_id":"ETH-USDC","bids":[[p,sz]...],"asks":[[p,sz]...]}` → `200 {"message":"stored"}`

## Error codes (non-exhaustive)
Returned as `error_code` in body with `400/404`:
- `TICK_SIZE_VIOLATION`, `LOT_SIZE_VIOLATION`, `MIN_NOTIONAL_VIOLATION`
- `OUT_OF_RANGE_ORDER` in body
- `NO_LIQUIDITY`, `POST_ONLY_WOULD_CROSS`
- `MARKET_HALTED`, `MARKET_CANCEL_ONLY`, `MARKET_AUCTION`, `AUCTION_ORDER_TYPE_NOT_SUPPORTED`
- `ORDER_NOT_FOUND`
- `CANCEL_ALL_LIMIT_EXCEEDED`
- `INVALID_SIGNATURE`, `EXPIRED`, `BAD_NONCE`
See `docs/error_codes.md` for the complete list and semantics.

## Types (representations)
- Order response `fills`: `{taker_id,u64, maker_id,u64, price:u64, size:u64}`
- Trades: `{id:uuid, price:u64, size:u64, taker_is_bid:bool, timestamp_ms:u64, taker_id:u64, maker_id:u64}`
- Depth arrays: `[[price:u64, size:u64], ...]`
