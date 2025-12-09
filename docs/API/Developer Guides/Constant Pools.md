---
sidebar_position: 1
title: "Constant Product Pools"
description: "Learn how constant product (XYK) liquidity pools work and how token swaps are calculated."
---

# Constant Product Pools

Constant product pools are one of the most popular AMM models, first introduced by Uniswap. They allow two tokens to be swapped while ensuring the reserves follow a mathematical rule that prevents depletion.


## How the Formula Works

The fundamental formula for constant product pools is:

$$
x \cdot y = k
$$

Where:

- $$x$$ = reserve of token X  
- $$y$$ = reserve of token Y  
- $$k$$ = constant product, which must remain unchanged after a swap

This relationship ensures that when a user adds some amount $$\Delta x$$ of token X to the pool, the output $$\Delta y$$ of token Y is calculated such that:

$$
(x + \Delta x)(y - \Delta y) = k
$$

This is often referred to as the **invariant equation**.


## Swap Output Formula

In practice, the amount of output token a user gets from a swap is computed using a derived form of the above invariant:

$$
\Delta y = \frac{y \cdot \Delta x}{x + \Delta x}
$$

This shows that as more of token X is added (larger $$\Delta x$$), the marginal price increases, meaning **slippage** occurs. The pool automatically adjusts the price based on trade size.


## When to Use

Constant product pools are best suited for:

- Tokens with **high volatility**
- General-purpose pairs like ETH/USDC or BNB/BTC
- Use cases where **any-to-any swaps** are needed without relying on oracles
