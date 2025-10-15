---
sidebar_position: 4
---
import Tabs from '@site/src/components/Tabs';

# Remove Liquidity

Generates a transaction to remove liquidity from a pool.

### CosmWasm
<Tabs
  tabs={[
    {
      id: 'cosmos-remove-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/liquidity/remove' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "lp_allocation": "1000000",
    "vlp_address": "euclid1fa7tuuwmd5r3r40ujtrz82xxnxx8l4v2u74x9643v0c9j0h698qs6hx5nz",
    "sender": {
      "address": "inj1ugsn0llmegjn2q6fulexr4dwtazjcnvmgwhlj7",
      "chain_uid": "injective"
    }
}'`
    },
    {
      id: 'cosmos-remove-response',
      label: 'Response',
      language: 'json',
      content: `{
  "response": {
    "is_completed": false,
    "tx_hash": "8CF90E30D820DB1B700EBA86A54A5748BC37B0244489BD95F2F64E96A39071B6",
    "asset_in_type": "",
    "type": "",
    "source_token_id": "",
    "tx_status": "",
    "tx_id": "",
    "voucher_minted": null,
    "sequence": "",
    "source_chain_uid": "injective",
    "source_chain_id": "injective-888",
    "source_factory": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q",
    "sender": "",
    "total_duration": "",
    "total_estimated_duration": "",
    "status": [
      {
        "chain_uid": "injective",
        "status": "pending",
        "msg": "failed to get txn hash data",
        "timestamp": "",
        "tx_hash": "8CF90E30D820DB1B700EBA86A54A5748BC37B0244489BD95F2F64E96A39071B6"
      },
      {
        "chain_uid": "vsl",
        "status": "pending",
        "msg": "Pending",
        "timestamp": "",
        "tx_hash": ""
      },
      {
        "chain_uid": "injective",
        "status": "pending",
        "msg": "Pending",
        "timestamp": "",
        "tx_hash": ""
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
      id: 'evm-remove-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/liquidity/remove' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "lp_allocation": "1000000",
    "vlp_address": "euclid1fa7tuuwmd5r3r40ujtrz82xxnxx8l4v2u74x9643v0c9j0h698qs6hx5nz",
    "sender": {
      "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
      "chain_uid": "base"
    },
    "cross_chain_addresses": [
      {
        "user": {
          "address": "0x5aBFe1234567890cDEFaBc1234567890dEfABc01",
          "chain_uid": "amoy"
        },
        "limit": {
          "less_than_or_equal": "600000"
        }
      }
    ]
}'`
    },
    {
      id: 'evm-remove-response',
      label: 'Response',
      language: 'json',
      content: `{
  "msgs": [
    {
      "chainId": "84532",
      "data": "0x4000aea000000000000000000000000000a739e4479...",
      "gasLimit": "0x493E0",
      "to": "0x0000000000000000000000000000000000000000",
      "value": "0x0"
    }
  ],
  "type": "evm"
}`
    }
  ]}
/>
### Parameters 

| **Field**                 | **Type**                                                                                             | **Description**                                                                 |
|---------------------------|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| `lp_allocation`           | `string`                                                                                            | Amount of LP tokens to remove (in smallest unit).                              |
| `vlp_address`             | `string`                                                                                            | Address of the Virtual Liquidity Pool (VLP) smart contract.                     |
| `sender`                  | [`CrossChainUser`](../../common%20types.md#crosschainuser)            | Wallet address and chain of the user initiating the removal.                   |
| `cross_chain_addresses`   | [`CrossChainUserWithLimit`](../../common%20types.md#crosschainuserwithlimit)`[]` | Optional set of addresses to specify where the assets should be released. The first element specified in the vector has highest priority and so on. Defaults to the sender.                          |