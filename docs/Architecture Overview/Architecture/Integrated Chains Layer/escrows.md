---
sidebar_position: 2
description: "Learn About Euclid's escrows"
---
# Escrows 


The Escrow smart contract is a simple contract that holds one type of token. Each integrated chain will have these escrows deployed, holding the liquidity for the tokens. Whenever a swap is successful, the factory contract of the chain will forward a message from the router to the escrow requesting a release of tokens to the user who initiated the swap. 

The Escrow has a line of communication with the Virtual Pool (through the Factory and Router) that allows for messaging to move tokens when appropriate. Whenever a user sends out a token A to be swapped for a token B, one of two cases occurs:

:::tip
- Each Escrow holds only one type of token.
:::

- If a transaction is successful, an Escrow successfully stores the A tokens, and the B tokens are released to the user by another escrow.

- If a transaction fails (high slippage) or is timed out, the A tokens are returned back to the user. 

:::tip
- Euclid allows its users to specify which chains to release the funds on with the respective amount for each chain. This means that the Escrow releasing the tokens could be on any integrated chain

- We will dive deeper into each of the Escrow's messages in the [Escrow Smart Contract](../../../Euclid%20Smart%20Contracts/CosmWasm/Escrow.md) section.

:::

 ![Factory Architecture](../../../../static/img/escrow-1.jpg)