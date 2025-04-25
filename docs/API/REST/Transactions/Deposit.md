---
sidebar_position: 8
---
import Tabs from '@site/src/components/Tabs';

# Deposit

Exchanges native or smart tokens to voucher tokens and sends them to the specified recipient address.

### Request URL
```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/pool/deposit
```

### CosmWasm

<Tabs
  tabs={[
    {
      id: 'cosmos-deposit-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/execute/token/deposit' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
  "amount_in": "2000000",
  "asset_in": {
    "token": "usdc",
    "token_type": {
      "native": {
        "denom": "uusdc"
      }
    }
  },
 "sender": {
  "chain_uid": "injective",
  "address": "inj1eppts..."
},
  "recipient": {
    "chain_uid": "osmosis",
    "address": "osmo1c3..."
  }
}'`
    },
    {
      id: 'cosmos-deposit-response',
      label: 'Response',
      language: 'json',
      content: `{
  "type": "cosmwasm",
  "sender": {
    "chain_uid": "injective",
    "address": "inj1eppts..."
  },
  "contract": "inj1sdmz25644p2nn2zse5ntrkw7cf6g7th0amtdpu",
  "chain_id": "injective-888",
  "rpc_url": "https://injective-testnet-rpc.publicnode.com",
  "rest_url": "https://testnet.sentry.lcd.injective.network",
  "msgs": [
    {
      "contractAddress": "inj1sdmz25644p2nn2zse5ntrkw7cf6g7th0amtdpu",
      "msg": {
        "deposit_token": {
          "amount_in": "2000000",
          "asset_in": {
            "token": "usdc",
            "token_type": {
              "native": {
                "denom": "uusdc"
              }
            }
          },
          "recipient": {
            "chain_uid": "osmosis",
            "address": "osmo1c3..."
          },
          "timeout": null
        }
      },
      "funds": [
        {
          "denom": "uusdc",
          "amount": "2000000"
        }
      ]
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
      id: 'evm-deposit-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/execute/token/deposit' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
  "amount_in": "2000000000000000000",
  "asset_in": {
    "token": "pol",
    "token_type": {
      "native": {
        "denom": "pol"
      }
    }
  },
  "sender": {
    "chain_uid": "amoy",
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1"
  },
  "recipient": {
    "chain_uid": "base",
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1"
  }
}'`
    },
    {
      id: 'evm-deposit-response',
      label: 'Response',
      language: 'json',
      content: `{
  "msgs": [
    {
      "chainId": "80002",
      "data": "0xafad44c...",
      "gasLimit": "0x493E0",
      "to": "0x7f2cc9fe79961f628da671ac62d1f2896638edd5",
      "value": "0x1bc16d674ec80000"
    }
  ],
  "type": "evm"
}`
    }
  ]}
/>


### Parameters

| **Field**       | **Type**                                                                                     | **Description**                                                                              |
|------------------|----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `amount_in`     | `string`                                                                                     | Amount of the token to be deposited (in raw base units, e.g., wei or uatom).                |
| `asset_in`      | [`TokenWithDenom`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#tokenwithdenom)     | Token being deposited along with its type (native or smart).                                |
| `sender`        | [`CrossChainUser`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuser)     | Address and chain initiating the deposit.                                                   |
| `recipient`     | [`CrossChainUser`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuser)     | Destination address and chain for the deposited asset.                                      |