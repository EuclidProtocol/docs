---
sidebar_position: 6
title: "How Routes Are Calculated"
description: "Understand how Euclid calculates optimal routes between tokens for swaps using internal graph logic and pricing formulas."
---

# How Routes Are Calculated in Euclid

In a multi-chain, multi-hop protocol like Euclid, efficient routing is essential to determine the best way to swap one token for another, potentially across different pools, DEXs, or even chains. The routing logic ensures that the most viable paths are found to execute complex transactions while maintaining accuracy and efficiency.


## Overview

When you initiate a token swap using Euclid, the backend system performs the following steps to determine **how** your swap will be executed:

1. **Initialize a token graph with no weights associated to edges**
2. **Find all viable swap paths using DFS**
3. **Calculate output for each route using price formulas**
4. **Choose the best route (usually the one with the highest output)**


## 1. Graph Initialization

The routing engine begins by constructing a **graph of available liquidity pools**, using verified data pulled from the Euclid database.

- **Nodes** in the graph represent tokens (e.g., `USDC`, `ETH`, `EUCLID`, etc.)
- **Edges** represent verified trading pairs (VLPs)

Two separate graphs are maintained:

- **Internal Routes Graph**: contains all routes that use only Euclid-managed liquidity pools within the protocol.
- **External Routes Graph**: extends routing to include external DEX pools such as Osmosis or Astroport, enabling swaps that combine Euclid and third-party liquidity sources to always ensure best prices for our users.

## 2. Finding Routes (Depth-First Search)

To discover all possible paths from a source token to a destination token, Euclid uses a [**Depth-First Search (DFS)**](https://www.geeksforgeeks.org/dsa/depth-first-search-or-dfs-for-a-graph/) algorithm on the graph.

The DFS:

- Traverses all possible token hops
- Prunes loops and dead ends
- Uses [**memoization**](https://www.geeksforgeeks.org/dsa/what-is-memoization-a-complete-tutorial/) to cache results and optimize repeated path lookups

This allows Euclid to identify all valid swap paths from token A to token B, even across complex route networks.

## 3. Amount-Out Calculation

Once valid paths are discovered, the backend simulates the **expected output amount** for each route to determine the best one.

### Two Types of Pricing Logic:

#### a. **Stable Pools (1:1 formula)**

For token pairs that use a **stable-swap formula** (like USDC ↔ USDT), a high-precision calculation is used to simulate the amount out based on virtual reserves, amplification factor, and swap volume.

#### b. **Constant Product (XYK formula)**

For most volatile pools (e.g., ETH ↔ EUCLID), the protocol uses the **constant product formula**:

$$
\text{amountOut} = \text{token2Liquidity} - \left( \frac{k}{\text{token1Liquidity} + \text{amountIn}} \right)
$$

This logic ensures slippage and pool rebalancing are accurately accounted for.
