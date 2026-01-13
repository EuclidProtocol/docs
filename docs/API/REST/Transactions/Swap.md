---
sidebar_position: 1
---
import Tabs from '@site/src/components/Tabs';

# Swap Request

Generate a transaction payload for a swap request.

## Endpoint

**Method:** `POST`

```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/swap
```

## Examples

<Tabs
  tabs={[
    {
      id: 'cosmos-request',
      label: 'Cosmos Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "amount_in": "100000000000000000",
    "asset_in": {
      "token": "bsc",
      "amount": "100000000000000000",
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
          "chain_uid": "0g",
          "amount": "50000000"
        },
        "limit": {
          "less_than_or_equal": "3563664058479"
        },
        "preferred_denom": {
          "native": {
            "denom": "bsc"
          }
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
      label: 'Cosmos Response',
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
          "msg": "eyJzd2FwI..."
        }
      },
      "funds": []
    }
  ],
  "meta": "{\"asset_in_type\":\"smart\",\"releases\":[{\"dex\":\"euclid\",\"release_address\":[{\"chain_uid\":\"0g\",\"address\":\"0x887e4aac216674d2c432798f851c1ea5d505b2e1\",\"amount\":\"3563664058479\"}],\"token\":\"bnb\",\"amount\":\"\"}],\"swaps\":{\"path\":[{\"route\":[\"euclid\",\"bnb\"],\"dex\":\"euclid\",\"chain_uid\":\"\",\"amount_in\":\"100000000000000000\",\"amount_out\":\"8152420272192926720\"}]}}"
}`
    },
    {
      id: 'evm-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount_in": "100000000000000000",
  "asset_in": {
    "token": "codewizard.eucl",
    "amount": "100000000000000000",
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
        "chain_uid": "0g",
        "amount": "50000000"
      },
      "limit": {
        "less_than_or_equal": "3563664058479"
      },
      "native": {
        "denom": "euclid"
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
      label: 'EVM Response',
      language: 'json',
      content: `{
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
}`
    }
  ]}
/>

## Parameters

:::tip
The `dex` field inside each `swap_path` step specifies which decentralized exchange (DEX) to use for that segment of the route. For example, setting `"dex": "euclid"` means the swap will use liquidity from Euclid's unified liquidity layer.

You can also route your swap through other supported DEXs by specifying their names, such as `"dex": "osmosis"` or `"dex": "astroport"`.

These routes, including the exact sequence of tokens and DEXs to be used, are obtained by calling the [Get Routes endpoint](../Routes/Get%20Routes.md). The response will include one or more route options detailing the path and associated DEX for each hop. You should use the selected route in your actual swap call.
:::

| Field | Type | Required | Description |
|---|---|---|---|
| `amount_in` | `string` | Yes | Amount of the input token to be swapped. |
| `asset_in` | [`TokenWithDenom`](../../common%20types.md#tokenwithdenom) | Yes | Input token and its type (either `native` or `smart`). |
| `slippage` | `string` | Yes | Slippage tolerance in basis points (e.g., `"500"` for 5%). |
| `minimum_receive` | `string` | No | Minimum acceptable output amount for the swap. |
| `cross_chain_addresses` | [`CrossChainUserWithLimit`](../../common%20types.md#crosschainaddresswithlimit)`[]` | No | Recipients for the output asset. Priority is top-down. Defaults to the sender if omitted. |
| `partnerFee` | [`PartnerFee`](#partnerfee) | No | Partner fee configuration. Includes basis points and recipient. |
| `sender` | [`CrossChainUser`](../../common%20types.md#crosschainuser) | Yes | Address and chain initiating the swap. |
| `swap_path` | [`SwapPath`](#swappath) | Yes | Routing path with token hops and DEX info. Use values from the [Get Routes](../Routes/Get%20Routes.md) endpoint. |
| `timeout` | `string` | No | Timeout in seconds. Default is `60`. Must be between `30` and `240`. |

### SwapPath

| Field | Type | Required | Description |
|---|---|---|---|
| `path` | `object[]` | Yes | Steps for the swap route, each defining a DEX and token route. |

#### Each path object

| Field | Type | Required | Description |
|---|---|---|---|
| `route` | `string[]` | Yes | Token sequence for the step (e.g., `["usdc", "euclid", "eth"]`). |
| `dex` | `string` | Yes | DEX used for this step (e.g., `"euclid"`, `"osmosis"`). |
| `chain_uid` | `string` | No | UID of the chain where this step is executed. |
| `amount_in` | `string` | No | Input amount for this step (usually calculated automatically). |
| `amount_out` | `string` | No | Estimated output amount for this step. |

### PartnerFee

| Field | Type | Required | Description |
|---|---|---|---|
| `partner_fee_bps` | `number` | Yes | Fee in basis points (e.g., `10` = 0.1%). |
| `recipient` | `string` | Yes | Address to receive the fee (typically on the same chain as `sender`). |
