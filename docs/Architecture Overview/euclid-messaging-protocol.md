---
sidebar_position: 5
description: "Learn about Euclid Inovative Messaging Protocol"
---

# Euclid Messaging Protocol (EMP)

The Euclid Messaging Protocol is a cross-chain messaging protocol that powers the entire Euclid layer. It allows for the communication of any pool with its respective **Virtual Pool**. EMP is designed from the ground up to support custom message relaying between the VSL and any blockchain ecosystem including EVM-based chains, Cosmos, Solana, and beyond. It provides a flexible and secure framework for transmitting messages, state, and transaction data.

## High Level Architecture

All messages transported through the Euclid Messaging Protocol are transported with special data packets that hold Euclid specific messages that can only be decrypted by the VSL and the respective chains in the Euclid system. These messages ensure that the Virtual Pools keep track of all activity across the ecosystem on Euclid Pools that emit a message whenever a transaction is performed on them. The message is sent to the Virtual Pool that then returns an **acknowledgment** of the message back to the pool with the results of the transaction settlement.

``` rust
pub enum AcknowledgementMsg<S> {
    Ok(S),
    Error(String),
}
```

The pool then finalizes its transaction by decrypting the **acknowledgement** and processing the transaction accordingly. 

## Relayers

Euclid's ability to unify liquidity across diverse blockchains hinges on reliable and secure communication between the Virtual Settlement Layer (VSL) and the integrated chains. This is where Euclid's network of dedicated relayers comes into play.

#### The Role of Relayers

Relayers are responsible for transmitting messages containing essential information between the VSL and the integrated chains. These messages include:
- **Trade requests:** When a user initiates a trade on a connected DEX, the relayers carry the request to the VSL for processing.
- **Trade execution instructions:** Once the VSL calculates the exchange rate and determines the trade execution details, relayers transmit these instructions back to the originating chain.
- **Liquidity updates:** Relayers constantly communicate changes in liquidity balances between the VSL and the individual chain pools, ensuring a consistent view of the unified liquidity across the ecosystem.

#### Euclid's Private Relayers
:::tip
The Euclid system **Only** requires one relayer between the VSL and each integrated chain. 
:::
Public relayers often contend with a high volume of packets bearing different messages and executions. Euclid addresses this by deploying private relayers tailored specifically to manage messages from the Euclid system, filtering out all other packets. These dedicated relayers will significantly enhance execution times compared to those offered by public relayers.
