---
sidebar_position: 1
---

# Euclid Protocol Overview

Euclid is an open-source decentralized unified liquidity layer designed to allow any application to integrate into a unified source of truth.

Using smart contracts deployed on all integrated blockchains and the Euclid Messaging Protocol, Euclid allows developers to **permissionlessly** integrate with Euclid Unified Liquidity that spans across the entire blockchain to perform token swaps, add or remove liquidity from different available token pairs.

## Architecture

The **Unified Liquidity Layer** has three main components:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A. Native smart contracts deployed on all Euclid integrated blockchains.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B. Euclid Messaging Protocol

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C. A Virtual Settlement Layer for Liquidity (VSL)


![Euclid Architecture](../static/img/arch.jpg)

## Virtual Settlement Layer

To keep liquidity decentralized, Euclid unifies liquidity **virtually** in its Virtual Settlement Layer. Euclid's VLS is a layer-1 blockchain with instant finality where all liquidity across the blockchain is tallied, computed and settled. 

Euclid utilizies [Nibiru Chain](https://nibiru.fi/) as its VLS due to its DeFi focused approach, instant finality architecture, and optimized block space to support over 40,000 TPS (Transactions per Second). With Nibiru's goal of being the DeFi Hub of the blockchain,
and its extensive roadmap and integrations, it makes sense for Euclid's VLS to be on Nibiru.

### Virtual Pools

Virtual Pools are the main component of the VLS based on Cosmwasm Smart Contracts. Virtual Pools are pools that are responsible for tallying the liquidity for a certain token pair across the entire Euclid ecosystem. 

All liquidity across the blockchain is settled in the Virtual Pool which then sends results back to the Euclid pools across the ecosystem. 

## Euclid Messaging Protocol

The **Euclid Messaging Protocol** (EMP) is a cross-chain messaging protocol that is built on IBC (Inter-Blockchain Communication). Although IBC is mainly built for the Cosmos Ecosystem, our EMP extends IBC across the entire blockchain with integrations with Axelar, Skip Protocol, CCTP etc...

### Trustless Messaging

**EMP** allows guaranteed finality messaging between blockchains through decentralized [relayers](https://tutorials.cosmos.network/academy/2-cosmos-concepts/13-relayer-intro.html). Euclid's Relayers allow for trustless messaging between blockchain, since the relayers are built in a way that you only need to trust the blockchain and not the relayers themselves as they only relay a secured hash of the message. 

This ensures that exploits seen in other bridges can't occur through our messaging through sending malicious messages. 

### Guaranteed Finality

Our Messaging Protocol and Virtual Settlement Layer both guarantee instant finality of transactions across the entire blockchain which ensures user funds will never be stuck in any smart contract on any blockchain.