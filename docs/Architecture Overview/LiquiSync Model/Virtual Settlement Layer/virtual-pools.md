---
sidebar_position: 2
description: "Learn About Euclid's Virtual Pools"
---

# Virtual Pools

## Introduction

Euclid **Virtual Pools** are responsible of keeping track and settling transactions across the Euclid ecosystem for a certain token pair. Any token pair across the entire ecosystem will have to settle its transaction in that pool for the swap to be considered final.

Virtual Pools _solely_ exist on the **Virtual Settlement Layer** and never hold any tokens but rather keep track of all existing tokens for the token pair in the Euclid ecosystem. These virtual pools allow to unify the liquidity across the blockchain without actually having to bridge or move the tokens from one chain to another. This ensures that liquidity remains _decentralized_ and _modular_.

:::note
Change to new diagram when done
:::

## Workflow

:::tip
We will dive deeper into each of the contract's messages and queries in the [Euclid Smart Contracts](../../../Euclid%20Protocol/euclid-smart-contracts.md) section.
:::

The following diagram illustrates the interaction between the VLP and the rest of the Euclid system.
![Euclid Virtual Pools](../../../../static/img/virtual-pools.png)

## Guaranteed Finality

Since Virtual Pools exist on a Virtual Settlement Layer, all transactions performed are finalized and committed to a blockchain before being relayed back to any pool on the chain, ensuring that any change is finalized in sequence before another transaction is committed to avoid any double spending or similar exploits.
