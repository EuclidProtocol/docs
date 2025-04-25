---
sidebar_position: 7
---
import Tabs from '@site/src/components/Tabs';

# Track Transaction

Checks the current status of a transaction by providing the `tx_hash` and the chain it was submitted on.
:::tip
If you're looking to track a **cross-chain swap**, use the [Track Swap Transaction](./Track%20Swap%20Transaction) endpoint instead. This endpoint is designed specifically to provide detailed status updates and IBC event traces for swap transactions.
:::

### Request URL

```bash
https://testnet.api.euclidprotocol.com/api/v1/txn/track
```

### CosmWasm

<Tabs
  tabs={[
    {
      id: 'cosmos-track-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/txn/track' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "chain": "injective",
    "tx_hash": "8CF90E30D820DB1B700EBA86A54A5748BC37B0244489BD95F2F64E96A39071B6"
}'`
    },
    {
      id: 'cosmos-track-response',
      label: 'Response',
      language: 'json',
      content: `{
  "response": {
    "is_completed": true,
    "tx_hash": "8CF90E30D820DB1B700EBA86A54A5748BC37B0244489BD95F2F64E96A39071B6",
    "asset_in_type": "",
    "type": "add_liquidity",
    "source_token_id": "",
    "tx_status": "success",
    "tx_id": "injective:inj1epptslyy5mlvr4m238v0z0954nf9m6lly7v7pu:injective-888:72808079:1:2323",
    "voucher_minted": null,
    "sequence": "2322",
    "source_chain_uid": "injective",
    "source_chain_id": "injective-888",
    "source_factory": "inj1sdmz25644p2nn2zse5ntrkw7cf6g7th0amtdpu",
    "sender": "inj1epptslyy5mlvr4m238v0z0954nf9m6lly7v7pu",
    "total_duration": "2m59.414170628s",
    "total_estimated_duration": "",
    "status": [
      {
        "chain_uid": "injective",
        "status": "success",
        "msg": "Success",
        "timestamp": "2025-04-23 14:34:47.806 +0000 UTC",
        "tx_hash": "8CF90E30D820DB1B700EBA86A54A5748BC37B0244489BD95F2F64E96A39071B6"
      },
      {
        "chain_uid": "vsl",
        "status": "success",
        "msg": "eyJvayI6eyJtaW50X2xw...",
        "timestamp": "2025-04-23 14:35:06.579811852 +0000 UTC",
        "tx_hash": "8BB553DF2A6DE34478A7F1CDBC5F1CCC8761A79F5CD1E4B3CCF46C9DA410DFE4"
      },
      {
        "chain_uid": "injective",
        "status": "success",
        "msg": "Success",
        "timestamp": "2025-04-23 14:37:47.220170628 +0000 UTC",
        "tx_hash": "6209EF3E571AA67C8B13ABD792CCCBCA829E4BB39029F615592CC1E4BCBEAC72"
      }
    ],
    "liquidity_response": {
      "add_liquidity": {
        "token_1_added_liquidity": "10000000",
        "token_2_added_liquidity": "28072809",
        "lp_allocation": "16924547"
      },
      "pair": {
        "token_1": "usdc",
        "token_2": "usdt"
      }
    }
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
  'https://testnet.api.euclidprotocol.com/api/v1/txn/track' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "chain": "amoy",
    "tx_hash": "0x0611cba0bd2436706a9e48e477107ed6b8b1189fdb44e148e26eafc693b94ca8"
}'`
    },
    {
      id: 'evm-track-response',
      label: 'Response',
      language: 'json',
      content: `{
  "response": {
    "is_completed": true,
    "tx_hash": "0x0611cba0bd2436706a9e48e477107ed6b8b1189fdb44e148e26eafc693b94ca8",
    "asset_in_type": "",
    "type": "add_liquidity",
    "source_token_id": "",
    "tx_status": "success",
    "tx_id": "amoy:0x887e4aac216674d2c432798f851c1ea5d505b2e1:80002:20813709:362",
    "voucher_minted": null,
    "sequence": "362",
    "source_chain_uid": "amoy",
    "source_chain_id": "80002",
    "source_factory": "0x7f2cc9fe79961f628da671ac62d1f2896638edd5",
    "sender": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "total_duration": "41.205s",
    "total_estimated_duration": "",
    "status": [
      {
        "chain_uid": "amoy",
        "status": "success",
        "msg": "success",
        "timestamp": "2025-04-23 15:10:33.748 +0000 UTC",
        "tx_hash": "0x0611cba0bd2436706a9e48e477107ed6b8b1189fdb44e148e26eafc693b94ca8"
      },
      {
        "chain_uid": "vsl",
        "status": "success",
        "msg": "eyJvayI6eyJtaW...",
        "timestamp": "2025-04-23 15:11:24.240725927 +0000 UTC",
        "tx_hash": "107CF2BA1F73C8A5AA92D2C626B0CDDFBD9251F1C246E0B97BFC4C3159F2B8E5"
      },
      {
        "chain_uid": "amoy",
        "status": "success",
        "msg": "0x0000000000000...",
        "timestamp": "2025-04-23 15:11:14.953 +0000 UTC",
        "tx_hash": "0x967138042482c6099eeb8e531066f470eb85755509cda4bc1ce3482abb0e51f2"
      }
    ],
    "liquidity_response": {
      "add_liquidity": {
        "token_1_added_liquidity": "1000000",
        "token_2_added_liquidity": "677000000000000",
        "lp_allocation": "25481029669"
      },
      "pair": {
        "token_1": "euclid",
        "token_2": "pol"
      }
    }
  }
}`
    }
  ]}
/>

### Parameters

| **Field**   | **Type**   | **Description**                                                                    |
|-------------|------------|------------------------------------------------------------------------------------|
| `chain`     | `string`   | Chain UID where the original transaction was submitted (e.g. `injective`, `amoy`) |
| `tx_hash`   | `string`   | The hash of the transaction being tracked.                                        |