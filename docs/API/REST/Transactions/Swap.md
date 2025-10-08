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
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "amount_in": "100000000000000000",
    "asset_in": {
      "token": "bsc",
      "token_type": {
        "smart": {
          "contract_address": "0x3246d25b42f6b3deca5b40334775fa4d6e333010"
        }
      }
    },
    "slippage": "500",
    "cross_chain_addresses": [
      {
        "user": {
          "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
          "chain_uid": "0g"
        },
        "limit": {
          "less_than_or_equal": "3563664058479"
        }
      }
    ],
    "partnerFee": {
      "partner_fee_bps": 10,
      "recipient": "0x8ed341da628fb9f540ab3a4ce4432ee9b4f5d658"
    },
    "sender": {
      "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
      "chain_uid": "neuron"
    },
    "swap_path": {
      "path": [
        {
          "route": [
            "euclid",
            "bnb"
          ],
          "dex": "euclid"
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
    "chain_uid": "neuron",
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1"
  },
  "contract": "euclid1aagn260yt7xtvq0jdecxu265zqzkc6mhc4glql2q2nmdsqwzmyzs8lfhhx",
  "chain_id": "neuron-1",
  "rpc_url": "https://rpc.neuron.euclidprotocol.com",
  "rest_url": "https://lcd.neuron.euclidprotocol.com",
  "msgs": [
    {
      "contractAddress": "0x3246d25b42f6b3deca5b40334775fa4d6e333010",
      "msg": {
        "send": {
          "amount": "100000000000000000",
          "contract": "euclid1aagn260yt7xtvq0jdecxu265zqzkc6mhc4glql2q2nmdsqwzmyzs8lfhhx",
          "msg": "eyJzd2FwIjp7ImFzc2V0X2luIjp7In..."
        }
      },
      "funds": []
    }
  ],
  "meta": "{\"asset_in_type\":\"smart\",\"releases\":[{\"dex\":\"euclid\",\"release_address\":[{\"chain_uid\":\"0g\",\"address\":\"0x887e4aac216674d2c432798f851c1ea5d505b2e1\",\"amount\":\"3563664058479\"}],\"token\":\"bnb\",\"amount\":\"\"}],\"swaps\":{\"path\":[{\"route\":[\"euclid\",\"bnb\"],\"dex\":\"euclid\",\"chain_uid\":\"\",\"amount_in\":\"100000000000000000\",\"amount_out\":\"34452337010109902848\"}]}}"
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
  "asset_in": {
    "token": "codewizard.eucl",
    "token_type": {
      "smart": {
        "contract_address": "0x3246d25b42f6b3deca5b40334775fa4d6e333010"
      }
    }
  },
  "slippage": "500",
  "cross_chain_addresses": [
    {
      "user": {
        "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
        "chain_uid": "0g"
      },
      "limit": {
        "less_than_or_equal": "3563664058479"
      }
    }
  ],
  "partnerFee": {
    "partner_fee_bps": 10,
    "recipient": "0x8ed341da628fb9f540ab3a4ce4432ee9b4f5d658"
  },
  "sender": {
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "chain_uid": "bsc"
  },
  "swap_path": {
    "path": [
      {
        "route": [
          "bnb",
          "euclid"
        ],
        "dex": "euclid",
        "amount_in": "100000000000000000",
        "amount_out": "635340"
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
  "chain_id": "97",
  "contract": "0x62d8658a3d7c669943c95c781c220469e19beb47",
  "meta": "{\"asset_in_type\":\"smart\",\"releases\":[{\"dex\":\"euclid\",\"release_address\":[{\"chain_uid\":\"0g\",\"address\":\"0x887e4aac216674d2c432798f851c1ea5d505b2e1\",\"amount\":\"3563664058479\"}],\"token\":\"euclid\",\"amount\":\"\"}],\"swaps\":{\"path\":[{\"route\":[\"bnb\",\"euclid\"],\"dex\":\"euclid\",\"chain_uid\":\"\",\"amount_in\":\"100000000000000000\",\"amount_out\":\"635340\"}]}}",
  "msgs": [
    {
      "chainId": "97",
      "to": "0x3246d25b42f6b3deca5b40334775fa4d6e333010",
      "data": "0x095ea7b30000000000000000000000006...",
      "value": "0x0"
    },
    {
      "chainId": "97",
      "to": "0x62d8658a3d7c669943c95c781c220469e19beb47",
      "data": "0x6e31c74900000000000000000000...",
      "value": "0x0"
    }
  ],
  "rest_url": "https://bsc-testnet.drpc.org",
  "rpc_url": "https://bsc-testnet.drpc.org",
  "sender": {
    "chain_uid": "bsc",
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1"
  },
  "type": "evm"
}
      `
    }
  ]}
/>


### Parameters
:::tip
The dex field inside each swap_path step specifies which decentralized exchange (DEX) to use for that segment of the route. For example, setting "dex": "euclid" means the swap will use liquidity from Euclid’s unified liquidity layer.

You can also route your swap through other supported DEXs by specifying their names, such as "dex": "osmosis" or "dex": "astroport".

These routes, including the exact sequence of tokens and DEXs to be used, are obtained by calling the Get [Routes endpoint](../Routes/Get%20Routes.md). The response will include one or more route options detailing the path and associated DEX for each hop. You should use the selected route in your actual swap call.
:::

| **Field**                 | **Type**                                                                                             | **Description**                                                                 |
|---------------------------|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| `amount_in`               | `string`                                                                                             | The amount of the input token to be swapped.                                    |
| `asset_in`                | [`TokenWithDenom`](../../common%20types.md#tokenwithdenom)              | The input token and its type (either `native` or `smart`).                      |
| `slippage`                | `string`                                                                                             | Slippage tolerance in **basis points** (e.g., `"500"` for 5%).                  |
| `minimum_receive`         | `string`                                                                                             | The minimum acceptable amount of output tokens for the swap to be considered successful. |
| `cross_chain_addresses`   | [`CrossChainUserWithLimit`](../../common%20types.md#crosschainuserwithlimit)`[]` | List of recipients for the output asset. Priority is top-down. Defaults to the sender if not provided. |
| `partnerFee`              | [`PartnerFee`](#partnerfee)                                                                          | Optional partner fee configuration. Includes basis points and recipient.        |
| `sender`                  | [`CrossChainUser`](../../common%20types.md#crosschainuser)             | Address and chain initiating the swap.                                          |
| `swap_path`               | [`SwapPath`](#swappath)                                                                              | Routing path with token hops and DEX info. Use values from the [Get Routes](../Routes/Get%20Routes.md) endpoint. |
| `timeout`                 | `string`                                                                                             | *(Optional)* Timeout for the transaction in seconds. Default is `60`. Must be between `30` and `240`. |



#### `SwapPath`

| **Field** | **Type**       | **Description**                                                   |
|-----------|----------------|-------------------------------------------------------------------|
| `path`    | `object[]`     | An array of steps, where each step defines a DEX and token route to use. |

#### Each path object contains:

| **Field**     | **Type**     | **Description**                                                                 |
|---------------|--------------|---------------------------------------------------------------------------------|
| `route`       | `string[]`   | The sequence of tokens the swap will go through in this step. For example, `["usdc", "euclid", "eth"]` means `usdc → euclid → eth`. |
| `dex`         | `string`     | The name of the DEX used for this step (e.g., `"euclid"`, `"osmosis"`).         |
| `chain_uid`   | `string`     | *(Optional)* UID of the chain where this step is executed.                      |
| `amount_in`   | `string`     | *(Optional)* Input amount for this step. Usually calculated automatically.      |
| `amount_out`  | `string`     | *(Optional)* Estimated output amount for this step.                             |

#### PartnerFee
| **Field**           | **Type**   | **Description**                                                                 |
|---------------------|------------|---------------------------------------------------------------------------------|
| `partner_fee_bps`   | `number`   | Fee in basis points (e.g., `10` = 0.1%).                                        |
| `recipient`         | `string`   | Address to receive the fee (typically on the same chain as `sender`).          |