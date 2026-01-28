---
sidebar_label: FAQ
unlisted: true
---

# Aggregator FAQ

## How tight are your quotes?

Euclid offers the most optimal and tight spreads in the market by offering the order book and AMM layer together while arbitraging the liquidity from over 150+ liquidity sources including other top orderbooks and DEXs.

## How do we give good quotes?

Euclid pulls pricing from both order books and AMMs, then uses the Routes API to compute the best path across chains and venues. The router can use multi-hop routes to improve price execution while still delivering the final asset on the target chain.

Example: you want USDC on Ethereum. If ETH → USDC on Ethereum is thin, Euclid can route ETH → BNB on BNB Chain and then BNB → USDC on BNB, while still releasing USDC on Ethereum when the user settles.

## What about spreads?

Spreads remain tight because liquidity is unified across chains and venues, and the router selects the most efficient route, even when it spans multiple hops.

## How efficient are pools?

Pools are optimized by aggregating liquidity from many sources and by routing swaps through the most capital-efficient path available at the time of execution.

## How fast do pools respond and how efficient is bundling?

Swaps execute quickly because Euclid does not bridge assets per hop. The VSL execution layer is dedicated to Euclid transactions, which keeps routing and approvals local and predictable.

## Is execution risky?

Execution is designed to be safe and deterministic. Euclid avoids bridge risk during routing, and transactions complete quickly with clear on-chain tracking.
