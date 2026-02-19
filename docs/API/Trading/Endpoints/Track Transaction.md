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
    "chain": "somnia",
    "tx_hash": "0xfc9084f8b837339ed5122079f8f6b774dad9f7e63149cee898a462a0986bcd88"
}'
```

<Tabs tabs={[
  {
    id: 'track-swap-response',
    label: 'Response',
    language: 'json',
    content: `
{
   "response":{
      "is_completed":true,
      "tx_hash":"0xfc9084f8b837339ed5122079f8f6b774dad9f7e63149cee898a462a0986bcd88",
      "asset_in_type":"native",
      "type":"swap",
      "destination_chain_uid":[
         "ronin"
      ],
      "destination_token_id":"euclid",
      "source_token_id":"stt",
      "tx_status":"success",
      "tx_id":"somnia:0xeacd29e4f8c872d9e70a4fd8f7bffa6245ed0f2f:50312:298841213:17597799",
      "voucher_minted":{
         "token":"euclid",
         "amount":"0",
         "chain_uid":"somnia"
      },
      "sequence":"17597799",
      "source_chain_uid":"somnia",
      "source_chain_id":"50312",
      "source_factory":"0x420f8ab112fa8b14c706e277204c8fc3eb0f4c92",
      "sender":"0xeacd29e4f8c872d9e70a4fd8f7bffa6245ed0f2f",
      "total_duration":"32s",
      "total_estimated_duration":"11.0s",
      "swap_status":[
         {
            "type":"dex",
            "dex":"euclid",
            "is_ibc":true,
            "route":[
               "stt",
               "euclid"
            ],
            "amount_in":"100000000000000000",
            "status":{
               "chain_uid":"somnia",
               "status":"success",
               "msg":"success",
               "timestamp":"2026-02-04 14:17:32.988 +0000 UTC",
               "tx_hash":"0xfc9084f8b837339ed5122079f8f6b774dad9f7e63149cee898a462a0986bcd88",
               "duration":"28.066s",
               "estimated_duration":"0s"
            },
            "ibc_status":{
               "send_packet":{
                  "chain_uid":"somnia",
                  "status":"success",
                  "msg":"success",
                  "timestamp":"2026-02-04 14:17:32.988 +0000 UTC",
                  "tx_hash":"0xfc9084f8b837339ed5122079f8f6b774dad9f7e63149cee898a462a0986bcd88",
                  "duration":"0s"
               },
               "recv_packet":{
                  "chain_uid":"vsl",
                  "status":"success",
                  "msg":"ok",
                  "timestamp":"2026-02-04 14:17:56.193 +0000 UTC",
                  "tx_hash":"79675F78F05B93692334A621B27C8B184AF86D38F609A317E84D765F011986E4"
               },
               "ack_status":{
                  "chain_uid":"somnia",
                  "status":"success",
                  "msg":"0x",
                  "timestamp":"2026-02-04 14:18:01.054 +0000 UTC",
                  "tx_hash":"0xdfc968ea510c94dc719f5e6e9239cc6bbb8ae327b029f21de41ba4ae90a51195"
               }
            },
            "asset_in":"stt",
            "asset_out":"euclid",
            "expected_amount_out":"1017",
            "amount_out":"1016",
            "from_dex":"euclid"
         },
         {
            "type":"release",
            "is_ibc":true,
            "from_chain_uid":"somnia",
            "to_chain_uid":"ronin",
            "status":{
               "chain_uid":"ronin",
               "status":"success",
               "msg":"success",
               "timestamp":"2026-02-04 14:18:05.376 +0000 UTC",
               "tx_hash":"0x11eccec25de432a59b65d8e599e7842bb61b1bf18f3472ad8fd80f126c693d64",
               "duration":"48.481s",
               "estimated_duration":"11.011s"
            },
            "ibc_status":{
               "send_packet":{
                  "chain_uid":"vsl",
                  "status":"success",
                  "msg":"released",
                  "timestamp":"2026-02-04 14:17:56.193 +0000 UTC",
                  "tx_hash":"79675F78F05B93692334A621B27C8B184AF86D38F609A317E84D765F011986E4"
               },
               "recv_packet":{
                  "chain_uid":"ronin",
                  "status":"success",
                  "msg":"0x",
                  "timestamp":"2026-02-04 14:18:05.376 +0000 UTC",
                  "tx_hash":"0x11eccec25de432a59b65d8e599e7842bb61b1bf18f3472ad8fd80f126c693d64"
               },
               "ack_status":{
                  "chain_uid":"vsl",
                  "status":"success",
                  "msg":"Success",
                  "timestamp":"2026-02-04 14:18:44.674 +0000 UTC",
                  "tx_hash":"50E15F1A95E25708DE29960A70955F2F4821C0EEBE874A93F8F8A8433CEAF858"
               }
            },
            "token_id":"euclid",
            "expected_amount_out":"1016",
            "amount_out":"1016",
            "from_dex":"euclid",
            "to_address":"0xeacd29e4f8c872d9e70a4fd8f7bffa6245ed0f2f",
            "release_tx_hash":"79675F78F05B93692334A621B27C8B184AF86D38F609A317E84D765F011986E4",
            "escrow_release_status":{
               "is_completed":true,
               "tx_id":"somnia:0xeacd29e4f8c872d9e70a4fd8f7bffa6245ed0f2f:neuron-1:26724891:1:11639286",
               "type":"EscrowRelease",
               "tx_status":"success",
               "tx_hash":"79675F78F05B93692334A621B27C8B184AF86D38F609A317E84D765F011986E4",
               "sequence":"130886",
               "source_chain_uid":"ronin",
               "source_chain_id":"2021",
               "source_factory":"0x43d4759e0cb8e4d3b2aab1ba6e39a60dce1a8f5b",
               "status":[
                  {
                     "chain_uid":"vsl",
                     "status":"success",
                     "msg":"released",
                     "timestamp":"2026-02-04 14:17:56.193 +0000 UTC",
                     "tx_hash":"79675F78F05B93692334A621B27C8B184AF86D38F609A317E84D765F011986E4"
                  },
                  {
                     "chain_uid":"ronin",
                     "status":"success",
                     "msg":"0x",
                     "timestamp":"2026-02-04 14:18:05.376 +0000 UTC",
                     "tx_hash":"0x11eccec25de432a59b65d8e599e7842bb61b1bf18f3472ad8fd80f126c693d64"
                  },
                  {
                     "chain_uid":"vsl",
                     "status":"success",
                     "msg":"Success",
                     "timestamp":"2026-02-04 14:18:44.674 +0000 UTC",
                     "tx_hash":"50E15F1A95E25708DE29960A70955F2F4821C0EEBE874A93F8F8A8433CEAF858"
                  }
               ],
               "escrow_response":{
                  "tx_id":"somnia:0xeacd29e4f8c872d9e70a4fd8f7bffa6245ed0f2f:50312:298841213:17597799",
                  "amount":"1016",
                  "token":"euclid",
                  "to_address":"0xeacd29e4f8c872d9e70a4fd8f7bffa6245ed0f2f",
                  "chain_uid":"ronin"
               }
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
    "chain": "somnia",
    "tx_hash": "0xfd68034231ab3755e32140d717ec5588c722b54edd896b3338de93564ca45e56"
}'
```

<Tabs tabs={[
  {
    id: 'track-generic-response',
    label: 'Response',
    language: 'json',
    content: `
{
   "response":{
      "is_completed":true,
      "tx_hash":"0xfd68034231ab3755e32140d717ec5588c722b54edd896b3338de93564ca45e56",
      "asset_in_type":"",
      "type":"add_liquidity",
      "source_token_id":"",
      "tx_status":"success",
      "tx_id":"somnia:0x33152398a50156f5b3c6275ff26bfde59b041883:50312:298554050:17597048",
      "voucher_minted":null,
      "sequence":"17597048",
      "source_chain_uid":"somnia",
      "source_chain_id":"50312",
      "source_factory":"0x420f8ab112fa8b14c706e277204c8fc3eb0f4c92",
      "sender":"0x33152398a50156f5b3c6275ff26bfde59b041883",
      "total_duration":"24.383s",
      "total_estimated_duration":"",
      "status":[
         {
            "chain_uid":"somnia",
            "status":"success",
            "msg":"success",
            "timestamp":"2026-02-04 06:16:25.851 +0000 UTC",
            "tx_hash":"0xfd68034231ab3755e32140d717ec5588c722b54edd896b3338de93564ca45e56"
         },
         {
            "chain_uid":"vsl",
            "status":"success",
            "msg":"eyJvayI6eyJtaW50X2xwX3Rva2VucyI6IjIyMzA3MjAzOSIsInZscF9hZGRyZXNzIjoiZXVjbGlkMXBrOTl4Z2U2cTk0cXR1MzU2OHgzcWhwNjh6enYwbXg3emE0Y3QwMDhrczM2cWh4NXR2c3NuNW13dHIiLCJ0eF9pZCI6InNvbW5pYToweDMzMTUyMzk4YTUwMTU2ZjViM2M2Mjc1ZmYyNmJmZGU1OWIwNDE4ODM6NTAzMTI6Mjk4NTU0MDUwOjE3NTk3MDQ4Iiwic2VuZGVyIjp7ImNoYWluX3VpZCI6InNvbW5pYSIsImFkZHJlc3MiOiIweDMzMTUyMzk4YTUwMTU2ZjViM2M2Mjc1ZmYyNmJmZGU1OWIwNDE4ODMifX19",
            "timestamp":"2026-02-04 06:16:46.357 +0000 UTC",
            "tx_hash":"1DB19C439CBD7916290FB09D2E17DCFEFA8B6D1D56CC4531DFBFC217D02C65F6"
         },
         {
            "chain_uid":"somnia",
            "status":"success",
            "msg":"0x",
            "timestamp":"2026-02-04 06:16:50.234 +0000 UTC",
            "tx_hash":"0x5968d2161737222e8e96d9fd31a99b34c19001db973e0213e43ef1b8f3263fb8"
         }
      ],
      "liquidity_response":{
         "add_liquidity":{
            "token_1_added_liquidity":"113",
            "token_2_added_liquidity":"10000000000000000",
            "lp_allocation":"223072039"
         },
         "pair":{
            "token_1":"euclid",
            "token_2":"stt"
         }
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
