---
sidebar_label: Overview
---

# Aggregator Integration Overview

This guide covers a standard Euclid swap integration flow for aggregators: quote, execute, and track.

## Integration Steps

- Get routes.
- Create swap payload.
- Broadcast transaction.
- Track execution.
- Operational tips.

## What You Will Build

- Fetch executable routes for a token pair.
- Build a swap payload from one selected route.
- Broadcast signed transactions using chain-native tooling.
- Track execution status until final outcome.

## Prerequisites

- Familiarity with Euclid REST APIs.
- A backend service for quote and execution orchestration.
- Wallet/signing support for the chains you broadcast on.

## Aggregator FAQ

<details>
<summary><strong>How tight are your quotes?</strong></summary>

Euclid offers the most optimal and tight spreads in the market by offering the order book and AMM layer together while arbitraging the liquidity from over 150+ liquidity sources including other top orderbooks and DEXs.

</details>

<details>
<summary><strong>How do we give good quotes?</strong></summary>

Euclid pulls pricing from both order books and AMMs, then uses the Routes API to compute the best path across chains and venues. The router can use multi-hop routes to improve price execution while still delivering the final asset on the target chain.

Example: you want USDC on Ethereum. If ETH -> USDC on Ethereum is thin, Euclid can route ETH -> BNB on BNB Chain and then BNB -> USDC on BNB, while still releasing USDC on Ethereum when the user settles.

</details>

<details>
<summary><strong>What about spreads?</strong></summary>

Spreads remain tight because liquidity is unified across chains and venues, and the router selects the most efficient route, even when it spans multiple hops.

</details>

<details>
<summary><strong>How efficient are pools?</strong></summary>

Pools are optimized by aggregating liquidity from many sources and by routing swaps through the most capital-efficient path available at the time of execution.

</details>

<details>
<summary><strong>How fast do pools respond and how efficient is bundling?</strong></summary>

Swaps execute quickly because Euclid does not bridge assets per hop. The VSL execution layer is dedicated to Euclid transactions, which keeps routing and approvals local and predictable.

</details>

<details>
<summary><strong>Is execution risky?</strong></summary>

Execution is designed to be safe and deterministic. Euclid avoids bridge risk during routing, and transactions complete quickly with clear on-chain tracking.

</details>
