---
sidebar_position: 6
---
import Tabs from '@site/src/components/Tabs';

# Withdraw Virtual Balance Tokens

Generates a transaction to withdraw virtual balance tokens for a user.

### Request URL
```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/vcoin/withdraw
```

### CosmWasm
<Tabs
  tabs={[
    {
      id: 'cosmos-vcoin-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/execute/vcoin/withdraw' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "token": "euclid",
    "amount": "1000000",
    "sender": {
      "address": "inj1epptslyy5mlvr4m238v0z0954nf9m6lly7v7pu",
      "chain_uid": "injective"
    },
    "cross_chain_addresses": [
      {
        "user": {
          "address": "osmo1recipient...",
          "chain_uid": "osmosis"
        },
        "limit": {
          "less_than_or_equal": "1000000"
        }
      }
    ]
}'`
    },
    {
      id: 'cosmos-vcoin-response',
      label: 'Response',
      language: 'json',
      content: `{
  "type": "cosmwasm",
  "sender": {
    "chain_uid": "injective",
    "address": "inj1epptslyy5mlvr4m238v0z0954nf9m6lly7v7pu"
  },
  "contract": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q",
  "chain_id": "injective-888",
  "rpc_url": "https://injective-testnet-rpc.publicnode.com",
  "rest_url": "https://testnet.sentry.lcd.injective.network",
  "msgs": [
    {
      "contractAddress": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q",
      "msg": {
        "withdraw_virtual_balance": {
          "amount": "1000000",
          "cross_chain_addresses": [
            {
              "user": {
                "chain_uid": "osmosis",
                "address": "osmo1recipient..."
              },
              "limit": {
                "less_than_or_equal": "1000000"
              }
            }
          ],
          "timeout": null,
          "token": "euclid"
        }
      },
      "funds": []
    }
  ]
}`
    }
  ]}
/>

### EVM

<Tabs
  tabs={[
    {
      id: 'evm-vcoin-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/execute/vcoin/withdraw' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "token": "euclid",
    "amount": "1000000",
    "sender": {
      "address": "0x887e4aac216674d2c432798f851C1Ea5d505b2E1",
      "chain_uid": "base"
    },
    "cross_chain_addresses": [
      {
        "user": {
          "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
          "chain_uid": "base"
        },
        "limit": {
          "less_than_or_equal": "3477907"
        }
      }
    ]
}'`
    },
    {
      id: 'evm-vcoin-response',
      label: 'Response',
      language: 'json',
      content: `{
  "msgs": [
    {
      "chainId": "84532",
      "data": "0x37946af7000000...",
      "gasLimit": "0x493E0",
      "to": "0x00a739e4479c97289801654ec1a52a67077613c0",
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
| `token`                   | `string`                                                                                            | The name of the virtual token to withdraw (e.g. `"euclid"`).                   |
| `amount`                  | `string`                                                                                            | The amount to withdraw (in smallest unit).                                     |
| `sender`                  | [`CrossChainUser`](../../common%20types.md#crosschainuser)            | Address and chain initiating the withdrawal.                                   |
| `cross_chain_addresses`   | [`CrossChainUserWithLimit`](../../common%20types.md#crosschainuserwithlimit)`[]` |  Optional set of addresses to specify where the tokens should be released. The first element specified in the vector has highest priority and so on.  Defaults to sender if not specified.                              |
