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
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/txn/track/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "chain": "ronin",
    "tx_hash": "0x7f78069e33c6d288448bc95219e116f77bc26c8378ba017b5bf6ddf1c5c6d21c"
}'`
    },
    {
      id: 'evm-track-response',
      label: 'Response',
      language: 'json',
      content: `{
  "response": {
    "is_completed": true,
    "tx_hash": "0x7f78069e33c6d288448bc95219e116f77bc26c8378ba017b5bf6ddf1c5c6d21c",
    "asset_in_type": "smart",
    "type": "swap",
    "destination_chain_uid": [
      "bsc"
    ],
    "destination_token_id": "bnb",
    "source_token_id": "euclid",
    "tx_status": "success",
    "tx_id": "ronin:0x887e4aac216674d2c432798f851c1ea5d505b2e1:2021:42264661:608732",
    "voucher_minted": {
      "token": "bnb",
      "amount": "0",
      "chain_uid": "ronin"
    },
    "sequence": "608732",
    "source_chain_uid": "ronin",
    "source_chain_id": "2021",
    "source_factory": "0x43d4759e0cb8e4d3b2aab1ba6e39a60dce1a8f5b",
    "sender": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "total_duration": "8s",
    "total_estimated_duration": "9.1s",
    "swap_status": [
      {
        "type": "dex",
        "dex": "euclid",
        "is_ibc": true,
        "route": [
          "euclid",
          "bnb"
        ],
        "amount_in": "4000000",
        "status": {
          "chain_uid": "ronin",
          "status": "success",
          "msg": "success",
          "timestamp": "2025-10-15 15:59:09.166 +0000 UTC",
          "tx_hash": "0x7f78069e33c6d288448bc95219e116f77bc26c8378ba017b5bf6ddf1c5c6d21c",
          "duration": "2.281s",
          "estimated_duration": "760ms"
        },
        "ibc_status": {
          "send_packet": {
            "chain_uid": "ronin",
            "status": "success",
            "msg": "success",
            "timestamp": "2025-10-15 15:59:09.166 +0000 UTC",
            "tx_hash": "0x7f78069e33c6d288448bc95219e116f77bc26c8378ba017b5bf6ddf1c5c6d21c",
            "duration": "0s"
          },
          "recv_packet": {
            "chain_uid": "vsl",
            "status": "success",
            "msg": "ok",
            "timestamp": "2025-10-15 15:59:11.447 +0000 UTC",
            "tx_hash": "4507F4755DBBD333EF844440149B651FDF8B8DF1D0E60716DB4A5A80898797B7"
          },
          "ack_status": {
            "chain_uid": "ronin",
            "status": "pending",
            "msg": "txn not found",
            "timestamp": "",
            "tx_hash": ""
          }
        },
        "asset_in": "euclid",
        "asset_out": "bnb",
        "expected_amount_out": "423756295516401856",
        "amount_out": "405560554268112375",
        "from_dex": "euclid"
      },
      {
        "type": "release",
        "is_ibc": true,
        "from_chain_uid": "ronin",
        "to_chain_uid": "bsc",
        "status": {
          "chain_uid": "bsc",
          "status": "success",
          "msg": "success",
          "timestamp": "2025-10-15 15:59:18.033 +0000 UTC",
          "tx_hash": "0xb4065b74516d6fc441319c00a59ac79d660429cca48d55e75aa28d7d86b2e238",
          "duration": "9.534s",
          "estimated_duration": "8.294s"
        },
        "ibc_status": {
          "send_packet": {
            "chain_uid": "vsl",
            "status": "success",
            "msg": "released",
            "timestamp": "2025-10-15 15:59:11.447 +0000 UTC",
            "tx_hash": "4507F4755DBBD333EF844440149B651FDF8B8DF1D0E60716DB4A5A80898797B7"
          },
          "recv_packet": {
            "chain_uid": "bsc",
            "status": "success",
            "msg": "0x",
            "timestamp": "2025-10-15 15:59:18.033 +0000 UTC",
            "tx_hash": "0xb4065b74516d6fc441319c00a59ac79d660429cca48d55e75aa28d7d86b2e238"
          },
          "ack_status": {
            "chain_uid": "vsl",
            "status": "success",
            "msg": "Success",
            "timestamp": "2025-10-15 15:59:20.981 +0000 UTC",
            "tx_hash": "7C8100879FA578CBABBAD75AF60AADF488FEAD8E447CD558360723DBCB132828"
          }
        },
        "token_id": "bnb",
        "expected_amount_out": "405560554268112375",
        "amount_out": "405560554268112375",
        "from_dex": "euclid",
        "to_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
        "release_tx_hash": "4507F4755DBBD333EF844440149B651FDF8B8DF1D0E60716DB4A5A80898797B7",
        "escrow_release_status": {
          "is_completed": true,
          "tx_id": "ronin:0x887e4aac216674d2c432798f851c1ea5d505b2e1:neuron-1:15866796:6:10416569",
          "type": "EscrowRelease",
          "tx_status": "success",
          "tx_hash": "4507F4755DBBD333EF844440149B651FDF8B8DF1D0E60716DB4A5A80898797B7",
          "sequence": "70543",
          "source_chain_uid": "bsc",
          "source_chain_id": "97",
          "source_factory": "0x62d8658a3d7c669943c95c781c220469e19beb47",
          "status": [
            {
              "chain_uid": "vsl",
              "status": "success",
              "msg": "released",
              "timestamp": "2025-10-15 15:59:11.447 +0000 UTC",
              "tx_hash": "4507F4755DBBD333EF844440149B651FDF8B8DF1D0E60716DB4A5A80898797B7"
            },
            {
              "chain_uid": "bsc",
              "status": "success",
              "msg": "0x",
              "timestamp": "2025-10-15 15:59:18.033 +0000 UTC",
              "tx_hash": "0xb4065b74516d6fc441319c00a59ac79d660429cca48d55e75aa28d7d86b2e238"
            },
            {
              "chain_uid": "vsl",
              "status": "success",
              "msg": "Success",
              "timestamp": "2025-10-15 15:59:20.981 +0000 UTC",
              "tx_hash": "7C8100879FA578CBABBAD75AF60AADF488FEAD8E447CD558360723DBCB132828"
            }
          ],
          "escrow_response": {
            "tx_id": "ronin:0x887e4aac216674d2c432798f851c1ea5d505b2e1:2021:42264661:608732",
            "amount": "405560554268112375",
            "token": "bnb",
            "to_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
            "chain_uid": "bsc"
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