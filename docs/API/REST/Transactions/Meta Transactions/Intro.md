---
sidebar_position: 1
---

# Intro

Meta Transactions let users sign intents for voucher actions without paying gas. A relayer/queue submits the signed intent on-chain, and Euclid verifies the signature before executing the action. This makes cross-chain voucher operations fast and user-friendly, while keeping verification on-chain.

For a deeper overview, see [Meta Transactions concepts](../../../../Architecture%20Overview/Concepts/Meta%20Transactions.md).

## Supported Actions
- Swap using voucher balances
- Transfer voucher balances
- Withdraw voucher balances

## Chain Notes (Cosmos vs EVM)
Meta transaction payloads share the same structure across Cosmos and EVM. The primary differences are the values you provide (e.g., `chain_uid`, addresses, and token identifiers). If chain-specific rules apply to fields like `forwarding_message`, they will be documented here.
