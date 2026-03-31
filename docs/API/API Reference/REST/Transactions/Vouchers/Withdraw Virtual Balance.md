---
sidebar_position: 6
title: "Withdraw Voucher Tokens"
---
import Tabs from '@site/src/components/Tabs';

# Withdraw Voucher Tokens

Generates a transaction for users to withdraw voucher balances into native assets.

<details>
<summary><strong>Related Queries</strong></summary>

- [User Balance](/docs/API/API%20Reference/GQL/Virtual%20Balance/User%20Balance): Use this query to fetch the sender's available voucher balances before constructing the withdraw.
- [Unified User Balance](/docs/API/API%20Reference/GQL/Virtual%20Balance/Unified%20User%20Balance): Use this query if you need voucher balances across multiple chains before selecting the withdraw source.
- [Token Denoms](/docs/API/API%20Reference/GQL/Token/Token%20Denoms): Use this query to fetch the correct `token_type` value for `asset_in.token_type`.
- [All Chains](/docs/API/API%20Reference/GQL/Router/All%20Chains): Use this query to fetch valid destination chain UIDs for `cross_chain_addresses[].user.chain_uid`. In most integrations, `sender.chain_uid` is derived from the connected wallet or source chain context.

</details>

### Request URL

**Method:** `POST`

```bash
https://api.euclidprotocol.com/api/v1/execute/vcoin/withdraw
```

### Examples

<Tabs
  tabs={[
    {
      id: 'evm-vcoin-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://api.euclidprotocol.com/api/v1/execute/vcoin/withdraw' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "amount": "100000",
    "asset_in": {
      "token": "usdt",
      "token_type": {
        "smart": {
          "contract_address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
        }
      }
    },
    "sender": {
      "address": "0x09851e1de798af7e1ad04a72a04b59f4e0009b05",
      "chain_uid": "polygon"
    },
    "cross_chain_addresses": [
      {
        "user": {
          "address": "0x06aa195f71ad7911cda33d97bd0b6be9c1998a22",
          "chain_uid": "polygon"
        },
        "amount": {
          "equal": "100000"
        }
      }
    ]
}'`
    },
    {
      id: 'evm-vcoin-response',
      label: 'EVM Response',
      language: 'json',
      content: `{
  "msgs": [
    {
      "chainId": "137",
      "data": "0x1793876b000000...",
      "gasLimit": "0x493E0",
      "to": "0x08E6604931E9c2a978D4861b912f7894CC6063F7",
      "value": "0x0"
    }
  ],
  "type": "evm"
}`
    },
    {
      id: 'cosmos-vcoin-request',
      label: 'Cosmos Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://api.euclidprotocol.com/api/v1/execute/vcoin/withdraw' \\
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
        "limit": {
          "less_than_or_equal": "1000000"
        }
      }
    ]
}'`
    },
    {
      id: 'cosmos-vcoin-response',
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

### Parameters

| **Field**                 | **Type**                                                                                             | **Description**                                                                 |
|---------------------------|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| `asset_in`                | [`TokenWithDenom`](/docs/API/API%20Reference/common%20types.md#tokenwithdenom)                    | The voucher token to withdraw, including its token type and contract/denom.    |
| `amount`                  | `string`                                                                                            | The amount to withdraw (in smallest unit).                                     |
| `sender`                  | [`CrossChainUserWithAmount`](/docs/API/API%20Reference/common%20types.md#crosschainuserwithamount)            | Address and chain initiating the withdrawal.                                   |
| `cross_chain_addresses`   | [`CrossChainAddressWithLimit`](/docs/API/API%20Reference/common%20types.md#crosschainaddresswithlimit)`[]` | Optional release destinations. Use `amount` inside each entry to specify the withdrawal rule for that recipient. |
