---
sidebar_position: 10
title: "Risks and Impermanent Loss"
description: "Understand the key risks faced by liquidity providers, including impermanent loss."
---

# Risks and Impermanent Loss

Providing liquidity to automated market makers introduces both opportunities and risks. Before allocating capital, developers should understand how pool mechanics affect LP positions and what external factors can erode returns.

## Impermanent Loss

Impermanent loss (IL) occurs when the relative price of the pooled assets changes compared to when you deposited them. Automated pools rebalance inventory by selling the outperforming asset and buying the underperformer to maintain the constant product. If you withdrew immediately after a significant price swing, the value of your pool share would be lower than if you had simply held the tokens separately.

A simplified illustration using price ratio:

$$
r = \frac{P_{A,\text{new}}}{P_{A,\text{initial}}}
$$

$$ 
\text{Impermanent Loss}(r) = 2 \left( \frac{\sqrt{r}}{r + 1} \right) - 1 
$$

### Example

Consider an ETH/USDC pool where you initially deposit \$5,000 of ETH and \$5,000 of USDC. ETH subsequently drops 20%, so the price ratio becomes \(r = 0.8\).

1. Compute the loss factor:

   $$
   \text{IL}(0.8) = 2 \left( \frac{\sqrt{0.8}}{0.8 + 1} \right) - 1 \approx -0.62\%
   $$

2. Estimate the pool position relative to holding:

   $$
   \text{HODL Value} = 5{,}000 + 5{,}000 \times 0.8 = 9{,}000
   $$

   $$
   \text{Pool Value} \approx 9{,}000 \times (1 - 0.0062) \approx 8{,}944
   $$

If you had simply held the assets, the position would be worth \$9,000 (because ETH fell 20% while USDC stayed at \$5,000). The pool position is about \$56 lower at the moment of withdrawal due to impermanent loss. Continued fee accrual or a price recovery may offset this gap over time.

Key points:

- IL increases with volatility; extreme price moves widen the gap.
- Loss becomes “permanent” only when you withdraw. If prices revert, the difference shrinks.
- Accrued swap fees can offset IL, but high volatility can still outpace fee earnings.

## Market and Liquidity Risks

Beyond impermanent loss, LPs face other common AMM risks:

- **Low volume**: Pools with limited trading activity may generate insufficient fees to justify exposure.
- **Slippage and arbitrage**: Large trades or stale pricing can lead to arbitrageurs extracting value from the pool before it rebalances.
- **Systemic events**: Sudden market crashes can trigger correlated losses across tokens held in the pool.

## Mitigating Risk

Developers can help their users manage exposure by:

- Surfacing transparent metrics (volume, fees, volatility, incentive schedules).
- Warning when LP tokens are staked or locked elsewhere, as exiting may incur delays.
- Encouraging position sizing that matches the user’s risk tolerance.
- Providing educational content on IL and diversification strategies.

No AMM is risk-free. Setting expectations clearly and providing data-driven insights help users make informed decisions about providing liquidity.
