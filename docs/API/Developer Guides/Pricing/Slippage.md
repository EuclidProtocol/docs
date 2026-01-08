---
sidebar_position: 11
title: "Slippage"
description: "Learn how trade execution deviates from quoted prices and how to manage slippage."
---

# Slippage

Slippage measures the difference between the expected price of a trade and the price at which it actually executes. In automated market makers (AMMs), this slippage arises because swaps move the pool’s price curve and because external market conditions can shift while a transaction is pending.

## Why Slippage Happens

Several factors drive execution slippage:

- **Pool depth**: Smaller liquidity pools experience larger price impact for the same trade size.
- **Market volatility**: Rapid price swings can cause the execution price to change between quote and confirmation.
- **Arbitrage competition**: Bots reacting faster to price changes may capture the quoted price before your transaction lands on-chain.
- **Block times**: The delay between submitting a transaction and block inclusion leaves room for price drift.

For constant-product pools, the price impact of a swap is governed by:

$$
\Delta P \approx \frac{\Delta x}{x + \Delta x}
$$

where \(x\) is the starting reserve of the token being sold and \(\Delta x\) is the trade size. Larger trades relative to pool reserves cause greater price movement and slippage.

### Example

If a pool holds 1,000 tokens of asset X and a trader sells \(\Delta x = 50\) X into the pool, the expected price impact is:

$$
\Delta P \approx \frac{50}{1{,}000 + 50} \approx 4.76\%
$$

The execution price will be roughly 4.76% worse than the pre-trade quote. Splitting the trade into smaller chunks (for example, two trades of 25 X) reduces the impact of each swap.

## Managing Slippage

Developers should expose controls that let users tailor their tolerance:

- **Slippage tolerance**: Allow users to set the maximum acceptable deviation (e.g., 0.5%). Transactions revert if the execution price exceeds this threshold.
- **Real-time quotes**: Refresh quotes with each user interaction so expectations stay accurate.
- **Trade splitting**: Break large orders into smaller chunks to reduce price impact on shallow pools.
- **Faster execution**: Encourage higher gas or priority fees so transactions confirm quickly during volatile periods.

## Detecting High Slippage

Monitoring tools help flag risky trades:

- Compare quoted vs. executed amounts to calculate realized slippage and surface warnings when it exceeds predefined limits.
- Track pool liquidity and recent trade sizes to detect thinning depth that may cause future slippage spikes.
- Use alerts when swap volume surges or the pool experiences rapid reserve changes, indicating heightened volatility.

Want to see how Euclid’s architecture reduces price impact? Read about our [Automated Market Makers](../../../Architecture%20Overview/Automated-Market-Makers.md)
