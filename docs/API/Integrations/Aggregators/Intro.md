---
sidebar_label: Overview
---

# Aggregator Integration Overview

A DeFi aggregator needs fast quoting, reliable execution, and simple tracking across multi-hop routes. Euclid provides unified cross-chain liquidity with deterministic execution and flexible asset release across supported chains.

## What you will build

- Fetch a route for a token swap.
- Submit a swap transaction payload.
- Broadcast the transaction on-chain.
- Track execution and finalize the user outcome.

## Prerequisites

- Familiarity with Euclid REST APIs.
- A backend service to fetch routes and submit transactions.
- A wallet or signing service to broadcast transactions.

## Recommended flow

1. **Get a quote** via the Routes endpoint.
2. **Build the swap** payload and sign it.
3. **Broadcast** the transaction.
4. **Track** execution until completion.

Next: start with route discovery.
