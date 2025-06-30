---
sidebar_position: 1
description: "Learn about Euclid's Inovative Liquidity Consensus Layer"
---
import React from 'react';

# Liquidity Consesus Layer (LCL)

The **_Liquidity Settlement Layer_** (LCL) is a Tendermint Byzantine Fault Tolerant (BFT) consensus network purposely built to serve as a consensus layer for *liquidity states* across any ecosystem.

![Consensus Layer](../../../static/img/consensus-1.webp)
*High Level Transaction Lifecycle through Liquidity Consensus Layer (LCL)*

Its main functions are:

- Receive the target asset or trigger downstream actions on the target network securely.
- Prove settlement finality.

## Liquidity States and Simulation Engine

***Liquidity States*** represents a canonical, cryptographically verifiable representation of a state of an *economic condition* for one or a pool of assets. A single liquidity state can represent the state of a constant product automated market maker (AMM), a central limit order book (CLOB), balancer pools or any other arbitrary type of automated market makers. These states are stored on the programmable layer of the LCL. State changes to the Liquidity States can originate from any virtual machine or economic primitive as long as the input is encoded and verifiable.

The main advantage and offering of the **LCL** is that all the liquidity states co-exist under one settlement layer, which means that all of them can be accessed in one transaction route (i.e from USDC to ETH through a CPAMM then from ETH to BTC through a CLOB limit order). This is what true **unified liquidity** feels like that allows users, solvers and protocols on any network to interact with multiple liquidity sources and states in a single transaction, with all intermediate state changes instantly finalized and settled through the liquidity consensus layer.

If you take for example Uniswap, their different AMMs (v2 and v3) exist on different settlement layers and their liquidity is fragmented, even within the same network. This creates shallower liquidity, inefficient markets and a worse experience for users, traders and liquidity providers.

Liquidity States also natively exist beyond where the assets exist (on their native chain) meaning a transaction originating and ending on Solana can access liquidity that exists on Ethereum, Bitcoin, and Stellar all at the same time.

![Consensus Layer](../../../static/img/consensus-2.webp)
*Consensus Layer architecture*

<div style={{
  display: 'flex',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: '2rem',
  justifyContent: 'center'
}}>

  <div style={{ flex: '1 1 500px', minWidth: '300px' }}>
    <h3>Liquidity State Architecture</h3>
    <p>
      A <em>Liquidity State</em> is a liquidity primitive that consists of a mutable snapshot in the LCL state,
      state transition functions, and deterministic simulation with inputs and outputs that allow other liquidity states to trigger it (and be triggered).
    </p>
    <ul>
      <li>The mutable snapshot holds the state of the current liquidity which is 100% backed by assets which actually exists on native chains. It can consist of the state of one asset or multiple assets depending on the type of liquidity state.</li>
      <li>The state transition functions define how a certain action like trading one asset for another or adding or removing liquidity affects the mutable snapshot towards a new state. (i.e x*y=k for CPAMMs)</li>
      <li>Deterministic Simulation ensures that for a certain input I and state S, a certain output can be pre-verified and generated. This allows smart routing to find the best route across the entire LCL.</li>
      <li>Input and Output functions that accept a certain origin asset and releases one or more output assets depending on the state transition required.</li>
    </ul>
  </div>

  <div style={{
    flex: '0 1 500px',
    textAlign: 'center',
    minWidth: '300px'
  }}>
    <figure>
      <img 
        src="/img/consensus-3.webp" 
        alt="Liquidity State internal architecture Flow"
        style={{
          maxWidth: '100%',
          width: '100%',  /* force it to use available width */
          height: 'auto'
        }}
      />
      <figcaption style={{ fontSize: '0.9rem', color: '#888' }}>
        Liquidity State Internal Architecture Flow
      </figcaption>
    </figure>
  </div>

</div>

### Atomic Transactions

Since all liquidity states exist within the same consensus layer, either an entire transaction lifecycle is completed as part of a state transition in a new block or none. Which means that even if a certain transaction utilizes 100 liquidity states, if any of the swaps or trades fail, the entire transaction falls back and is refunded and the state is not changed. This architecture ensures that no two transactions can execute on the same state *S,* which means that double spending against any liquidity state is **impossible**.

### Simulation Engine

The LCL simulation engine is a programmable verification layer which allows to simulate a trade across different liquidity states in the LCL to ensure validity of a certain transaction before being committed to the layer.  Usually simulations exist within one architecture or liquidity state (a smart contract) to simulate one state transition operation (a swap on a CPAMM), but currently **a global simulation engine that extends beyond one type of liquidity state does not exist.**

The LCL simulation engine is able to reason and simulate a certain liquidity action across hundreds of different liquidity states in < 1 second.  This allows routers and solvers to build arbitrarily complex paths using multiple liquidity states and receive guaranteed validation before committing.

![Consensus Layer](../../../static/img/consensus-4.webp)
*Simulation Engine solves for a path of a subset of all available liquidity states for a pair (Input, Output)*

<br />

To understand better how a certain route is simulated with the simulation engine, we can define a route $R $ as a set of liquidity states $L$ which is as tuple $(S_n,f_n)$ where $S_n$ is the state of a certain liquidity state and $f_n$ is the state transition function. Therefore a route can be defined as:

```math
\mathcal{R} = \{ (S_1, f_1), (S_2, f_2), \ldots, (S_n, f_n) \}
```
## LCL Performance and Metrics

The LCL is built exclusively for handling liquidity transformations and actions (trades, adding liquidity, etc.), allowing it to process transactions far more efficiently than a general-purpose chain. This means transactions can be encoded with smaller sizes, packing more into a single block. Early phase testing shows **~3,000 transactions per block** with an average block time of **0.8 seconds (~3,750 txs/second)**.

### Maximum Load

While only ~3,750 transactions per second can be committed on-chain, the system can **process up to ~50,000 transactions per second** from different networks simultaneously. These transactions are added to the mempool, awaiting commitment.

### Future Work

We are working on adding mempool batching and a parallel optimistic execution architecture for transactions. This will allow fitting up to **~8,000 transactions per block** and reduce block times to **~300ms**. This is still a **work in progress (WIP).**
