---
sidebar_position: 4
---
import Tabs from '@site/src/components/Tabs';

# Remove Liquidity

Generates a transaction to remove liquidity from a pool.

### Examples

<Tabs
  tabs={[
    {
      id: 'cosmos-remove-request',
      label: 'Cosmos Request',
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
      label: 'Cosmos Response',
      language: 'json',
      content: `{
  "type": "cosmwasm",
  "sender": {
    "chain_uid": "injective",
    "address": "inj1ugsn0llmegjn2q6fulexr4dwtazjcnvmgwhlj7"
  },
  "contract": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q",
  "chain_id": "injective-888",
  "rpc_url": "https://injective-testnet-rpc.publicnode.com",
  "rest_url": "https://testnet.sentry.lcd.injective.network",
  "msgs": [
    {
      "contractAddress": "inj109h276p8lju5xuku64at2t5gx63sv5nsuet8ar",
      "msg": {
        "send": {
          "amount": "1000000",
          "contract": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q",
          "msg": "eyJyZW1vdmVfbGlxdWlkaXR5Ijp7ImNyb3NzX2NoYWluX2FkZHJlc3NlcyI6W10sImxwX2FsbG9jYXRpb24iOiIxMDAwMDAwIiwicGFpciI6eyJ0b2tlbl8xIjoiaW5qIiwidG9rZW5fMiI6InVzZGMifSwidGltZW91dCI6bnVsbH19"
        }
      },
      "funds": []
    }
  ]
}`
    },
    {
      id: 'evm-remove-request',
      label: 'EVM Request',
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
          "address": "osmo1468tkm9zh0fl8ragatwjuwz0v065zssadrunml",
          "chain_uid": "osmosis"
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
      label: 'EVM Response',
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
| `sender`                  | [`CrossChainUser`](/docs/API/API%20Reference/common%20types.md#crosschainuser)            | Wallet address and chain of the user initiating the removal.                   |
| `cross_chain_addresses`   | [`CrossChainAddressWithLimit`](/docs/API/API%20Reference/common%20types.md#crosschainaddresswithlimit)`[]` | Optional set of addresses to specify where the assets should be released. The first element specified in the vector has highest priority and so on. Defaults to the sender.                          |
