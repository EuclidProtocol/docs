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
  'https://api.euclidprotocol.com/api/v1/txn/track/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "chain": "ethereum",
    "tx_hash": "0x31604586b4844a82eb07116abccde69073d73fe8d9a364bda92d552588bfcff9"
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
    "is_release": false,
    "tx_hash": "0x31604586b4844a82eb07116abccde69073d73fe8d9a364bda92d552588bfcff9",
    "asset_in_type": "native",
    "type": "swap",
    "destination_chain_uid": ["bsc"],
    "destination_token_id": "bnb",
    "source_token_id": "eth",
    "tx_status": "success",
    "tx_id": "ethereum:0x05b03301b2bc9fa54fe3b81d5a32af55c9210c68:1:24694125:391",
    "source_chain_uid": "ethereum",
    "source_chain_id": "1",
    "sender": "0x05b03301b2bc9fa54fe3b81d5a32af55c9210c68",
    "total_duration": "9s",
    "total_estimated_duration": "4.2s",
    "swap_status": [
      {
        "type": "dex",
        "route": ["eth", "usdc", "usdt", "bnb"],
        "amount_in": "7500000000000000",
        "asset_in": "eth",
        "asset_out": "bnb",
        "expected_amount_out": "24132227223352383",
        "amount_out": "24380841329206352"
      },
      {
        "type": "release",
        "from_chain_uid": "ethereum",
        "to_chain_uid": "bsc",
        "token_id": "bnb",
        "amount_out": "24380841329206352",
        "release_tx_hash": "66378BEDC0AE9DCF9DF33361E685C040BC38B8F66230E7000EE9A4AB94A0F84F"
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
  'https://api.euclidprotocol.com/api/v1/txn/track' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "chain": "polygon",
    "tx_hash": "0x49aa5637570c11fd33c19e62b03a62d09e8ec622e14019defb780d875d59fd63"
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
    "is_release": false,
    "tx_hash": "0x49aa5637570c11fd33c19e62b03a62d09e8ec622e14019defb780d875d59fd63",
    "asset_in_type": "",
    "type": "deposit_token",
    "tx_status": "success",
    "tx_id": "polygon:0x09851e1de798af7e1ad04a72a04b59f4e0009b05:137:84441196:2786",
    "sequence": "2786",
    "source_chain_uid": "polygon",
    "source_chain_id": "137",
    "sender": "0x09851e1de798af7e1ad04a72a04b59f4e0009b05",
    "total_duration": "11.831s",
    "status": [
      {
        "chain_uid": "polygon",
        "status": "success",
        "tx_hash": "0x49aa5637570c11fd33c19e62b03a62d09e8ec622e14019defb780d875d59fd63"
      },
      {
        "chain_uid": "vsl",
        "status": "success",
        "tx_hash": "831AD6D86EC2EFD710D304E9EFF00ACA81F611C6E0FD87F1907F1F95FF42AFA7"
      },
      {
        "chain_uid": "polygon",
        "status": "success",
        "tx_hash": "0xe99feebf0fddf414bd550bc5b1f391a62c902d7961eda96e78bae0e935149a58"
      }
    ],
    "deposit_token_response": {
      "token": "usdc",
      "amount": "255000000",
      "sender_address": "0x09851e1de798af7e1ad04a72a04b59f4e0009b05",
      "sender_chain_uid": "polygon",
      "recieve_address": "0x09851e1de798af7e1ad04a72a04b59f4e0009b05"
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
