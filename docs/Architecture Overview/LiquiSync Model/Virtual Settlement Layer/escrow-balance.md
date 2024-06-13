---
sidebar_position: 3
description: "Learn About Euclid's Escrow balace smart contract"
---

# Escrow Balance

The Escrow Balance is a smart contract whose purpose is to keep track of all the balances of the different escrows deployed on the integrated chains. Although the VLP has information on the total balances for a certain token pair, it does not keep track of the location of these token balances. The Escrow Balance serves two main purposes:
:::note
based on what anshu said need clarification for the first point
:::

- Making sure that all the tokens in the escrows are locked.
- Making sure that the sum of all the tokens in the escrows is equal to the sum of the virtual tokens on the hub.

In case one of these conditions is not met, then there will be a mismatch of liquidity and the Escrow Balance will notify the system.

Each token is assigned a token_id which is a unique identifier for that token and is used by the Escrow balance to get the total amount of tokens from the escrows.

:::tip
A token Id refers to all variations of the same token including IBC versions. For example, token A and token ibc/A are grouped under the same token Id.  
:::

:::note
add diagram
:::

:::tip
We will dive deeper into each of the contract's messages and queries in the [Euclid Smart Contracts](../../../Euclid%20Protocol/euclid-smart-contracts.md) section.
:::
