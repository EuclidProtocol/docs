---
sidebar_position: 1
---

# Intro

Meta Transactions let users sign intents off-chain while a relayer submits the signed payload on-chain. This enables gas abstraction and a smoother UX.

For a deeper overview, see [Meta Transactions concepts](/docs/Architecture%20Overview/Concepts/Meta%20Transactions).

## Supported Actions
- Swap using voucher balances
- Transfer voucher balances
- Withdraw voucher balances

## Meta Transaction Flow

The flow has 4 steps:
1. Generate transaction message
2. Build meta-transaction payload
3. Sign stringified payload
4. Broadcast signed transaction

```text
User
 │
 ├─ 1) Request meta call-data (swap/transfer/withdraw)
 ▼
 Euclid API
 │
 │ returns: { msg: { target, call_data }, type, ...meta }
 ▼
 Client
 │
 ├─ 2) Send msg into /execute/meta-txn/sign
 ▼
 Euclid API
 │
 │ returns: payload + evm_raw_payload + cosmos_raw_payload
 ▼
 Client
 │
 ├─ 3) Sign stringified payload
 ▼
 Client
 │
 ├─ 4) Broadcast signed payload to /execute/meta-txn/broadcast
 ▼
 Relayer
 │
 └─ Broadcasts transaction on-chain
```

## Notes
- Meta transaction endpoints are chain-agnostic in shape.
- Use your chain-specific values for `chain_uid`, addresses, and token identifiers.
- Signing depends on `signer_prefix` and `signer_chain_uid`.
