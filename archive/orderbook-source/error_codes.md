## Error Codes

| Code | Description |
| --- | --- |
| `PAIR_NOT_FOUND` | Pair does not exist. |
| `PAIR_HALTED` | Pair is halted and cannot accept new orders. |
| `PAIR_CANCEL_ONLY` | Pair is cancel-only; new orders are rejected. |
| `PRICE_NOT_ON_TICK` | Limit/IOC/PostOnly price is not aligned to tick size. |
| `NOTIONAL_TOO_LOW` | Notional below minimum for the pair. |
| `SIZE_NOT_ON_LOT` | Size not aligned to lot size. |
| `SIZE_TOO_SMALL` | Size below minimum size for the pair. |
| `INSUFFICIENT_FUNDS` | User lacks available/reserved balance for the action (reserve/settle). |
| `NO_LIQUIDITY` | Market order has no opposite-side liquidity. |
| `POST_ONLY_WOULD_CROSS` | Post-only order would execute immediately and is rejected. |
| `CANCEL_ALL_LIMIT_EXCEEDED` | Cancel-all rejected because open orders exceed the maximum allowed per request. |
| `ORDER_NOT_FOUND` | Target order does not exist or is already closed. |
| `INVALID_SYMBOL_STATUS` | Supplied symbolStatus filter is invalid. |
| `INVALID_INTERVAL` | Interval parameter invalid (market-data service). |
| `INVALID_SIGNATURE` | Signature did not validate or did not match wallet. |
| `SIGNATURE_EXPIRED` | Signed payload is past expiry. |
| `BAD_NONCE` | Signed order nonce is not strictly greater than the last accepted nonce. |
| `SIGNED_NONCE_STORE_NOT_CONFIGURED` | Signed order nonce storage is not configured. |
| `SIGNED_ORDER_DOMAIN_NOT_CONFIGURED` | Signed order domain (venue/chain) is missing. |

### Rounding policy
- Orders are **rejected**, not auto-rounded, when price is off tick (`PRICE_NOT_ON_TICK`) or size is off lot (`SIZE_NOT_ON_LOT`).
- Error details include the floored value (e.g., “price must align to tick_size X; suggested Y”).
