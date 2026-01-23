---
sidebar_position: 2
title: "Stable Pools"
description: "Understand how stable pools work using an amplified curve to minimize slippage for similarly priced assets."
---

# Stable Pools

Stable pools are designed to facilitate low-slippage swaps between **assets that are expected to have a similar value**, such as different stablecoins (e.g. USDC ↔ USDT) or derivatives of the same token.

They use a **different mathematical model** than constant product pools, one that allows for flatter pricing curves near equilibrium. This results in better capital efficiency and reduced slippage when swapping similarly priced tokens.


## The Amplified Invariant

Stable pools follow a generalized **StableSwap** invariant. Instead of:

$$
x \cdot y = k
$$

They maintain a more complex function based on a **virtual price curve** and an **amplification coefficient (A)**.

The invariant balances the two reserves using:

$$
D = \text{Invariant}(A, x, y)
$$

Where:

- $$D$$ is the invariant
- $$A$$ is the amplification factor
- $$x$$ and $$y$$ are token reserves

This invariant flattens the price curve around the target 1:1 ratio, allowing large volume swaps with minimal price impact — something constant product pools can't do efficiently.



## Amplification Factor (A)

The amplification factor $$A$$ determines how flat the curve is near equilibrium:

- A **higher A** makes the pool behave more like a constant sum (ideal 1:1 ratio)
- A **lower A** behaves more like a constant product pool

This lets protocols tune the trade-off between slippage and pool stability.



## Swap Calculation Logic

Given two reserves and the amount of one token being offered, the pool uses **Newton's method** to solve the invariant and compute the return amount for the other token. The actual formula for calculating output is complex but conceptually aims to maintain the invariant $$D$$ before and after the swap.

In simplified terms:

$$
\text{New state still satisfies the same invariant: } D = f(x + \Delta x, y - \Delta y, A)
$$

This is done with high-precision arithmetic (e.g., using libraries like `shopspring/decimal`) to avoid rounding errors.


## When to Use

Stable pools are ideal for:

- Swapping **pegged assets** (e.g. USDT/USDC, stETH/wstETH)
- Minimizing slippage near 1:1 ratio
- Reducing impermanent loss when token prices are tightly correlated
