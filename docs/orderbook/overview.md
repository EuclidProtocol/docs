---
title: Orderbook Overview
description: Developer-first introduction to Euclid's orderbook stack, architecture, and integration path.
sidebar_position: 1
---

- Audience: Developers building trading bots, connectors, broker adapters, or trading UIs.
- What this page covers: What this orderbook rollup is, how it scales matching without giving up decentralization, and how to start integrating quickly.
- Where to go next: Read [Introduction](./getting-started/introduction.md), then [Order Lifecycle](./getting-started/order-lifecycle.md), then [Engine API](./developer-reference/engine-api.md). For settlement context, see [Virtual Settlement Layer](../Architecture%20Overview/Architecture/Virtual%20Settlement%20Layer/virtual-settlement-layer.md).

## What an Orderbook Is
An orderbook is a market model where buyers and sellers place limit orders at specific prices. The matching engine continuously matches compatible buy and sell orders using price-time priority.

At a high level:
- Buyers submit bids (the highest bid is best).
- Sellers submit asks (the lowest ask is best).
- When prices cross, trades execute.
- Unfilled limit quantity remains on the book as resting liquidity.

## Why This Orderbook Is Different
This orderbook runs as a rollup execution layer and posts proofs directly to the Virtual Settlement Layer (VSL). That gives you centralized-exchange style matching throughput with onchain-verifiable state commitments.

In this model:
- Matching is executed offchain for speed.
- Full orderbook state commitments are posted onchain every 2 blocks.
- Proofs are posted to VSL so downstream settlement can rely on verifiable state transitions.

This is the core scaling tradeoff you want as an integrator: high-frequency matching performance without giving up decentralization guarantees.

## How This Differs from AMM Routing
AMMs quote from pool curves. Orderbooks quote from explicit resting orders.

Practical differences for integrators:
- Price formation: AMMs are curve-based; orderbooks are order-driven.
- Execution style: AMMs usually execute immediately against pool state; orderbooks can rest, partially fill, or be cancelled.
- State tracking: orderbooks require lifecycle tracking (`open`, `partially_filled`, `filled`, `cancelled`) and live depth updates.
- Settlement assurances: in this stack, rollup state/proofs are posted to VSL on a fixed cadence (every 2 blocks), so execution scale and decentralized verification can coexist.

## Who Should Use This Stack
This section is for teams that need one or more of the following:
- Fine-grained execution control (limit/IOC/post-only/cancel-replace).
- Real-time market depth and trade streams.
- Deterministic lifecycle tracking for order management.
- Exchange-style trading UX.

## Fastest Path to Integration
1. Read [Introduction](./getting-started/introduction.md) for system boundaries.
2. Read [Order Lifecycle](./getting-started/order-lifecycle.md) to understand order states.
3. Configure [Production Endpoints](./developer-reference/endpoints.md).
4. Apply [Authentication Headers](./developer-reference/authentication-and-api-keys.md).
5. Complete [Deposit](./developer-reference/deposit.md) to top up trading balance with vouchers.
6. Read [Architecture](./concepts/architecture.md) to understand proof posting and VSL settlement boundaries.
7. Implement write paths using [Engine API](./developer-reference/engine-api.md).
8. Implement read paths using [OMS API](./developer-reference/oms-service.md).
9. Add market feeds from [Market Data API](./developer-reference/market-data.md).
