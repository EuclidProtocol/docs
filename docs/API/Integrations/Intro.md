---
sidebar_label: Overview
---

# Integrations Overview

This section is for teams integrating Euclid execution and routing into products and backend systems.

## Integration Types

You can integrate Euclid in different ways depending on your product:

- **Aggregators**: fetch routes, build execution payloads, and orchestrate execution/tracking.
- **Market Makers (MMs)**: integrate routing/execution to improve pricing and settlement coverage.
- **Trading Bots**: automate route selection, execution, and monitoring pipelines.
- **DEXs**: use Euclid as execution/routing infrastructure for cross-chain token flows.
- **Projects / Apps**: embed swap and settlement flows directly into product UX.

## Rate Limits

Euclid currently enforces a pending-request limit of **50 per address**.

- A pending request is any submitted request that has not reached a terminal result yet.
- When a request succeeds or fails, one slot is released back to that address.
- This means an address cannot have more than 50 pending requests at the same time.

If you need higher limits, [contact us](mailto:general@euclidswap.io) to request whitelisting.

## Start Here

:::note
Specialized step-by-step guides for additional integration types (MMs, trading bots, DEXs, and projects/apps) are coming soon. You can already integrate these today using the existing API and reference documentation; the guides are intended to provide a more opinionated, implementation-focused path.
:::

If you are building as an aggregator, start with: [Aggregator Integration Overview](./Aggregators/Intro.md).

If you are integrating gasless relay flows, start with: [Gasless Voucher Integration Overview](./Meta%20Transaction%20integration/Intro.md).

If you are deciding between direct execution and voucher-based UX, start with: [Integration Models Overview](./Integration%20Models/Intro.md).
