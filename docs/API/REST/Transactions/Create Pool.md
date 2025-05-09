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
      id: 'cosmos-create-request',
      label: 'Request',
      language: 'bash',
      content: `curl --request POST \\
  --url https://testnet.api.euclidprotocol.com/api/v1/execute/pool/create \\
  --header 'content-type: application/json' \\
  --data '{
  "sender": {
    "address": "cosmos1sender...",
    "chain_uid": "osmosis"
  },
  "pair": {
    "token_1": {
      "token": "atom",
      "token_type": {
        "native": {
          "denom": "uatom"
        }
      },
      "amount": "5000000"
    },
    "token_2": {
      "token": "osmo",
      "token_type": {
        "smart": {
          "contract_address": "osmo1cw20token..."
        }
      },
      "amount": "5000000"
    }
  },
  "slippage_tolerance_bps": 30,
  "lp_token_name": "ATOM.OSMO",
  "lp_token_decimal": 6,
  "lp_token_symbol": "ATOMOSMO",
  "lp_token_marketing": {
    "project": "Euclid Protocol",
    "description": "Liquidity pool token for ATOM-OSMO pair"
  },
  "pool_config": {
    "pool_type": "stable",
    "amp_factor": null
  },
  "timeout": "3600"
}'`
    },
    {
      id: 'cosmos-create-response',
      label: 'Response',
      language: 'json',
      content: `{
  "type": "cosmwasm",
  "sender": {
    "chain_uid": "osmosis",
    "address": "cosmos1sender..."
  },
  "contract": "osmo1r8ywf5evunej823x5lagt9ln5leqdgdfplqvkas54cgtkzlvdqgsl36575",
  "chain_id": "osmo-test-5",
  "rpc_url": "https://rpc.testnet.osmosis.zone",
  "rest_url": "https://lcd.testnet.osmosis.zone",
  "msgs": [
    {
      "contractAddress": "osmo1r8ywf5evunej823x5lagt9ln5leqdgdfplqvkas54cgtkzlvdqgsl36575",
      "msg": {
        "request_pool_creation": {
          "lp_token_decimal": 6,
          "lp_token_marketing": {
            "project": "Euclid Protocol",
            "description": "Liquidity pool token for ATOM-OSMO pair",
            "marketing": "",
            "logo": {}
          },
          "lp_token_name": "ATOM.OSMO",
          "lp_token_symbol": "ATOMOSMO",
          "pair": {
            "token_1": {
              "token": "atom",
              "token_type": {
                "native": {
                  "denom": "uatom"
                }
              },
              "amount": "5000000"
            },
            "token_2": {
              "token": "osmo",
              "token_type": {
                "smart": {
                  "contract_address": "osmo1cw20token..."
                }
              },
              "amount": "5000000"
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
      "data": "0x095ea7b3000000000000000000000000c3b9297130e49e0e514884cca150435a1324865b0000000000000000000000000000000000000000000000004563918244f40000",
      "gasLimit": "0x186A0",
      "to": "0x3c4e17b9056272ce1b49f6900d8cfd6171a1869d",
      "value": "0x0"
    },
    {
      "chainId": "84532",
      "data": "0x327bc3f90000...",
      "gasLimit": "0x493E0",
      "to": "0xc3b9297130e49e0e514884cca150435a1324865b",
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
| `sender`                  | [`CrossChainUser`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuser) | Address and chain initiating the transaction. Defaults to sender.              |
| `pair`                    | [`PairWithDenomAndAmount`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#pairwithdenomandamount) | Contains both tokens with types and amounts.                                   |
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