---
sidebar_position: 2
description: "Learn About Euclid's escrows"
---
# Escrows 

## Introduction

The Escrow smart contract is a simple contract that holds one type of token. Each integrated chain will have these escrows deployed holding the liquidity for the tokens. Whenever a swap is successfull, the factory contract of the chain will forward a message from the router to the escrow requesting a release of tokens to the user who initiated the swap. 

## Workflow

:::tip
We will dive deeper into each of the contract's messages and queries in the [Euclid Smart Contracts](../../Euclid%20Protocol/euclid-pool.md) section.
:::

The following diagram illustrates the workflow of the escrow contract for a swap request:
:::tip
Euclid's algorithm ensures that releasing tokens is done in the most efficient way. This means that some swaps will see tokens released from different escrows from different chains and then sent back to the user's original chain. From the user's perspective, the transaction was completed like any ordinary swap.
:::

:::note
Add diagram
:::
