---
sidebar_position: 4
---

# Euclid Messaging Protocol

The Euclid Messaging Protocol is a cross-chain messaging protocol that powers the entire Euclid ecosystem. It allow for the communication of any pool with its respective **Virtual Pool**. The Messaging Protocol is built on top of [IBC Protocol](https://www.ibcprotocol.dev/) and inherits most of its traits, which are explained below.

## High Level Architecture

All messages transported through the Euclid Messaging Protocol are transported with special data packets that hold Euclid specific messages that can only be decrypted by the VSL and the respective chains in the Euclid ecosystem. These messages ensure that the Virtual Pools keep track of all activity across the ecosystem on Euclid Pools that emit a message whenever a transaction is performed on it. The message is sent to the Virtual Pool that then returns an **acknowledgment** of the message back to the pool with the results of the transaction settlement.

The pool then finalizes its transaction by decrypting the **acknowledgment** and processing the transasction accordingly. 

## Relayers

Relayers are responsible for moving a message from a Euclid integrated chain and back.