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


### CosmWasm

<Tabs
  tabs={[
    {
      id: 'cosmos-track-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/txn/track/swap' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "chain": "injective",
    "tx_hash": "C8FB20722A8A91A1C1E04323119C270D27D9DC07EF389594385EA6AD8E8A9532"
}'`
    },
    {
      id: 'cosmos-track-response',
      label: 'Response',
      language: 'json',
      content: `{
  "response": {
    "is_completed": true,
    "tx_hash": "C8FB20722A8A91A1C1E04323119C270D27D9DC07EF389594385EA6AD8E8A9532",
    "asset_in_type": "smart",
    "type": "swap",
    "destination_chain_uid": [
      "archway"
    ],
    "destination_token_id": "const",
    "source_token_id": "sp500",
    "tx_status": "success",
    "tx_id": "injective:inj1epptslyy5mlvr4m238v0z0954nf9m6lly7v7pu:injective-888:71576806:0:154",
    "voucher_minted": {
      "token": "const",
      "amount": "0",
      "chain_uid": "injective"
    },
    "sequence": "153",
    "source_chain_uid": "injective",
    "source_chain_id": "injective-888",
    "source_factory": "inj1sdmz25644p2nn2zse5ntrkw7cf6g7th0amtdpu",
    "sender": "inj1epptslyy5mlvr4m238v0z0954nf9m6lly7v7pu",
    "total_duration": "15s",
    "total_estimated_duration": "61.2s",
    "swap_status": [
      {
        "type": "dex",
        "dex": "euclid",
        "is_ibc": true,
        "route": [
          "sp500",
          "eth",
          "euclid",
          "const"
        ],
        "amount_in": "9150",
        "status": {
          "chain_uid": "injective",
          "status": "success",
          "msg": "ok",
          "timestamp": "2025-04-14 17:50:04.689 +0000 UTC",
          "tx_hash": "C8FB20722A8A91A1C1E04323119C270D27D9DC07EF389594385EA6AD8E8A9532",
          "duration": "68h28m9.741004712s",
          "estimated_duration": "29.5s"
        },
        "ibc_status": {
          "send_packet": {
            "chain_uid": "injective",
            "status": "success",
            "msg": "ok",
            "timestamp": "2025-04-14 17:50:04.689 +0000 UTC",
            "tx_hash": "C8FB20722A8A91A1C1E04323119C270D27D9DC07EF389594385EA6AD8E8A9532"
          },
          "recv_packet": {
            "chain_uid": "vsl",
            "status": "success",
            "msg": "ok",
            "timestamp": "2025-04-14 17:50:09.72 +0000 UTC",
            "tx_hash": "CB73293F1CC146CDCF44538F3BB0271DAEBBBFF70A5E1EE98E3C62F430DD2DC2"
          },
          "ack_status": {
            "chain_uid": "injective",
            "status": "success",
            "msg": "success",
            "timestamp": "2025-04-17 14:18:14.430004712 +0000 UTC",
            "tx_hash": "E08D081CCB0397F04C9DE0076BC6243A2E55A38E981DED527D5FC1F30CC5A6DC"
          }
        },
        "asset_in": "sp500",
        "asset_out": "const",
        "expected_amount_out": "263744561092478894080",
        "amount_out": "263751726599741477294",
        "from_dex": "euclid"
      },
      {
        "type": "release",
        "is_ibc": true,
        "from_chain_uid": "injective",
        "to_chain_uid": "archway",
        "status": {
          "chain_uid": "archway",
          "status": "success",
          "msg": "success",
          "timestamp": "2025-04-14 17:50:20.682 +0000 UTC",
          "tx_hash": "7C1E988B6688C8AC056BBB295B5F28AD517937406786F8A0C4330AF55C38CC62",
          "duration": "20.638s",
          "estimated_duration": "1m1.175s"
        },
        "ibc_status": {
          "send_packet": {
            "chain_uid": "vsl",
            "status": "success",
            "msg": "released",
            "timestamp": "2025-04-14 17:50:09.72 +0000 UTC",
            "tx_hash": "CB73293F1CC146CDCF44538F3BB0271DAEBBBFF70A5E1EE98E3C62F430DD2DC2"
          },
          "recv_packet": {
            "chain_uid": "archway",
            "status": "success",
            "msg": "eyJvayI6eyJmYWN0b3J5X2FkZHJlc3MiOiJhcmNod2F5MXlzeTA0M3Z6cTY5ODlxNmRhZTg2MHV4NjZteWo3Y3p2d3BuenhlbDJkenA5a3FkOXZqZXNyazIycHgiLCJjaGFpbl9pZCI6ImNvbnN0YW50aW5lLTMiLCJhbW91bnQiOiIyNjM3NDQ1NjEwOTI0Nzg4OTQwODAiLCJ0b2tlbiI6ImNvbnN0IiwidG9fYWRkcmVzcyI6ImFyY2h3YXkxYzM5N3J4dmhmOG1oajNybmhwbXlxc3JnZzIzMHk0dmdjbTl5aHUiLCJkZW5vbXMiOlt7InRva2VuX3R5cGUiOnsibmF0aXZlIjp7ImRlbm9tIjoiYWNvbnN0In19LCJhbW91bnQiOiIyNjM3NDQ1NjEwOTI0Nzg4OTQwODAiLCJuZXdfYmFsYW5jZSI6IjE1MTM0NzYzOTE0MTE1OTQxNzkwMDAifV19fQ==",
            "timestamp": "2025-04-14 17:50:20.682 +0000 UTC",
            "tx_hash": "7C1E988B6688C8AC056BBB295B5F28AD517937406786F8A0C4330AF55C38CC62"
          },
          "ack_status": {
            "chain_uid": "vsl",
            "status": "success",
            "msg": "Success",
            "timestamp": "2025-04-14 17:50:30.358 +0000 UTC",
            "tx_hash": "3A8D09F2DE7C3C573166102F1F4F923512959F41D175A511A64484344F6881BC"
          }
        },
        "token_id": "const",
        "expected_amount_out": "263744561092478894080",
        "amount_out": "263744561092478894080",
        "from_dex": "euclid",
        "to_address": "archway1c397rxvhf8mhj3rnhpmyqsrgg230y4vgcm9yhu",
        "release_tx_hash": "CB73293F1CC146CDCF44538F3BB0271DAEBBBFF70A5E1EE98E3C62F430DD2DC2",
        "escrow_release_status": {
          "is_completed": true,
          "tx_id": "injective:inj1epptslyy5mlvr4m238v0z0954nf9m6lly7v7pu:nibiru-testnet-2:1082758:0:1645",
          "type": "EscrowRelease",
          "tx_status": "success",
          "tx_hash": "CB73293F1CC146CDCF44538F3BB0271DAEBBBFF70A5E1EE98E3C62F430DD2DC2",
          "sequence": "66",
          "source_chain_uid": "archway",
          "source_chain_id": "constantine-3",
          "source_factory": "archway1ysy043vzq6989q6dae860ux66myj7czvwpnzxel2dzp9kqd9vjesrk22px",
          "status": [
            {
              "chain_uid": "vsl",
              "status": "success",
              "msg": "released",
              "timestamp": "2025-04-14 17:50:09.72 +0000 UTC",
              "tx_hash": "CB73293F1CC146CDCF44538F3BB0271DAEBBBFF70A5E1EE98E3C62F430DD2DC2"
            },
            {
              "chain_uid": "archway",
              "status": "success",
              "msg": "eyJvayI6eyJmYWN0b3J5X2FkZHJlc3MiOiJhcmNod2F5MXlzeTA0M3Z6cTY5ODlxNmRhZTg2MHV4NjZteWo3Y3p2d3BuenhlbDJkenA5a3FkOXZqZXNyazIycHgiLCJjaGFpbl9pZCI6ImNvbnN0YW50aW5lLTMiLCJhbW91bnQiOiIyNjM3NDQ1NjEwOTI0Nzg4OTQwODAiLCJ0b2tlbiI6ImNvbnN0IiwidG9fYWRkcmVzcyI6ImFyY2h3YXkxYzM5N3J4dmhmOG1oajNybmhwbXlxc3JnZzIzMHk0dmdjbTl5aHUiLCJkZW5vbXMiOlt7InRva2VuX3R5cGUiOnsibmF0aXZlIjp7ImRlbm9tIjoiYWNvbnN0In19LCJhbW91bnQiOiIyNjM3NDQ1NjEwOTI0Nzg4OTQwODAiLCJuZXdfYmFsYW5jZSI6IjE1MTM0NzYzOTE0MTE1OTQxNzkwMDAifV19fQ==",
              "timestamp": "2025-04-14 17:50:20.682 +0000 UTC",
              "tx_hash": "7C1E988B6688C8AC056BBB295B5F28AD517937406786F8A0C4330AF55C38CC62"
            },
            {
              "chain_uid": "vsl",
              "status": "success",
              "msg": "Success",
              "timestamp": "2025-04-14 17:50:30.358 +0000 UTC",
              "tx_hash": "3A8D09F2DE7C3C573166102F1F4F923512959F41D175A511A64484344F6881BC"
            }
          ],
          "escrow_response": {
            "tx_id": "injective:inj1epptslyy5mlvr4m238v0z0954nf9m6lly7v7pu:nibiru-testnet-2:1082758:0:1645",
            "amount": "263744561092478894080",
            "token": "const",
            "to_address": "archway1c397rxvhf8mhj3rnhpmyqsrgg230y4vgcm9yhu",
            "chain_uid": "constantine-3"
          }
        }
      }
    ]
  }
}`
    }
  ]}
/>


### EVM

<Tabs
  tabs={[
    {
      id: 'evm-track-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/txn/track/swap' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "chain": "amoy",
    "tx_hash": "0xcbbb1784619b73983d65aca7ace2041d0692814ab2a4bd3635e89d6b845e44eb"
}'`
    },
    {
      id: 'evm-track-response',
      label: 'Response',
      language: 'json',
      content: `{
  "response": {
    "is_completed": true,
    "tx_hash": "0xcbbb1784619b73983d65aca7ace2041d0692814ab2a4bd3635e89d6b845e44eb",
    "asset_in_type": "smart",
    "type": "swap",
    "destination_chain_uid": [
      "injective"
    ],
    "destination_token_id": "inj",
    "source_token_id": "euclid",
    "tx_status": "success",
    "tx_id": "amoy:0x887e4aac216674d2c432798f851c1ea5d505b2e1:80002:20609432:130",
    "voucher_minted": {
      "token": "inj",
      "amount": "0",
      "chain_uid": "amoy"
    },
    "sequence": "130",
    "source_chain_uid": "amoy",
    "source_chain_id": "80002",
    "source_factory": "0x7f2cc9fe79961f628da671ac62d1f2896638edd5",
    "sender": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "total_duration": "18s",
    "total_estimated_duration": "26.5s",
    "swap_status": [
      {
        "type": "dex",
        "dex": "euclid",
        "is_ibc": true,
        "route": [
          "euclid",
          "inj"
        ],
        "amount_in": "1000000000",
        "status": {
          "chain_uid": "amoy",
          "status": "success",
          "msg": "success",
          "timestamp": "2025-04-18 14:24:07.759 +0000 UTC",
          "tx_hash": "0xcbbb1784619b73983d65aca7ace2041d0692814ab2a4bd3635e89d6b845e44eb",
          "duration": "23.746s",
          "estimated_duration": "23.746s"
        },
        "ibc_status": {
          "send_packet": {
            "chain_uid": "amoy",
            "status": "success",
            "msg": "success",
            "timestamp": "2025-04-18 14:24:07.759 +0000 UTC",
            "tx_hash": "0xcbbb1784619b73983d65aca7ace2041d0692814ab2a4bd3635e89d6b845e44eb",
            "duration": "0s"
          },
          "recv_packet": {
            "chain_uid": "vsl",
            "status": "success",
            "msg": "ok",
            "timestamp": "2025-04-18 14:24:12.47 +0000 UTC",
            "tx_hash": "A59EC543F943A766C8D42D9246B1F120BCC385C16303EB55BC80695B9C6EFFD1"
          },
          "ack_status": {
            "chain_uid": "amoy",
            "status": "success",
            "msg": "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000042616d6f793a3078383837653461616332313636373464326334333237393866383531633165613564353035623265313a38303030323a32303630393433323a313330000000000000000000000000000000000000000000000000000000000000",
            "timestamp": "2025-04-18 14:24:31.505 +0000 UTC",
            "tx_hash": "0x7ac1eb09ffa571b309a0eff588d221ad1d13d28a163c71d722676a053935fbdf"
          }
        },
        "asset_in": "euclid",
        "asset_out": "inj",
        "expected_amount_out": "40259437837605601280",
        "amount_out": "40259437837605600454",
        "from_dex": "euclid"
      },
      {
        "type": "release",
        "is_ibc": true,
        "from_chain_uid": "amoy",
        "to_chain_uid": "injective",
        "status": {
          "chain_uid": "injective",
          "status": "success",
          "msg": "success",
          "timestamp": "2025-04-18 14:24:26.511 +0000 UTC",
          "tx_hash": "E3FDF7BB930765A0053BE985B93478DDED009A1070EB834C5F919E629CC89E7B",
          "duration": "26.464s",
          "estimated_duration": "26.464s"
        },
        "ibc_status": {
          "send_packet": {
            "chain_uid": "vsl",
            "status": "success",
            "msg": "released",
            "timestamp": "2025-04-18 14:24:12.47 +0000 UTC",
            "tx_hash": "A59EC543F943A766C8D42D9246B1F120BCC385C16303EB55BC80695B9C6EFFD1"
          },
          "recv_packet": {
            "chain_uid": "injective",
            "status": "success",
            "msg": "eyJvayI6eyJmYWN0b3J5X2FkZHJlc3MiOiJpbmoxc2RtejI1NjQ0cDJubjJ6c2U1bnRya3c3Y2Y2Zzd0aDBhbXRkcHUiLCJjaGFpbl9pZCI6ImluamVjdGl2ZS04ODgiLCJhbW91bnQiOiI0MDI1OTQzNzgzNzYwNTYwMDQ1NCIsInRva2VuIjoiaW5qIiwidG9fYWRkcmVzcyI6ImluajFlcHB0c2x5eTVtbHZyNG0yMzh2MHowOTU0bmY5bTZsbHk3djdwdSIsImRlbm9tcyI6W3sidG9rZW5fdHlwZSI6eyJuYXRpdmUiOnsiZGVub20iOiJpbmoifX0sImFtb3VudCI6IjQwMjU5NDM3ODM3NjA1NjAwNDU0IiwibmV3X2JhbGFuY2UiOiIzOTMxNDAwNDU3MTQ3OTcwMzcxNjMifV19fQ==",
            "timestamp": "2025-04-18 14:24:26.511 +0000 UTC",
            "tx_hash": "E3FDF7BB930765A0053BE985B93478DDED009A1070EB834C5F919E629CC89E7B"
          },
          "ack_status": {
            "chain_uid": "vsl",
            "status": "success",
            "msg": "Success",
            "timestamp": "2025-04-18 14:24:38.934 +0000 UTC",
            "tx_hash": "02AF65238DCB74A0AD540313B6246175BE0E6B06101D1E686F0D03589A3EDCBD"
          }
        },
        "token_id": "inj",
        "expected_amount_out": "40259437837605600454",
        "amount_out": "40259437837605600454",
        "from_dex": "euclid",
        "to_address": "inj1epptslyy5mlvr4m238v0z0954nf9m6lly7v7pu",
        "release_tx_hash": "A59EC543F943A766C8D42D9246B1F120BCC385C16303EB55BC80695B9C6EFFD1",
        "escrow_release_status": {
          "is_completed": true,
          "tx_id": "amoy:0x887e4aac216674d2c432798f851c1ea5d505b2e1:nibiru-testnet-2:1145105:0:3231",
          "type": "EscrowRelease",
          "tx_status": "success",
          "tx_hash": "A59EC543F943A766C8D42D9246B1F120BCC385C16303EB55BC80695B9C6EFFD1",
          "sequence": "238",
          "source_chain_uid": "injective",
          "source_chain_id": "injective-888",
          "source_factory": "inj1sdmz25644p2nn2zse5ntrkw7cf6g7th0amtdpu",
          "status": [
            {
              "chain_uid": "vsl",
              "status": "success",
              "msg": "released",
              "timestamp": "2025-04-18 14:24:12.47 +0000 UTC",
              "tx_hash": "A59EC543F943A766C8D42D9246B1F120BCC385C16303EB55BC80695B9C6EFFD1"
            },
            {
              "chain_uid": "injective",
              "status": "success",
              "msg": "eyJvayI6eyJmYWN0b3J5X2FkZHJlc3MiOiJpbmoxc2RtejI1NjQ0cDJubjJ6c2U1bnRya3c3Y2Y2Zzd0aDBhbXRkcHUiLCJjaGFpbl9pZCI6ImluamVjdGl2ZS04ODgiLCJhbW91bnQiOiI0MDI1OTQzNzgzNzYwNTYwMDQ1NCIsInRva2VuIjoiaW5qIiwidG9fYWRkcmVzcyI6ImluajFlcHB0c2x5eTVtbHZyNG0yMzh2MHowOTU0bmY5bTZsbHk3djdwdSIsImRlbm9tcyI6W3sidG9rZW5fdHlwZSI6eyJuYXRpdmUiOnsiZGVub20iOiJpbmoifX0sImFtb3VudCI6IjQwMjU5NDM3ODM3NjA1NjAwNDU0IiwibmV3X2JhbGFuY2UiOiIzOTMxNDAwNDU3MTQ3OTcwMzcxNjMifV19fQ==",
              "timestamp": "2025-04-18 14:24:26.511 +0000 UTC",
              "tx_hash": "E3FDF7BB930765A0053BE985B93478DDED009A1070EB834C5F919E629CC89E7B"
            },
            {
              "chain_uid": "vsl",
              "status": "success",
              "msg": "Success",
              "timestamp": "2025-04-18 14:24:38.934 +0000 UTC",
              "tx_hash": "02AF65238DCB74A0AD540313B6246175BE0E6B06101D1E686F0D03589A3EDCBD"
            }
          ],
          "escrow_response": {
            "tx_id": "amoy:0x887e4aac216674d2c432798f851c1ea5d505b2e1:nibiru-testnet-2:1145105:0:3231",
            "amount": "40259437837605600454",
            "token": "inj",
            "to_address": "inj1epptslyy5mlvr4m238v0z0954nf9m6lly7v7pu",
            "chain_uid": "injective-888"
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