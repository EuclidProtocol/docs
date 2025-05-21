---
sidebar_position: 2
description: "Get a General Introduction to Euclid's Architecture"
---

The **Unified Liquidity Layer** has three main components:

**A. Virtual Settlement Layer for Liquidity (VSL):** The VSL is responsible for consolidating all the virtual pools and performing the necessary calculations for swaps.

**B. Euclid Messaging Protocol (EMP):** The EMP is a custom messaging protocol designed to facilitate communication between the VSL and all blockchains integrated with Euclid. It supports message relaying across different ecosystems, including EVM chains, Cosmos-based chains, Solana, and more.

**C. Native Smart Contracts:** A set of smart contracts deployed on each integrated chain responsible for pool creation and communication with the Virtual Settlement Layer using EMP.

:::note
The bottom layer acts like a CPAMM pool but is in fact a series of escrows. We will dive deeper into it in later sections.
:::

![Euclid Architecture](../../static/img/arch-no-logo.png)

### Virtual Settlement Layer

To keep liquidity decentralized, Euclid unifies liquidity **virtually** in its **Virtual Settlement Layer**. Euclid's VSL ensures instant finality where all liquidity across the blockchain is tallied, computed, and settled. Euclid's VSL is capable of supporting over 40,000 transactions per second. 

For example, when a user initiates a swap from token Y to token X, the VSL simultaneously queries liquidity for that pair across all connected chains. It then calculates the optimal route and executes the trade as though it were interacting with one massive, aggregated liquidity pool, ensuring the best possible price and minimal slippage, all without requiring centralized custody or bridging.

### Virtual Pools

Virtual Pools are the main component of the VSL. Virtual Pools are pools that are responsible for tallying the liquidity for a certain token pair across the entire Euclid layer. They allow external systems to query and retrieve detailed information about the Virtual Pool, including token pair details, overall liquidity status, pending swaps and liquidity additions, and current token reserves.


### Guaranteed Finality

Our Messaging Protocol and Virtual Settlement Layer both guarantee instant finality of transactions across the entire blockchain, which ensures user funds will never be stuck in any smart contract on any blockchain.



### A Closer Look

At the core of Euclid’s architecture is communication and computation flow that enables secure, fast cross-chain interactions, whether it’s swapping tokens, adding liquidity, or querying balances. Here’s a step-by-step example of how a swap request is processed:

![Euclid Architecture](../../static/img/arch.png)

:::note
Euclid allows users to receive the tokens across multiple chains, specifying exactly how many to receive and on each. For example, a user can swap Token Y for Token X and receive the resulting X tokens distributed across 10 different chains in any split they choose. 
:::

	1.	**User Action:** A user initiates a request — for example, swapping Token Y for Token X.

	2.	**Factory Layer** : The request is received by the appropriate Factory on the user’s native chain (EVM or Cosmos etc..., depending on the origin).

	3.	**Cross-Chain Relay via EMP** : The Factory relays the request to the Router using the Euclid Messaging Protocol (EMP).

	4.	**Routing & Processing** : The Router receives the data and forwards it to the Virtual Settlement Layer (VSL).

	5.	**Settlement Calculation** : The VSL virtually computes the optimal execution for the request, querying balances and liquidity across all integrated chains as though they were one liquidity pool.

	6.	**Acknowledgment Path** : The result of the computation (e.g., how much Token X the user receives) is sent back to the Router, which then forwards it to the factory on the receiving chain (Chain where the user wants to receive the tokens).

	7.	**Escrow Execution**: The Factory triggers an action on the Escrow contract to release the funds to the user's specified destination address.





