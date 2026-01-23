---
sidebar_position: 6
description: "Overview of how Euclid supports meta transactions for gasless user flows."
---

# Meta Transactions

Meta Transactions provide a quick and gasless method for cross-chain users to manage their voucher assets within Euclid Protocol.

## What is a Meta Transaction?
In the context of blockchain, a standard transaction requires the sender to pay for the gas fee, which is often paid in the network's native currency (e.g., ETH, MATIC). A Meta Transaction separates the creation of a transaction from the actual execution and payment of the gas fee.

In Euclid Protocol, a Meta Transaction allows users to sign a message that describes the desired action using vouchers (e.g., swap using voucher, transfer voucher asset or withdraw vouchers) without needing to hold or spend the native gas token. This also helps in Unifying multiple chains as signing doesn’t need chain related data, as long as you can prove ownership for your wallet.

## Key Benefits of Meta Transactions
The implementation of Meta Transactions in Euclid Protocol is primarily driven by the following benefits for cross-chain users:

1. **Gasless Operations:** Users do not need to spend the native currency of the destination chain for transaction fees. This significantly lowers the barrier to entry, especially for new cross-chain users. They can deposit a token once and continue interacting with the Euclid ecosystem without the hassle of managing different tokens for gas fees.
2. **Quick Management of Voucher Assets:** By removing the need to acquire gas tokens, the process for managing voucher assets (claiming, transferring, etc.) is streamlined and faster.
3. **Improved User Experience:** The process feels more like a traditional web application, abstracting away the complexity of blockchain gas fees and making the protocol more accessible.
4. **Faster Executing:** Meta transactions are verified and executed directly on the [VSL](../Architecture/Virtual%20Settlement%20Layer/virtual-settlement-layer.md) layer which is closest to the actual execution layer in euclid architecture making meta transactions faster than normal cross chain execution. This will help in High Frequency Trading and integrating euclid with traditional finance applications.

## How it Works (High-Level Flow)
The Meta Transaction flow involves three main parties: the User, the Relayer, and the Euclid Protocol Smart Contract.

1. **User Signs Message:** The user creates an intention (the desired transaction, e.g., "Transfer 10 VOUCHER to Person A") and cryptographically signs this message with their private key. Signing follows standards like [EIP-191](https://eips.ethereum.org/EIPS/eip-191) for EVM chains, and [ADR-036](https://github.com/cosmos/cosmos-sdk/blob/main/docs/architecture/adr-036-arbitrary-signature.md) for cosmos chains to make sure signing is secure.
2. **User Sends to Queue:** The signed message (the Meta Transaction) is sent to a Queue. The Queue is an off-chain entity responsible for paying the gas and submitting the transaction to the blockchain.
3. **Relayer Submits Transaction:** The Relayer wraps the signed message into a standard transaction, pays the gas fee, and sends it to the Euclid Protocol Smart Contract.
4. **Smart Contract Verification:** The Smart Contract verifies the user's signature to ensure the Meta Transaction is authentic and authorized by the user. If verified, the contract executes the user's intended action (e.g., transfers the voucher assets).

| **Role**               | **Responsibility**                                     |
|------------------------|--------------------------------------------------------|
| User                   | Signs the desired action (Meta Transaction)            |
| Queue                  | Pays the gas fee and submits the signed transaction    |
| Euclid Smart Contract  | Verifies the signature and executes the action         |

## Scope in Euclid Protocol
Meta Transactions are focused on simplifying the management of Voucher Assets for cross-chain functionality.

Actions that can be enabled by Meta Transactions include:

- Swap using Voucher
- Transfer Voucher
- Withdraw Voucher

