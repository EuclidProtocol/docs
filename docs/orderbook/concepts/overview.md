---
title: Concepts Overview
description: Core concepts and glossary for orderbook trading, rollup settlement, and market data.
sidebar_position: 1
---

- Audience: Trading API integrators.
- What this page covers: Shared terminology and concept map across rollup execution, proof posting, market views, and trading workflows.
- Where to go next: Read [Orderbook Mechanics](./orderbook-mechanics.md), [Architecture](./architecture.md), then [Reliability](./reliability.md). For full settlement-layer background, see [Virtual Settlement Layer](../../Architecture%20Overview/Architecture/Virtual%20Settlement%20Layer/virtual-settlement-layer.md).

## Core Mental Model
The orderbook stack is a rollup execution engine:
- Orders are matched offchain for throughput and low latency.
- The system posts proofs and full state commitments to VSL every 2 blocks.
- Settlement consumes these verifiable state updates rather than trusting an opaque offchain process.

For integrators, this means you can build high-frequency trading workflows while still inheriting decentralized verifiability at the settlement layer.

## Concept Deep-Dives
- [Orderbook Mechanics](./orderbook-mechanics.md)
- [Architecture](./architecture.md)
- [Reliability Model](./reliability.md)

## Glossary
- `pair`: A tradable market like `ETH-USDC` with its own rules.
- `tick size`: Minimum price increment.
- `lot size`: Minimum size increment.
- `base units`: Integer-scaled units used in APIs and matching logic.
- `market state`: Venue-wide mode (`active`, `cancel_only`, `halted`, `auction`).
- `pair status`: Per-market mode (`active`, `cancel_only`, `halted`) enforced on that pair.
- `idempotency`: Safe reprocessing/retry behavior that avoids duplicate state transitions.
- `rollup`: Offchain execution environment that periodically publishes verifiable updates onchain.
- `state commitment`: Canonical published representation of rollup state.
- `proof batch`: Verification artifact posted with the state commitment.
- `posting cadence`: Frequency of proof/state publication to VSL (every 2 blocks).

## Related References
- [Engine API](../developer-reference/engine-api.md)
- [OMS API](../developer-reference/oms-service.md)
- [Market Data API](../developer-reference/market-data.md)
