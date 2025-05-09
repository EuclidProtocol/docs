---
sidebar_position: 3 
---
import Tabs from '@site/src/components/Tabs';

# Add Liquidity Request 

Generates a transaction to add liquidity to a pool.

### Request URL
 
```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/liquidity/add
```


### CosmWasm

<Tabs
  tabs={[
    {
      id: 'cosmos-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/execute/liquidity/add' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "slippage_tolerance_bps": 100,
    "timeout": "60",
    "pair_info": {
      "token_1": {
        "token": "injective",
        "token_type": {
          "native": {
            "denom": "uinj"
          }
        },
        "amount": "1000000"
      },
      "token_2": {
        "token": "euclid",
        "token_type": {
          "smart": {
            "contract_address": "inj1contractaddress..."
          }
        },
        "amount": "250000"
      }
    },
    "sender": {
      "address": "inj1useraddress...",
      "chain_uid": "injective"
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
    "chain_uid": "injective",
    "address": "inj1useraddress..."
  },
  "contract": "inj1sdmz25644p2nn2zse5ntrkw7cf6g7th0amtdpu",
  "chain_id": "injective-888",
  "rpc_url": "https://injective-testnet-rpc.publicnode.com",
  "rest_url": "https://testnet.sentry.lcd.injective.network",
  "msgs": [
    {
      "contractAddress": "inj1contractaddress...",
      "msg": {
        "increase_allowance": {
          "amount": "250000",
          "spender": "inj1sdmz25644p2nn2zse5ntrkw7cf6g7th0amtdpu"
        }
      },
      "funds": []
    },
    {
      "contractAddress": "inj1sdmz25644p2nn2zse5ntrkw7cf6g7th0amtdpu",
      "msg": {
        "add_liquidity_request": {
          "pair_info": {
            "token_1": {
              "amount": "1000000",
              "token": "injective",
              "token_type": {
                "native": {
                  "denom": "uinj"
                }
              }
            },
            "token_2": {
              "amount": "250000",
              "token": "euclid",
              "token_type": {
                "smart": {
                  "contract_address": "inj1contractaddress..."
                }
              }
            }
          },
          "slippage_tolerance_bps": 100,
          "timeout": "60"
        }
      },
      "funds": [
        {
          "denom": "uinj",
          "amount": "1000000"
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
      id: 'evm-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/execute/liquidity/add' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "slippage_tolerance_bps": 100,
    "timeout": "60",
    "pair_info": {
      "token_1": {
        "token": "ron",
        "token_type": {
          "native": {
            "denom": "ron"
          }
        },
        "amount": "100000000000000000"
      },
      "token_2": {
        "token": "euclid",
        "token_type": {
          "smart": {
            "contract_address": "0xeuclidtoken..."
          }
        },
        "amount": "250000"
      }
    },
    "sender": {
      "address": "0x72bbb...",
      "chain_uid": "ronin"
    }
}'`
    },
    {
      id: 'evm-response',
      label: 'Response',
      language: 'json',
      content: `{
  "msgs": [
    {
      "chainId": "2021",
      "data": "0x095ea7b30000...",
      "gasLimit": "0x186A0",
      "to": "0xeuclidtoken...",
      "value": "0x0"
    },
    {
      "chainId": "2021",
      "data": "0x08c9bfe4000000...",
      "gasLimit": "0x493E0",
      "to": "0x7f2cc9fe79961f628da671ac62d1f2896638edd5",
      "value": "0x16345785d8a0000"
    }
  ],
  "type": "evm"
}`
    }
  ]}
/>


### Parameters 

| **Field**                 | **Type**                                                                                                   | **Description**                                                                 |
|---------------------------|------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| `slippage_tolerance_bps`  | `int`                                                                                                      | Max slippage allowed, in basis points (e.g. 100 = 1%).                         |
| `timeout`                 | `string`                                                                                                      | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified.                                    |
| `pair_info`               | [`PairWithDenomAndAmount`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#pairwithdenomandamount)  | Token pair with amounts and token types.                                       |
| `sender`                  | [`CrossChainUser`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuser)                  | Wallet address and chain UID of the sender.                                    |