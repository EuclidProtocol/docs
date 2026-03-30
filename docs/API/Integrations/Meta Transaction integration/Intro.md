---
sidebar_label: Overview
id: meta-tx-integration-overview
---

# Gasless Voucher Integration Overview

This guide shows how to integrate Euclid Meta Transactions end to end:

1. Generate transaction message (`/execute/meta-txn/swap`, `/transfer`, or `/withdraw`)
2. Build meta-transaction payload (`/execute/meta-txn/sign`)
3. Sign payload (wallet or backend signer)
4. Broadcast signed payload (`/execute/meta-txn/broadcast`)

## What This Flow Solves

- Users sign off-chain.
- A relayer submits on-chain.
- You can support both Cosmos and EVM signers with one API flow.

## Step-by-Step

1. [Step 1 — Generate Message](./1-Generate%20Message.md)
2. [Step 2 — Build Payload](./2-Build%20Payload.md)
3. [Step 3 — Sign Payload](./3-Sign%20Payload.md)
4. [Step 4 — Broadcast](./4-Broadcast.md)

## Prerequisites

- Access to Euclid API.
- A signer (wallet or backend key management).
- Ability to persist short-lived payload data (`nonce`, `expiry`, `types`, `meta`).
