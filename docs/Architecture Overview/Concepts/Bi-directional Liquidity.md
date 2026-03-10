---
sidebar_position: 6
description: "How Euclid combines orderbooks and AMMs into one liquidity layer."
---

# Bi-directional Liquidity

Bi-directional liquidity is Euclid's view that modern markets work best when **orderbooks** and **AMMs** exist on the same settlement layer instead of competing as isolated models.

There is a common market narrative that one model should replace the other. In practice, they solve different problems:
- orderbooks excel at price discovery, tight spreads, and high-frequency quoting
- AMMs excel at permissionless access, unconditional depth, and long-tail asset coverage

Euclid is designed to let both coexist inside the same liquidity layer, so trading flow and price information can move between them with minimal friction.

## Why Both Liquidity Models Matter

An orderbook is strongest when a market has active quoting and enough participants to continually update prices. It is the natural venue for:
- tight spreads
- active market making
- high-frequency quote refresh
- efficient price formation

An AMM is strongest when liquidity needs to remain available regardless of whether a market maker is actively quoting. It is the natural venue for:
- permissionless liquidity provision
- long-tail assets
- continuous quotability at many sizes
- guaranteed access to a trade path as long as liquidity exists in the pool

Euclid's architecture is built around the idea that these are complementary, not mutually exclusive.

## Orderbooks as the Price Discovery Layer

In Euclid Prime, the orderbook acts as the **price discovery layer**.

Market makers can quote the market tightly and refresh those quotes at high frequency, which makes the orderbook the most efficient place to form a live market price. This is especially valuable for assets with active participation and professional liquidity providers.

The limitation of an orderbook is not price formation, but coverage:
- not every asset will always have deep resting liquidity
- not every market will always have quoting at all sizes
- long-tail assets may not attract continuous market making

That is why an orderbook alone is not enough to serve every market condition.

For the developer-facing Orderbook docs, see [Orderbook Overview](../../orderbook/overview.md).

## AMMs as the Always-Available Liquidity Layer

AMMs provide the opposite strength profile.

They do not depend on a market maker deciding to quote a pair at a given moment. As long as liquidity providers have funded a pool, an AMM can return a price and execute a trade. That makes AMMs especially effective for:
- long-tail assets
- lower-frequency trading
- passive liquidity provisioning
- markets where constant availability matters more than ultra-tight quoting

This is why AMMs remain essential even when an orderbook exists.

For background on AMM mechanics, see [Automated Market Makers](../Automated-Market-Makers.md).

## Why Combining Them Creates Better Markets

When orderbook liquidity and AMM liquidity live on the same settlement layer, the cost of information transfer and trade routing between them becomes close to zero.

That matters because:
- orderbook pricing can inform AMM rebalancing faster
- AMM depth can support markets where orderbook depth is thinner
- both active and passive liquidity can contribute to the same broader market

In that design, the market no longer has to choose between:
- best price discovery
- deepest permissionless liquidity

Instead, it can benefit from both.

Euclid's goal is to make these liquidity models exist in the same information equilibrium, where each improves the other instead of fragmenting the market.

## Why This Matters for Liquidity Providers

Bi-directional liquidity is also important for LPs because it changes the environment around AMM liquidity.

One of the biggest risks in AMMs is **impermanent loss (IL)**. This happens when price moves force LP positions into increasingly adverse inventory compositions. In practice, this risk becomes worse when AMMs receive a high share of toxic or purely opportunistic flow.

When the orderbook acts as the first layer for high-frequency price discovery and trade absorption:
- more price adjustment can happen in the tighter, quoted market first
- AMM liquidity can be used more selectively as deeper or always-available liquidity
- LPs may face a healthier flow mix than on isolated AMMs

The design objective is not to eliminate IL entirely, but to reduce the conditions that make passive liquidity consistently adverse.

## Stochastic RFQ

This same liquidity layer can also be exposed through an RFQ model.

With Stochastic RFQ, Euclid can distribute quotes from its liquidity layer directly to aggregators, intent systems, and RFQ providers. The advantage of doing this on top of Euclid's own liquidity stack is that quoted liquidity can be supported by the same market-making and liquidity infrastructure that powers the orderbook and AMM layer.

At a high level, this creates:
- tighter routing opportunities for external venues
- better quote coverage across networks
- a cleaner path for external order flow into Euclid liquidity

## Source of Truth for Market Access

When orderbooks and AMMs share the same settlement layer, Euclid becomes a strong candidate for market truth across decentralized liquidity.

That is because the same environment can combine:
- active market-maker pricing
- passive AMM liquidity
- unified settlement
- verifiable state commitments

This makes the liquidity layer useful not only for onchain applications, but also for venues and integrators that need accountable and transparent access to market pricing and depth.

## Read Next

- [General Overview](../General Overview.md)
- [Liquidity Consensus Layer](./Liquidity Consensus Layer.md)
- [Automated Market Makers](../Automated-Market-Makers.md)
- [Orderbook Overview](../../orderbook/overview.md)
