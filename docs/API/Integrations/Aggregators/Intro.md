---
sidebar_label: Overview
---

# Aggregator Integration Overview

A DeFi aggregator needs fast quoting, reliable execution, and simple tracking across multi-hop routes. Euclid provides unified cross-chain liquidity with deterministic execution and flexible asset release across supported chains.

## What you will build

After integrating with Euclid, your aggregator can quote across unified cross-chain liquidity, surface best-available pricing across DEX liquidity and orderbooks, execute deterministic swaps, and reliably track outcomes end-to-end while letting users receive assets on their preferred chains.

### Steps we will cover

- Fetch a route for a token swap.
- Submit a swap transaction payload.
- Broadcast the transaction on-chain.
- Track execution and finalize the user outcome.

## Prerequisites

- Familiarity with Euclid REST APIs.
- A backend service to fetch routes and submit transactions.
- A wallet or signing service to broadcast transactions.
