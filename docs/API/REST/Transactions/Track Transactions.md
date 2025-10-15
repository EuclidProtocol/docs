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
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/txn/track' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "chain": "ronin",
    "tx_hash": "0xaa9bbb2fbd0d9b26436065d16102e6eb09c6b4b78f9b11dbffcc7849b53b9c38"
}'`
    },
    {
      id: 'evm-track-response',
      label: 'Response',
      language: 'json',
      content: `{
  "response": {
    "is_completed": true,
    "tx_hash": "0xaa9bbb2fbd0d9b26436065d16102e6eb09c6b4b78f9b11dbffcc7849b53b9c38",
    "asset_in_type": "",
    "type": "withdraw",
    "source_token_id": "",
    "tx_status": "success",
    "tx_id": "ronin:0x887e4aac216674d2c432798f851c1ea5d505b2e1:2021:42264794:608760",
    "voucher_minted": null,
    "sequence": "608760",
    "source_chain_uid": "ronin",
    "source_chain_id": "2021",
    "source_factory": "0x43d4759e0cb8e4d3b2aab1ba6e39a60dce1a8f5b",
    "sender": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "release_status": [
      {
        "chain_uid": "vsl",
        "status": "success",
        "msg": "released",
        "timestamp": "2025-10-15 16:06:13.31 +0000 UTC",
        "tx_hash": "78B623D893B1B4B7C2A17020E0FAD0B897391AAAAD80D6DAE217A5580C7AC2DD"
      },
      {
        "chain_uid": "base",
        "status": "success",
        "msg": "0x",
        "timestamp": "2025-10-15 16:06:17.306 +0000 UTC",
        "tx_hash": "0x89960a57bbe1d06ca244133aec78aac90dc140456afefeb0006eda82c31e3245"
      },
      {
        "chain_uid": "vsl",
        "status": "success",
        "msg": "Success",
        "timestamp": "2025-10-15 16:06:20.445 +0000 UTC",
        "tx_hash": "3115AD6BC7E9EF7BD2B58CF266B19D185E223BF80B6AB4EE58D9F1920C2C86EE"
      }
    ],
    "escrow_release": {
      "tx_id": "ronin:0x887e4aac216674d2c432798f851c1ea5d505b2e1:2021:42264794:608760",
      "amount": "25000000",
      "token": "euclid",
      "to_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
      "chain_uid": "base"
    },
    "total_duration": "17.264s",
    "total_estimated_duration": "",
    "status": [
      {
        "chain_uid": "ronin",
        "status": "success",
        "msg": "success",
        "timestamp": "2025-10-15 16:06:10.587 +0000 UTC",
        "tx_hash": "0xaa9bbb2fbd0d9b26436065d16102e6eb09c6b4b78f9b11dbffcc7849b53b9c38"
      },
      {
        "chain_uid": "vsl",
        "status": "success",
        "msg": "eyJvayI6eyJ0b2tlbiI6ImV1Y2xpZCIsInR4X2lkIjoicm9uaW46MHg4ODdlNGFhYzIxNjY3NGQyYzQzMjc5OGY4NTFjMWVhNWQ1MDViMmUxOjIwMjE6NDIyNjQ3OTQ6NjA4NzYwIn19",
        "timestamp": "2025-10-15 16:06:13.31 +0000 UTC",
        "tx_hash": "78B623D893B1B4B7C2A17020E0FAD0B897391AAAAD80D6DAE217A5580C7AC2DD"
      },
      {
        "chain_uid": "ronin",
        "status": "success",
        "msg": "0x",
        "timestamp": "2025-10-15 16:06:27.851 +0000 UTC",
        "tx_hash": "0x59cdbfa396f391ca78d172179cb215a25dece67ead1ca9c833a8034d67bb161b"
      }
    ],
    "withdraw_voucher_response": {
      "token": "euclid",
      "amount": "25000000",
      "sender_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
      "sender_chain_uid": "ronin",
      "recieve_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
      "recieve_chain_uid": "base"
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