---
sidebar_position: 7
title: "Withdraw Voucher Tokens"
draft: true
---
import Tabs from '@site/src/components/Tabs';

# Withdraw Voucher Tokens

Generates a transaction for users to withdraw voucher balances into native assets.

<details>
<summary><strong>Related Queries</strong></summary>

- [All Escrows](/docs/API/API%20Reference/GQL/Router/All%20Escrows): Use this query to inspect escrow balances before constructing the withdraw.
- [All Chains](/docs/API/API%20Reference/GQL/Router/All%20Chains): Use this query to fetch valid destination chain UIDs for `cross_chain_addresses[].user.chain_uid`. In most integrations, `sender.chain_uid` is derived from the connected wallet or source chain context.

</details>

### Request URL
```bash
https://api.euclidprotocol.com/api/v1/execute/escrow/withdraw
```

### Examples

<Tabs
  tabs={[
    {
      id: 'evm-escrow-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://api.euclidprotocol.com/api/v1/execute/escrow/withdraw' \\
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
        "amount": {
          "less_than_or_equal": "3477907"
        },
        "denom": {
          "native": {
            "denom": "euclid"
          }
        }
      }
    ],
    "timeout": "60"
}'`
    },
    {
      id: 'evm-escrow-response',
      label: 'EVM Response',
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
    },
    {
      id: 'cosmos-escrow-request',
      label: 'Cosmos Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://api.euclidprotocol.com/api/v1/execute/escrow/withdraw' \\
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
          "address": "osmo1468tkm9zh0fl8ragatwjuwz0v065zssadrunml",
          "chain_uid": "osmosis"
        },
        "amount": {
          "less_than_or_equal": "1000000"
        },
        "denom": {
          "native": {
            "denom": "euclid"
          }
        }
      }
    ],
    "timeout": "60"
}'`
    },
    {
      id: 'cosmos-escrow-response',
      label: 'Cosmos Response',
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
                "address": "osmo1468tkm9zh0fl8ragatwjuwz0v065zssadrunml"
              },
              "amount": {
                "less_than_or_equal": "1000000"
              },
              "denom": {
                "native": {
                  "denom": "euclid"
                }
              }
            }
          ],
          "timeout": "60",
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

### Parameters

| **Field**                 | **Type**                                                                                                  | **Description**                                                                 |
|---------------------------|-----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| `token`                   | `string`                                                                                                  | The name of the voucher token to withdraw (e.g. `"euclid"`).                 |
| `amount`                  | `string`                                                                                                  | The amount to withdraw (in smallest unit).                                      |
| `sender`                  | [`CrossChainUserWithAmount`](/docs/API/API%20Reference/common%20types.md#crosschainuserwithamount)      | Address and chain initiating the withdrawal.                                    |
| `cross_chain_addresses`   | [`CrossChainAddressWithLimit`](/docs/API/API%20Reference/common%20types.md#crosschainaddresswithlimit)`[]` | Optional recipient list and amount constraints for release. Defaults to `sender` if omitted. |
| `cross_chain_addresses[].denom` | [`TokenType`](/docs/API/API%20Reference/common%20types.md#tokentype-variants)                     | Optional preferred denomination/token type for each recipient.                  |
| `timeout`                 | `string`                                                                                                  | Optional timeout in seconds (typically `30` to `240`, default `60`).            |
