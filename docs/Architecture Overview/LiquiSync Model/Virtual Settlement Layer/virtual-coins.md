---
sidebar_position: 4
description: "Learn About Euclid's Virtual Coins"
---

# Virtual Coins

## Introduction

Euclid's Virtual Coins are, as the name suggests, virtual tokens that are minted to mimick 1/1 the balances of users and VLPs. They are a unique concept created by Euclid and play a cruical part in the LiquiSync model for the following reasons:

- **Global State Sync:** The total balances for the users and the VLPs for these virtual tokens needs to be exactly equal to the number of tokens calculated by the [Escrow Balance](../Virtual%20Settlement%20Layer/escrow-balance.md) contract which equals the number of tokens found in the escrows on the integrated chains. This ensures that the entire system is in sync and swaps are being performed correclty.

- **Flexible Swaps:** It is in Euclid's intention to allow users to swap using the virtual tokens which is faster and cheaper than performing an actual swap. Then the user can swap the virtual tokens to real ones on any chain whenever they see fit.

- **Security Failsafe:** In case any of the integrated chains suddenly crashes, or for some reason a swap is successfull in the VSL but the reply fails to reach the escrow to release the tokens, the user's balance will saved in the VCoin contract, and the user can decide to extract the tokens on another chain.

## Workflow

:::note
make sure if it mints or transfers from the other balance.
:::

:::tip
We will dive deeper into each of the contract's messages and queries in the [Euclid Smart Contracts](../../../Euclid%20Protocol/euclid-smart-contracts.md) section.
:::

Whenever a user requests a swap for some token, the VCoin contract will mint the tokens for the user and add it to the balance:

:::note
add diagram
:::

Then when the swap is complete and the escrow has released the tokens to the user, the VCoin contract will receive a request to burn the tokens from the user's balance.
