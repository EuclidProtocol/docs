---
title: Reliability Model
description: Public reliability expectations for order placement, data freshness, and settlement visibility.
sidebar_position: 4
---

- Audience: Trading API integrators.
- What this page covers: What API users can expect about execution responses, data freshness, retries, and settlement visibility.

## Reliability Mental Model
For API users, reliability is best understood as three separate timelines:
- `execution timeline`: when an order is accepted, rejected, filled, or cancelled
- `query timeline`: when that result appears on order-history and market-data endpoints
- `settlement timeline`: when the rollup publishes state commitments and proofs to VSL

These timelines are related, but they are not always simultaneous.

## Guarantees vs Non-Guarantees
### Generally expected
- A trading response reflects the execution decision for that request.
- OMS and market-data endpoints converge to the same trading outcome after short propagation delays.
- Rollup state is published to VSL on a recurring cadence of every 2 blocks.

### Not guaranteed as immediate
- Zero-latency synchronization across all public endpoints.
- Instant visibility of a new order, fill, or cancel across every query surface at the same moment.
- Immediate onchain publication for every individual trade event.

Short-lived eventual-consistency windows are normal in distributed async pipelines.

## Integration Best Practices
- Use client-generated order identifiers or request correlation where your integration supports it.
- Treat OMS and market-data as eventually consistent views of recent execution activity.
- After reconnecting, resync open orders, balances, and market state before resuming automated strategies.
- Build clients to tolerate brief ordering differences between trading responses and downstream market-data updates.

## What Finality Means Here
- `API acceptance or rejection` tells you what the execution layer decided for the request.
- `OMS visibility` tells you the read model has caught up enough for user-facing queries.
- `VSL publication` is the public verification step for the rollup state update.

For integrators, the key distinction is simple: trade execution is fast, public verification follows on the VSL cadence, and read APIs may briefly trail the execution response.

## Read Next
Cross-check behavior in [Engine API](../developer-reference/engine-api.md), [OMS API](../developer-reference/oms-service.md), and [Market Data API](../developer-reference/market-data.md).
