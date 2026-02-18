---
sidebar_label: Broadcast
id: broadcast
---

# Step 3 — Broadcast the Transaction

Broadcast the transaction payload returned in Step 2 using chain-native signing tooling.

## Endpoint guidance

There is no single REST endpoint for standard swap broadcast. Use returned `msgs` with your chain stack:

- EVM: sign and send transactions with your EVM provider/wallet.
- Cosmos: sign and broadcast messages with Cosmos SDK tooling.

If you use Euclid meta transactions, see:

- [Meta Transactions — Sign](/docs/API/API%20Reference/REST/Transactions/Meta%20Transactions/Sign)
- [Meta Transactions — Broadcast](/docs/API/API%20Reference/REST/Transactions/Meta%20Transactions/Broadcast)

## Minimal execution flow

- EVM: sign/send each item in `msgs` (`to`, `data`, `value`).
- Cosmos: broadcast the returned contract messages with your signer.

## Required data to persist

- Source-chain transaction hash(es).
- Sender address and source chain UID.
- Execution timestamp for timeout/retry policy.

Next step: [Track Execution](./track-execution).
