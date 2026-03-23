---
sidebar_position: 7
---
import Tabs from '@site/src/components/Tabs';

# Track Swap Transaction

Checks the current status of a cross-chain swap by providing the tx_hash and the chain it was submitted on.


### Request URL

**Method:** `POST`

```bash
https://api.euclidprotocol.com/api/v1/txn/track/swap
```


### Examples

<Tabs
  tabs={[
    {
      id: 'evm-track-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://api.euclidprotocol.com/api/v1/txn/track/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "chain": "ethereum",
    "tx_hash": "0x31604586b4844a82eb07116abccde69073d73fe8d9a364bda92d552588bfcff9"
}'`
    },
    {
      id: 'evm-track-response',
      label: 'EVM Response',
      language: 'json',
      content: `{
  "response": {
    "is_completed": true,
    "is_release": false,
    "tx_hash": "0x31604586b4844a82eb07116abccde69073d73fe8d9a364bda92d552588bfcff9",
    "asset_in_type": "native",
    "type": "swap",
    "destination_chain_uid": [
      "bsc"
    ],
    "destination_token_id": "bnb",
    "source_token_id": "eth",
    "tx_status": "success",
    "tx_id": "ethereum:0x05b03301b2bc9fa54fe3b81d5a32af55c9210c68:1:24694125:391",
    "sequence": "391",
    "source_chain_uid": "ethereum",
    "source_chain_id": "1",
    "source_factory": "0x08e6604931e9c2a978d4861b912f7894cc6063f7",
    "sender": "0x05b03301b2bc9fa54fe3b81d5a32af55c9210c68",
    "total_duration": "9s",
    "total_estimated_duration": "4.2s",
    "swap_status": [
      {
        "type": "dex",
        "dex": "euclid",
        "is_ibc": true,
        "route": [
          "eth",
          "usdc",
          "usdt",
          "bnb"
        ],
        "amount_in": "7500000000000000",
        "asset_in": "eth",
        "asset_out": "bnb",
        "expected_amount_out": "24132227223352383",
        "amount_out": "24380841329206352",
        "from_dex": "euclid"
      },
      {
        "type": "release",
        "is_ibc": true,
        "from_chain_uid": "ethereum",
        "to_chain_uid": "bsc",
        "token_id": "bnb",
        "expected_amount_out": "24380841329206352",
        "amount_out": "24380841329206352",
        "to_address": "0x05b03301b2bc9fa54fe3b81d5a32af55c9210c68",
        "release_tx_hash": "66378BEDC0AE9DCF9DF33361E685C040BC38B8F66230E7000EE9A4AB94A0F84F"
      }
    ]
  }
}`
    },
    {
      id: 'cosmos-track-request',
      label: 'Cosmos Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://api.euclidprotocol.com/api/v1/txn/track/swap' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "chain": "injective",
    "tx_hash": "5EAD65EA75268FBDD5D89925814B71270FE7D584D32B94BFEDAC30D3635F65F1"
}'`
    },
    {
      id: 'cosmos-track-response',
      label: 'Cosmos Response',
      language: 'json',
      content: `{
  "response": {
    "is_completed": true,
    "tx_hash": "5EAD65EA75268FBDD5D89925814B71270FE7D584D32B94BFEDAC30D3635F65F1",
    "asset_in_type": "native",
    "type": "swap",
    "destination_chain_uid": [
      "sepolia"
    ],
    "destination_token_id": "eth",
    "source_token_id": "inj",
    "tx_status": "success",
    "tx_id": "injective:inj16vxyh59lcxxdrvanve8x8r8svg3lrg83hpvwgq:injective-888:113675877:0:30860",
    "voucher_minted": {
      "token": "eth",
      "amount": "19758481210609000",
      "chain_uid": "injective"
    },
    "sequence": "30859",
    "source_chain_uid": "injective",
    "source_chain_id": "injective-888",
    "source_factory": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q",
    "sender": "inj16vxyh59lcxxdrvanve8x8r8svg3lrg83hpvwgq",
    "total_duration": "38s",
    "total_estimated_duration": "52.2s",
    "swap_status": [
      {
        "type": "dex",
        "dex": "euclid",
        "is_ibc": true,
        "route": [
          "inj",
          "euclid",
          "eth"
        ],
        "amount_in": "51308999999999998689280",
        "status": {
          "chain_uid": "injective",
          "status": "success",
          "msg": "ok",
          "timestamp": "2026-02-17 11:50:23.541 +0000 UTC",
          "tx_hash": "5EAD65EA75268FBDD5D89925814B71270FE7D584D32B94BFEDAC30D3635F65F1",
          "duration": "31.525s",
          "estimated_duration": "33.095s"
        },
        "ibc_status": {
          "send_packet": {
            "chain_uid": "injective",
            "status": "success",
            "msg": "ok",
            "timestamp": "2026-02-17 11:50:23.541 +0000 UTC",
            "tx_hash": "5EAD65EA75268FBDD5D89925814B71270FE7D584D32B94BFEDAC30D3635F65F1"
          },
          "recv_packet": {
            "chain_uid": "vsl",
            "status": "success",
            "msg": "ok",
            "timestamp": "2026-02-17 11:50:48.928 +0000 UTC",
            "tx_hash": "0CF3A9D2E394946F2DA2CF3FBE17599F42D17BB2784A643EC654F7C2BF8E4811"
          },
          "ack_status": {
            "chain_uid": "injective",
            "status": "success",
            "msg": "success",
            "timestamp": "2026-02-17 11:50:55.066 +0000 UTC",
            "tx_hash": "9119FDD781D5A5AE6D3C3120FB124D98D51F8B9DD2A8AA1AB574EFA367A32136"
          }
        },
        "asset_in": "inj",
        "asset_out": "eth",
        "expected_amount_out": "110410239717975232",
        "amount_out": "110410239717975224",
        "from_dex": "euclid"
      },
      {
        "type": "release",
        "is_ibc": true,
        "from_chain_uid": "injective",
        "to_chain_uid": "sepolia",
        "status": {
          "chain_uid": "sepolia",
          "status": "success",
          "msg": "success",
          "timestamp": "2026-02-17 11:51:02.2 +0000 UTC",
          "tx_hash": "0xbcbf735213cab2497ed20a23e7cff345c206ba4cdd20d35e354c7f0493a8d863",
          "duration": "17.908s",
          "estimated_duration": "19.12s"
        },
        "ibc_status": {
          "send_packet": {
            "chain_uid": "vsl",
            "status": "success",
            "msg": "released",
            "timestamp": "2026-02-17 11:50:48.928 +0000 UTC",
            "tx_hash": "0CF3A9D2E394946F2DA2CF3FBE17599F42D17BB2784A643EC654F7C2BF8E4811"
          },
          "recv_packet": {
            "chain_uid": "sepolia",
            "status": "success",
            "msg": "0x",
            "timestamp": "2026-02-17 11:51:02.2 +0000 UTC",
            "tx_hash": "0xbcbf735213cab2497ed20a23e7cff345c206ba4cdd20d35e354c7f0493a8d863"
          },
          "ack_status": {
            "chain_uid": "vsl",
            "status": "success",
            "msg": "Success",
            "timestamp": "2026-02-17 11:51:06.836 +0000 UTC",
            "tx_hash": "B5AE860C00B777139E79FD50862793B6AEBBBFECC32D50C3A564450A3040CD28"
          }
        },
        "token_id": "eth",
        "expected_amount_out": "90651758507366224",
        "amount_out": "90651758507366224",
        "from_dex": "euclid",
        "to_address": "0xd30c4bd0bfc18cd1b3b3664e638cf06223f1a0f1",
        "release_tx_hash": "0CF3A9D2E394946F2DA2CF3FBE17599F42D17BB2784A643EC654F7C2BF8E4811",
        "escrow_release_status": {
          "is_completed": true,
          "tx_id": "injective:inj16vxyh59lcxxdrvanve8x8r8svg3lrg83hpvwgq:neuron-1:27988510:0:11660679",
          "type": "EscrowRelease",
          "tx_status": "success",
          "tx_hash": "0CF3A9D2E394946F2DA2CF3FBE17599F42D17BB2784A643EC654F7C2BF8E4811",
          "sequence": "215975",
          "source_chain_uid": "sepolia",
          "source_chain_id": "11155111",
          "source_factory": "0x7cb512008ecd844fcab522d1f8683aa6a8dd075b",
          "status": [
            {
              "chain_uid": "vsl",
              "status": "success",
              "msg": "released",
              "timestamp": "2026-02-17 11:50:48.928 +0000 UTC",
              "tx_hash": "0CF3A9D2E394946F2DA2CF3FBE17599F42D17BB2784A643EC654F7C2BF8E4811"
            },
            {
              "chain_uid": "sepolia",
              "status": "success",
              "msg": "0x",
              "timestamp": "2026-02-17 11:51:02.2 +0000 UTC",
              "tx_hash": "0xbcbf735213cab2497ed20a23e7cff345c206ba4cdd20d35e354c7f0493a8d863"
            },
            {
              "chain_uid": "vsl",
              "status": "success",
              "msg": "Success",
              "timestamp": "2026-02-17 11:51:06.836 +0000 UTC",
              "tx_hash": "B5AE860C00B777139E79FD50862793B6AEBBBFECC32D50C3A564450A3040CD28"
            }
          ],
          "escrow_response": {
            "tx_id": "injective:inj16vxyh59lcxxdrvanve8x8r8svg3lrg83hpvwgq:injective-888:113675877:0:30860",
            "amount": "90651758507366224",
            "token": "eth",
            "to_address": "0xd30c4bd0bfc18cd1b3b3664e638cf06223f1a0f1",
            "chain_uid": "sepolia"
          }
        }
      }
    ]
  }
}`
    }
  ]}
/>


### Parameters

| **Field**   | **Type**   | **Description**                                                                    |
|-------------|------------|------------------------------------------------------------------------------------|
| `chain`     | `string`   | Chain UID where the original transaction was submitted (e.g. `injective`, `ronin`) |
| `tx_hash`   | `string`   | The hash of the swap transaction being tracked.                                    |
