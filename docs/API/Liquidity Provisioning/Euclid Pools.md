---
sidebar_position: 2
title: "Euclid Pools"
description: "Overview of liquidity pools in Euclid, supported pool types, and core pool creation rules."
---

# Euclid Pools

Euclid supports multiple liquidity pool designs so integrators can choose the model that best matches their assets and use case.

Today, pool behavior is primarily defined by:

- [Stable Pool](./Different%20Liquidity%20States/Stable%20Pool.md): optimized for correlated assets and lower slippage near parity.
- [Constant Product Pool](./Different%20Liquidity%20States/Constant%20Product%20Pool.md): classic `x*y=k` market making behavior.

## Pool creation basics

When creating a new pool:

- At least one token should already be registered in Euclid.
- New token IDs can be custom, but must end with `.eucl` (example: `dan.eucl`).
- For `native` and `smart` token types, the token must exist on the chain where you create the pool.
- Token IDs in `pair` must be alphabetically sorted (`token_1` before `token_2`).
- You must have sufficient balances of both input assets on the selected chain.

## Initial LP minting

At pool initialization, LP token supply is derived from:

$$
\text{LP minted} = \sqrt{\text{token\_1 amount} \times \text{token\_2 amount}}
$$

The protocol reserves the first `1000` LP tokens at initialization, and the pool creation fee is very low.

## Next step

To implement this flow end-to-end, follow [Create a New Liquidity Pool](./Endpoints/Create%20Pool.md).
