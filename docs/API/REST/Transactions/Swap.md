---
sidebar_position: 1 
---
import Tabs from '@site/src/components/Tabs';

# Swap Request

Generates a transaction for a swap request.


### Request URL
 
```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/swap
```

### CosmWasm

<Tabs
  tabs={[
    {
      id: 'cosmos-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/execute/swap' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "amount_in": "1000000",
    "slippage": "0.01",
    "asset_in": {
      "token": "nibi",
      "token_type": {
        "native": { "denom": "unibi" }
      }
    },
    "minimum_receive": "950000",
    "cross_chain_addresses": [
      {
        "user": {
          "address": "osmo1abc...",
          "chain_uid": "osmosis"
        },
        "limit": {
          "less_than_or_equal": "950000"
        }
      }
    ],
    "partnerFee": {
      "partner_fee_bps": 10,
      "recipient": "nibi1xyz..."
    },
    "sender": {
      "address": "nibi1sender...",
      "chain_uid": "nibiru"
    },
    "swap_path": {
      "path": [
        {
          "route": ["nibi", "euclid"],
          "dex": "euclid",
          "amount_in": "1000000",
          "amount_out": "950000",
          "chain_uid": "nibiru"
        }
      ]
    }
}'`
    },
    {
      id: 'cosmos-response',
      label: 'Response',
      language: 'json',
      content: `{
  "type": "cosmwasm",
  "sender": {
    "chain_uid": "nibiru",
    "address": "nibi1sender..."
  },
  "contract": "nibi1...",
  "msgs": [
    {
      "contractAddress": "nibi1factory...",
      "msg": {
        "execute_swap_request": {
          "amount_in": "1000000",
          "asset_in": {
            "token": "nibi",
            "token_type": {
              "native": {
                "denom": "unibi"
              }
            }
          },
          "asset_out": "euclid",
          "cross_chain_addresses": [
            {
              "user": {
                "chain_uid": "osmosis",
                "address": "osmo1abc..."
              },
              "limit": {
                "less_than_or_equal": "950000"
              }
            }
          ],
          "min_amount_out": "950000",
          "partner_fee": {
            "partner_fee_bps": 10,
            "recipient": "nibi1xyz..."
          },
          "swaps": [
            {
              "token_in": "nibi",
              "token_out": "euclid"
            }
          ]
        }
      },
      "funds": [
        {
          "denom": "unibi",
          "amount": "1000000"
        }
      ]
    }
  ],
  "rpc_url": "https://rpc.testnet-2.nibiru.fi",
  "rest_url": "https://lcd.testnet-2.nibiru.fi"
}`
    }
  ]}
/>

### EVM

<Tabs
  tabs={[
    {
      id: 'evm-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/execute/swap' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "amount_in": "100000000000000000",
    "slippage": "0.01",
    "asset_in": {
      "token": "ron",
      "token_type": {
        "native": { "denom": "ron" }
      }
    },
    "minimum_receive": "900000",
    "cross_chain_addresses": [
      {
        "user": {
          "address": "0x72bbb...",
          "chain_uid": "amoy"
        },
        "limit": {
          "less_than_or_equal": "900000"
        }
      }
    ],
    "partnerFee": {
      "partner_fee_bps": 10,
      "recipient": "0x72bbb..."
    },
    "sender": {
      "address": "0x72bbb...",
      "chain_uid": "ronin"
    },
    "swap_path": {
      "path": [
        {
          "route": ["ron", "euclid"],
          "dex": "euclid",
          "amount_in": "100000000000000000",
          "amount_out": "900000",
          "chain_uid": "vsl"
        }
      ]
    }
}'`
    },
    {
      id: 'evm-response',
      label: 'Response',
      language: 'json',
      content: `
      {
  "chain_id": "2021",
  "contract": "0x7f2cc9fe79961f628da671ac62d1f2896638edd5",
  "meta": "{\"asset_in_type\":\"native\",\"releases\":[{\"dex\":\"euclid\",\"release_address\":[{\"chain_uid\":\"amoy\",\"address\":\"0x72bbb...\",\"amount\":\"900000\"}],\"token\":\"euclid\",\"amount\":\"\"}],\"swaps\":{\"path\":[{\"route\":[\"ron\",\"euclid\"],\"dex\":\"euclid\",\"chain_uid\":\"vsl\",\"amount_in\":\"100000000000000000\",\"amount_out\":\"3827226\"}]}}",
  "msgs": [
    {
      "chainId": "2021",
      "to": "0x7f...",
      "data": "0x6e31c749000...",
      "value": "0x16345785d8a0000"
    }
  ],
  "rest_url": "",
  "rpc_url": "",
  "sender": "0x72bbb...",
  "type": "evm"
}
      `
    }
  ]}
/>


### Parameters
:::tip
The dex field inside each swap_path step allows you to specify which decentralized exchange to use for that segment of the route. For example, setting`"dex": "euclid"` means the swap will use liquidity from Euclid’s unified liquidity layer. However, you can also route your swap through other supported DEXs by specifying their name, such as `"dex": "osmosis"` or `"dex": "astroport"`.
:::

| **Field**                 | **Type**                                                                                             | **Description**                                                                 |
|---------------------------|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| `amount_in`               | `string`                                                                                             | The amount of the input token to be swapped.                |
| `asset_in`                | [`TokenWithDenom`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#tokenwithdenom)             | The token and type being sent in.                                              |
| `minimum_receive`         | `string`                                                                                             | The minimum acceptable amount of output tokens for the swap to be considered a success.                              |
| `cross_chain_addresses`   | [`CrossChainUserWithLimit`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuserwithlimit)`[]` | Optional set of addresses to specify where the asset_out should be released. The first element specified in the vector has highest priority and so on. Defaults to the sender. Defaults to the sender.                                |
| `partnerFee`              | `object`                                                                                             | Optional fee configuration (BPS + recipient address).                          |
| `sender`                  | [`CrossChainUser`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuser)             | Address and chain initiating the swap. Defaults to sender.                                     |
| `swap_path`               | `object`                                                                                             | Full routing path, including token hops and chain UID.                         |
