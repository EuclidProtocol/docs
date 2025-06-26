---
sidebar_position: 3
description: "Learn about Euclid's Inovative Settlement Accounts"
---

**Global Settlement Accounts (GSAs)** are deterministic cryptographically linked accounts that allows one public key on any network to control and pay gas of accounts that exist on 50+ networks across the ecosystem. The GSAs are a novel decentralized primitive that allows users to interact with all chains and their protocols without worrying about gas fees, use any wallet or abstraction of choice and hold assets chain agnostically with one main wallet. 

## Architecture

At a high level, GSAs consist of: 

- **Master Controller Public Key:** The MCPK is any public key that a user can generate (from a wallet, Privy or backend generation…) that allows the control of the GSA across the different networks on the Euclid ecosystem.
- **Smart Wallets**: On every chain the user requires to interact with, a lightweight smart wallet is deterministically derived which is able to hold assets, execute transactions on smart contracts and send or receive assets. All smart wallets are controlled by the MCPK.

This architecture allows users to settle liquidity through the **Liquidity Consensus Layer (LCL)** without worrying of controlling multiple addresses, wallets and private keys among different virtual machines. Powered by the LCL, this architecture ensures smooth cross-chain trades and access to different assets and protocols from a single entry point without worrying about custody or security risks. 

The architecture is also built so that it does not require any more work or technical integrations from protocols and wallets building on top of Euclid to support. This ensures direct compatibility to any existing protocols.

![Settlement Accounts](../../../static/img/accounts-1.webp)

## Use Cases

GSAs unlock a number of different cross-chain use cases that currently are not possible. Most notably it allows to execute a transaction on any protocol from any network from a wallet or connection to a completely other network in the Euclid ecosystem. For example, a user on Solana can now place a prediction on Polymarket with SOL in his wallet directly.