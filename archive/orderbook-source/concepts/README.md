# Concepts

- Audience: Trading API Integrators
- What this page explains: Core concepts and terminology used across engine, OMS, and market-data docs.
- Where to go next: Read [Orderbook Mechanics](orderbook.md), [Architecture](architecture.md), then [Reliability](reliability.md).

## Concept Deep-Dives
- [Orderbook Mechanics](orderbook.md)
- [Architecture](architecture.md)
- [Reliability Model](reliability.md)

## Glossary
- `pair`: A tradable market like `ETH-USDC` with its own rules.
- `tick size`: Minimum price increment.
- `lot size`: Minimum size increment.
- `base units`: Integer-scaled units used in APIs and storage (no floating point in matching logic).
- `market state`: Venue-wide mode (`active`, `cancel_only`, `halted`, `auction`).
- `pair status`: Per-market mode (`active`, `cancel_only`, `halted`) enforced on that pair.
- `outbox`: Durable local log used before async dispatch to Kafka/other sinks.
- `idempotency`: Safe reprocessing/retry behavior that avoids duplicate state transitions.

## Related References
- [Engine REST API](../../API.md)
- [OMS Service](../OMS.md)
- [Market Data Service](../MARKET_DATA.md)
- [Error Codes](../error_codes.md)
