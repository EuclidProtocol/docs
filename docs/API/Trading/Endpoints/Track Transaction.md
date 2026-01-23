---
sidebar_position: 5
title: "Track a Transaction"
description: "Learn how to track the progress of a transaction across multiple chains using the Euclid API."
---
import Tabs from '@site/src/components/Tabs';

# Track a Transaction

Once you've implemented your swap or liquidity logic, tracking becomes a critical part of your application’s reliability. A transaction might span across several chains, go through multiple steps, or result in assets being routed to different destinations.

In Euclid, swaps can involve multiple hops, intermediate vouchers, or even distribute funds across different chains. If one part fails (like a release or mintin vouchers on a chain) it’s important to know exactly where and why. Tracking ensures you’re always in sync with what’s happening behind the scenes.

The Euclid API provides **two REST endpoints** for tracking:

## 1. Track a Swap Transaction

Use this endpoint to track **swap flows** across the protocol. It will return the full state of the swap including IBC hops, estimated durations, release states, and status updates. Continue polling this endpoint until `is_completed` becomes `true`.

### Endpoint

```
POST /api/v1/txn/track/swap
```

### Required Fields

- `chain`: The **origin chain** (where the swap was initiated)
- `tx_hash`: The transaction hash of the original swap request

### Example Request

```bash
curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/txn/track/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "chain": "ronin",
    "tx_hash": "0x7f78069e33c6d288448bc95219e116f77bc26c8378ba017b5bf6ddf1c5c6d21c"
}'
```

<Tabs tabs={[
  {
    id: 'track-swap-response',
    label: 'Response',
    language: 'json',
    content: `
{
  "response": {
    "is_completed": true,
    "tx_hash": "0x7f78069e33c6d288448bc95219e116f77bc26c8378ba017b5bf6ddf1c5c6d21c",
    "asset_in_type": "smart",
    "type": "swap",
    "destination_chain_uid": ["bsc"],
    "destination_token_id": "bnb",
    "source_token_id": "euclid",
    "tx_status": "success",
    "tx_id": "ronin:0x887e4aac216674d2c432798f851c1ea5d505b2e1:2021:42264661:608732",
    "voucher_minted": {
      "token": "bnb",
      "amount": "0",
      "chain_uid": "ronin"
    },
    "sender": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "swap_status": [
      {
        "type": "dex",
        "dex": "euclid",
        "is_ibc": true,
        "route": ["euclid", "bnb"],
        "amount_in": "4000000",
        "status": {
          "chain_uid": "ronin",
          "status": "success",
          "timestamp": "2025-10-15 15:59:09.166 +0000 UTC"
        },
        "ibc_status": {
          "send_packet": { "status": "success" },
          "recv_packet": { "status": "success" },
          "ack_status": { "status": "pending" }
        }
      },
      {
        "type": "release",
        "status": {
          "chain_uid": "bsc",
          "status": "success",
          "timestamp": "2025-10-15 15:59:18.033 +0000 UTC"
        }
      }
    ]
  }
}
`
  }
]} />


## 2. Track Other Transaction Types

Use this endpoint to track non-swap operations such as:

- Add liquidity
- Remove liquidity
- Create a pool
- Withdraw, deposit, or transfer vouchers

### Endpoint

```
POST /api/v1/txn/track
```

### Required Fields

- `chain`: The **origin chain** (where the action was initiated)
- `tx_hash`: The transaction hash of the original action

### Example Request

```bash
curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/txn/track' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "chain": "ronin",
    "tx_hash": "0xaa9bbb2fbd0d9b26436065d16102e6eb09c6b4b78f9b11dbffcc7849b53b9c38"
}'
```

<Tabs tabs={[
  {
    id: 'track-generic-response',
    label: 'Response',
    language: 'json',
    content: `
{
  "response": {
    "is_completed": true,
    "type": "withdraw_voucher",
    "tx_hash": "0xaa9bbb2fbd0d9b26436065d16102e6eb09c6b4b78f9b11dbffcc7849b53b9c38",
    "tx_status": "success",
    "voucher_burned": {
      "token": "bnb",
      "amount": "160000000000000000",
      "chain_uid": "ronin"
    },
    "escrow_release_status": {
      "type": "EscrowRelease",
      "tx_status": "success",
      "tx_hash": "0x2fcd9cf116b8b63c7b1b7c90cc1e9651ea5145b173315f38a3ff7bdbd0ae14cf",
      "source_chain_uid": "bsc",
      "to_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
      "status": [
        {
          "chain_uid": "bsc",
          "status": "success",
          "msg": "0x",
          "timestamp": "2025-10-15 18:12:42.133 +0000 UTC"
        }
      ]
    }
  }
}
`
  }
]} />

## Tips

- Use `is_completed` to determine if the full transaction flow has finalized.
- Swaps may generate intermediate states like voucher mints, burns, or releases. Tracking helps expose these internal events.
- You may poll these endpoints periodically (e.g., every few seconds) until `tx_status` becomes `"success"` or an error state is returned.
