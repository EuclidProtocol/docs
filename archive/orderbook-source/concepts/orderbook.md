# Orderbook Mechanics

- Audience: Trading API Integrators
- What this page explains: How matching works, how order types behave, and how market/pair state affects order entry.
- Where to go next: Read [Architecture](architecture.md) and [Reliability](reliability.md), then map behavior to [API.md](../../API.md).

## Price-Time Priority
The orderbook uses price-time priority:
- Better price executes first.
- At the same price, earlier order timestamp executes first (FIFO).

For each pair, bids and asks are maintained as price levels. Matching occurs when incoming liquidity crosses the opposite side.

## Price Levels and FIFO Queues
- Each price level contains a queue of resting orders.
- New resting orders join the back of the queue at that level.
- Fills consume from the front of the queue.

This provides deterministic matching behavior for equivalent price levels.

## Supported Order Types
- `Limit`: Can execute immediately if crossing; remaining quantity can rest.
- `Market`: Executes against available opposite liquidity; does not rest.
- `Ioc`: Immediate-or-cancel; can partially execute, remainder is cancelled.
- `PostOnly`: Must not cross on entry; if it would cross, request is rejected.

## Market-Wide State vs Pair Status
Both checks affect order acceptance.

### Market-Wide State (`active`, `cancel_only`, `halted`, `auction`)
- `active`: Normal trading.
- `cancel_only`: New orders rejected; cancels allowed.
- `halted`: New orders rejected; cancels allowed.
- `auction`: Auction flow rules apply; order behavior differs from continuous mode.

### Pair Status (`active`, `cancel_only`, `halted`)
- `active`: Pair accepts normal order flow.
- `cancel_only`: Pair rejects new orders and allows cancels.
- `halted`: Pair rejects new orders and allows cancels.

In practice, both market-wide and pair-level rules are evaluated; either can block new order entry.

## Base Units Example
If a pair uses scaled integer units:
- Client submits integer `price` and `size` values.
- Matching and balances use these integer units directly.
- Human-readable decimal conversion is an integration-layer responsibility.

This design avoids floating-point precision errors in matching and settlement math.
