---
sidebar_position: 8
---
import Tabs from '@site/src/components/Tabs';

# Create Pool

Creates a new liquidity pool between two tokens.

### Request URL
```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/pool/create
```

### CosmWasm

<Tabs
  tabs={[
    {
      id: 'cosmos-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/pool/create' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "sender": {
      "chain_uid": "nibiru",
      "address": "nibi1l0wgje0y43007xpdqkuxaxluffuxj7fy7eccns"
    },
    "pair": {
      "token_1": {
        "token": "usdt",
        "token_type": {
          "native": {
            "denom": "uusdt"
          }
        },
        "amount": "1000000"
      },
      "token_2": {
        "token": "euclid",
        "token_type": {
          "smart": {
            "contract_address": "nibi17zymknww0ynlgtad22dzgy6kp6qzeg28gmvm5aq32avf9248rvasxtgxuv"
          }
        },
        "amount": "500000"
      }
    },
    "lp_token_name": "USDT.EUCLID",
    "lp_token_decimal": 6,
    "lp_token_symbol": "USDTEUCLID",
    "lp_token_marketing": {
      "project": "Euclid Protocol",
      "description": "Liquidity pool token for USDT-EUCLID on Nibiru",
      "marketing": "contact@euclidprotocol.com",
      "logo": {
        "url": "https://example.com/logo.png"
      }
    },
    "timeout": "3600",
    "slippage_tolerance_bps": 100
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
    "address": "nibi1l0wgje0y43007xpdqkuxaxluffuxj7fy7eccns"
  },
  "contract": "nibi1ljsgwzz4zwzuk96f6s20rfemddn6m5lrkmsdyms8at7j5jvk67rqqjl6lq",
  "chain_id": "nibiru-testnet-2",
  "rpc_url": "https://rpc.testnet-2.nibiru.fi",
  "rest_url": "https://lcd.testnet-2.nibiru.fi",
  "msgs": [
    {
      "contractAddress": "nibi1ljsgwzz4zwzuk96f6s20rfemddn6m5lrkmsdyms8at7j5jvk67rqqjl6lq",
      "msg": {
        "request_pool_creation": {
          "lp_token_decimal": 6,
          "lp_token_marketing": {
            "project": "Euclid Protocol",
            "description": "Liquidity pool token for USDT-EUCLID on Nibiru",
            "marketing": "contact@euclidprotocol.com",
            "logo": {
              "url": "https://example.com/logo.png"
            }
          },
          "lp_token_name": "USDT.EUCLID",
          "lp_token_symbol": "USDTEUCLID",
          "pair": {
            "token_1": {
              "token": "euclid",
              "token_type": {
                "smart": {
                  "contract_address": "nibi17zymknww0ynlgtad22dzgy6kp6qzeg28gmvm5aq32avf9248rvasxtgxuv"
                }
              },
              "amount": "500000"
            },
            "token_2": {
              "token": "usdt",
              "token_type": {
                "native": {
                  "denom": "uusdt"
                }
              },
              "amount": "1000000"
            }
          },
          "timeout": "3600"
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
      id: 'evm-create-request',
      label: 'Request',
      language: 'bash',
      content: `curl --request POST \\
  --url https://testnet.api.euclidprotocol.com/api/v1/execute/pool/create \\
  --header 'content-type: application/json' \\
  --data '{
  "sender": {
    "address": "0x887e4aac216674d2c432798f851C1Ea5d505b2E1",
    "chain_uid": "base"
  },
  "pair": {
    "token_1": {
      "token": "ron",
      "token_type": {
        "native": {
          "denom": "ron"
        }
      },
      "amount": "5000000000000000000"
    },
    "token_2": {
      "token": "axs",
      "token_type": {
        "smart": {
          "contract_address": "0x3c4e17b9056272ce1b49f6900d8cfd6171a1869d"
        }
      },
      "amount": "5000000000000000000"
    }
  },
  "slippage_tolerance_bps": 30,
  "lp_token_name": "RON.AXS",
  "lp_token_decimal": 18,
  "lp_token_symbol": "RONAXS",
  "pool_config": {
    "pool_type": "stable",
    "amp_factor": null
  },
  "timeout": "3600"
}'`
    },
    {
      id: 'evm-create-response',
      label: 'Response',
      language: 'json',
      content: `{
  "msgs": [
    {
      "chainId": "84532",
      "data": "0x095ea7b300...",
      "gasLimit": "0x186A0",
      "to": "0x3c4e17b9056272ce1b49f6900d8cfd6171a1869d",
      "value": "0x0"
    },
    {
      "chainId": "84532",
      "data": "0x327bc3f9000...",
      "gasLimit": "0x493E0",
      "to": "0x00a739e4479c97289801654ec1a52a67077613c0",
      "value": "0x4563918244f40000"
    }
  ],
  "type": "evm"
}`
    }
  ]}
/>


### Parameters

| **Field**                 | **Type**                                                       | **Description**                                                                 |
|---------------------------|----------------------------------------------------------------|---------------------------------------------------------------------------------|
| `sender`                  | [`CrossChainUser`](../../common%20types.md#crosschainuser) | Address and chain initiating the transaction. Defaults to sender.              |
| `pair`                    | [`PairWithDenomAndAmount`](../../common%20types.md#pairwithdenomandamount) | Contains both tokens with types and amounts.                                   |
| `slippage_tolerance_bps` | `u64`                                                          | Slippage tolerance in basis points (e.g., 30 = 0.3%).                          |
| `lp_token_name`           | `string`                                                       | Name of the liquidity pool token.                                              |
| `lp_token_symbol`         | `string`                                                       | Symbol of the liquidity pool token.                                            |
| `lp_token_decimal`        | `u8`                                                           | Number of decimals used in the LP token (typically 18 for EVM).                |
| `lp_token_marketing` | [`InstantiateMarketingInfo`](https://docs.rs/astroport/latest/astroport/token/struct.InstantiateMarketingInfo.html) | *(Ignored in EVM)* Optional marketing information for the LP token such as project name and description. Used only in Cosmos deployments. |
| `pool_config`             | [`PoolConfig`](#pool_config)                                                      | Config for the pool, such as pool type (e.g., stable, constant product) and amplification factor. Only used in EVM.    |
| `timeout`                 | `u64` (optional)                                               | Expiry timeout in seconds for this operation.                                  |


### `pool_config`

| **Field**    | **Type**         | **Description**                                                                 |
|--------------|------------------|---------------------------------------------------------------------------------|
| `poolType`   | `PoolTypeEnum`   | The type of pool. Can be `Stable` or `ConstantProduct`.                        |
| `ampFactor`  | `uint64`         | Optional amplification factor value. Required for `Stable` pools. Defaults to 1000 if not specified.        |

### PoolTypeEnum

| **Value**          | **Description**                                           |
|--------------------|-----------------------------------------------------------|
| `Stable`           | Used for stable pools where price impact is minimized.    |
| `ConstantProduct`  | Used for classic x*y=k constant product pools.            |