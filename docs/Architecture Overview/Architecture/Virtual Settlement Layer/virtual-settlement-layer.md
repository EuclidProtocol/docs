---
sidebar_position: 1
description: "Learn About Euclid's Virtual Settlement Layer (VSL)"
---

# Overview

A Virtual Settlement Layer (VSL) serves as the backbone of the Euclid system, responsible for settling all transactions securely and efficiently. To fulfill this crucial role, a VSL requires the following components and characteristics:

###  State Machine 

The VSL is required to be a **state machine**, which is a system that can be in a finite number of states. Every transaction processed by Euclid needs to be finalized, and needs to trigger a transition to a new state in order to ensure sequencing of trades in a certain pool.

A blockchain ensures that all nodes validate a transaction and its validity before committing to a new state.

###  Instant Finality

Euclid requires a VSL that offers **instant finality**. Instant finality is when a state transition is complete (block is committed), and the state is immediately considered final (unlike blockchains like Bitcoin and Ethereum that have waiting periods and confirmations). This ensures that Euclid can guarantee fast transactions, as well as minimizes the risks associated with transaction rollbacks.

### Scalability 

Since Euclid's VSL would process and settle transactions for numerous Euclid integrated blockchains, which will grow with time, the VSL needs to be able to process a high number of transactions per second while maintaining security and decentralization. 

### Security

Although Euclid puts all the required checks and security barriers in place to ensure the security of the system, a secure VSL ensures that the Euclid system operates without any downtime. The VSL needs to be able to protect itself from any 51% attack, double-spending, and various other forms of exploits.

### Interoperability

Euclid requires a VSL that is able to connect efficiently with the Euclid Messaging Protocol. This is crucial to be able to facilitate cross-chain messaging from different ecosystems.

## VSL Components
 ![Factory Architecture](../../../../static/img/VSL.png)

The VSL is composed of two main parts:

- [Virtual Liquidity Pools (VLP)](../Virtual%20Settlement%20Layer/virtual-pools.md): The VSL is responsible for performing all calculations related to swaps for its token pair.
- [Virtual Balances](../Virtual%20Settlement%20Layer/virtual-balances.md): Virtual Balance keeps track of all the balances of users and VLPs making sure nothing is ever lost.