---
sidebar_position: 8
---
import Tabs from '@site/src/components/Tabs';

# Create Pool

Creates a new liquidity pool between two tokens.

<details>
<summary><strong>Related Queries</strong></summary>

- [All Tokens](/docs/API/API%20Reference/GQL/Router/All%20Tokens): Use this query to fetch valid token IDs for `pair.token_1.token` and `pair.token_2.token`.
- [Token Denoms](/docs/API/API%20Reference/GQL/Token/Token%20Denoms): Use this query to fetch the correct `token_type` values for each token in `pair`.
- [All Chains](/docs/API/API%20Reference/GQL/Router/All%20Chains): Use this query to validate supported chain UIDs. In most integrations, `sender.chain_uid` is derived from the connected wallet or source chain context.

</details>

### Request URL

**Method:** `POST`

```bash
https://api.euclidprotocol.com/api/v1/execute/pool/create
```

### Examples

<Tabs
  tabs={[
    {
      id: 'evm-create-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl --request POST \\
  --url https://api.euclidprotocol.com/api/v1/execute/pool/create \\
  --header 'content-type: application/json' \\
  --data '{
  "sender": {
    "address": "0x1111111111111111111111111111111111111111",
    "chain_uid": "polygon"
  },
  "pair": {
    "token_1": {
      "token": "usdt",
      "token_type": {
        "smart": {
          "contract_address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
        }
      },
      "amount": "1000000"
    },
    "token_2": {
      "token": "usdc",
      "token_type": {
        "smart": {
          "contract_address": "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359"
        }
      },
      "amount": "1000000"
    }
  },
  "slippage_tolerance_bps": 30,
  "lp_token_name": "USDT-USDC",
  "lp_token_decimal": 18,
  "lp_token_symbol": "USDTUSDC",
  "pool_config": {
    "pool_type": "stable",
    "amp_factor": null
  },
  "timeout": "3600"
}'`
    },
    {
      id: 'evm-create-response',
      label: 'EVM Response',
      language: 'json',
      content: `{
  "msgs": [
    {
      "chainId": "137",
      "data": "0x095ea7b300000000000000000000000008e6604931e9c2a978d4861b912f7894cc6063f700000000000000000000000000000000000000000000000000000000000f4240",
      "gasLimit": "0x186A0",
      "to": "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
      "value": "0x0"
    },
    {
      "chainId": "137",
      "data": "0x095ea7b300000000000000000000000008e6604931e9c2a978d4861b912f7894cc6063f700000000000000000000000000000000000000000000000000000000000f4240",
      "gasLimit": "0x186A0",
      "to": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      "value": "0x0"
    },
    {
      "chainId": "137",
      "data": "0x2037cccf00000000000000000000000000000000000000000000000000000000000000e0...",
      "gasLimit": "0x493E0",
      "to": "0x08E6604931E9c2a978D4861b912f7894CC6063F7",
      "value": "0x0"
    }
  ],
  "type": "evm"
}`
    },
    {
      id: 'cosmos-request',
      label: 'Cosmos Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://api.euclidprotocol.com/api/v1/execute/pool/create' \
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
      label: 'Cosmos Response',
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

### Parameters

| **Field**                 | **Type**                                                       | **Description**                                                                 |
|---------------------------|----------------------------------------------------------------|---------------------------------------------------------------------------------|
| `sender`                  | [`CrossChainUserWithAmount`](/docs/API/API%20Reference/common%20types.md#crosschainuserwithamount) | Address and chain initiating the transaction. Defaults to sender.              |
| `pair`                    | [`PairWithDenom`](/docs/API/API%20Reference/common%20types.md#pairwithdenom) | Contains both tokens with types and amounts.                                   |
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
