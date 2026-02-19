---
sidebar_position: 7
---
import Tabs from '@site/src/components/Tabs';

# Track Swap Transaction

Checks the current status of a cross-chain swap by providing the tx_hash and the chain it was submitted on.


### Request URL
```bash
https://testnet.api.euclidprotocol.com/api/v1/txn/track/swap
```


### Examples

<Tabs
  tabs={[
    {
      id: 'evm-track-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/txn/track/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "chain": "base",
    "tx_hash": "0x5b21601301293885b2a828acc43b76f6335ec519a8fd4c2d3def1baa31196d1a"
}'`
    },
    {
      id: 'evm-track-response',
      label: 'EVM Response',
      language: 'json',
      content: `{
  "response": {
    "is_completed": true,
    "tx_hash": "0x5b21601301293885b2a828acc43b76f6335ec519a8fd4c2d3def1baa31196d1a",
    "asset_in_type": "native",
    "type": "swap",
    "destination_chain_uid": [
      "base"
    ],
    "destination_token_id": "0g",
    "source_token_id": "eth",
    "tx_status": "success",
    "tx_id": "base:0x91128e4d81e18e51f4d74b568f322360ffce263d:84532:37780457:3548734",
    "voucher_minted": {
      "token": "0g",
      "amount": "9275499864631325",
      "chain_uid": "base"
    },
    "sequence": "3548734",
    "source_chain_uid": "base",
    "source_chain_id": "84532",
    "source_factory": "0x00a739e4479c97289801654ec1a52a67077613c0",
    "sender": "0x91128e4d81e18e51f4d74b568f322360ffce263d",
    "total_duration": "9s",
    "total_estimated_duration": "4.7s",
    "swap_status": [
      {
        "type": "dex",
        "dex": "euclid",
        "is_ibc": true,
        "route": [
          "eth",
          "euclid",
          "0g"
        ],
        "amount_in": "10000000000000000",
        "status": {
          "chain_uid": "base",
          "status": "success",
          "msg": "success",
          "timestamp": "2026-02-17 11:53:23.114 +0000 UTC",
          "tx_hash": "0x5b21601301293885b2a828acc43b76f6335ec519a8fd4c2d3def1baa31196d1a",
          "duration": "13.918s",
          "estimated_duration": "0s"
        },
        "ibc_status": {
          "send_packet": {
            "chain_uid": "base",
            "status": "success",
            "msg": "success",
            "timestamp": "2026-02-17 11:53:23.114 +0000 UTC",
            "tx_hash": "0x5b21601301293885b2a828acc43b76f6335ec519a8fd4c2d3def1baa31196d1a",
            "duration": "0s"
          },
          "recv_packet": {
            "chain_uid": "vsl",
            "status": "success",
            "msg": "ok",
            "timestamp": "2026-02-17 11:53:32.328 +0000 UTC",
            "tx_hash": "54808CE1D78CE9D888829B6E2F3B08C613751E92652403116E5BD18A301E5753"
          },
          "ack_status": {
            "chain_uid": "base",
            "status": "success",
            "msg": "0x",
            "timestamp": "2026-02-17 11:53:37.032 +0000 UTC",
            "tx_hash": "0x0b9f19568a9eb8cc90c704465a4cb06e87617a2927b233ae860d0708964788d9"
          }
        },
        "asset_in": "eth",
        "asset_out": "0g",
        "expected_amount_out": "9275788963566520",
        "amount_out": "9275499864631325",
        "from_dex": "euclid"
      },
      {
        "type": "release",
        "is_ibc": true,
        "from_chain_uid": "base",
        "to_chain_uid": "base",
        "status": {
          "chain_uid": "base",
          "status": "success",
          "msg": "success",
          "timestamp": "2026-02-17 11:53:32.328 +0000 UTC",
          "tx_hash": "",
          "duration": "0s",
          "estimated_duration": "4.711s"
        },
        "ibc_status": {
          "send_packet": {
            "chain_uid": "vsl",
            "status": "success",
            "msg": "escrow not released",
            "timestamp": "2026-02-17 11:53:32.328 +0000 UTC",
            "tx_hash": "54808CE1D78CE9D888829B6E2F3B08C613751E92652403116E5BD18A301E5753"
          },
          "recv_packet": {
            "chain_uid": "base",
            "status": "pending",
            "msg": "Pending",
            "timestamp": "",
            "tx_hash": ""
          },
          "ack_status": {
            "chain_uid": "vsl",
            "status": "pending",
            "msg": "Pending",
            "timestamp": "",
            "tx_hash": ""
          }
        },
        "token_id": "0g",
        "expected_amount_out": "0",
        "from_dex": "euclid",
        "voucher_minted": {
          "token": "0g",
          "amount": "0",
          "chain_uid": "base"
        },
        "to_address": "0x91128e4d81e18e51f4d74b568f322360ffce263d",
        "release_tx_hash": "54808CE1D78CE9D888829B6E2F3B08C613751E92652403116E5BD18A301E5753",
        "escrow_release_status": {
          "is_completed": true,
          "tx_id": "",
          "type": "EscrowRelease",
          "tx_status": "success",
          "tx_hash": "54808CE1D78CE9D888829B6E2F3B08C613751E92652403116E5BD18A301E5753",
          "sequence": "",
          "source_chain_uid": "base",
          "source_chain_id": "84532",
          "source_factory": "0x00a739e4479c97289801654ec1a52a67077613c0",
          "status": [
            {
              "chain_uid": "vsl",
              "status": "success",
              "msg": "escrow not released",
              "timestamp": "2026-02-17 11:53:32.328 +0000 UTC",
              "tx_hash": "54808CE1D78CE9D888829B6E2F3B08C613751E92652403116E5BD18A301E5753"
            },
            {
              "chain_uid": "base",
              "status": "pending",
              "msg": "Pending",
              "timestamp": "",
              "tx_hash": ""
            },
            {
              "chain_uid": "vsl",
              "status": "pending",
              "msg": "Pending",
              "timestamp": "",
              "tx_hash": ""
            }
          ],
          "escrow_response": {
            "tx_id": "",
            "amount": "",
            "token": "",
            "to_address": "",
            "chain_uid": ""
          }
        }
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
  'https://testnet.api.euclidprotocol.com/api/v1/txn/track/swap' \\
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
