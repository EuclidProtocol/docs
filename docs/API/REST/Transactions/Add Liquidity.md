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
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/liquidity/add' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "slippage_tolerance_bps": 100,
    "pair_info": {
      "token_1": {
        "token": "euclid",
        "token_type": {
          "smart": {
            "contract_address": "nibi17zymknww0ynlgtad22dzgy6kp6qzeg28gmvm5aq32avf9248rvasxtgxuv"
          }
        },
        "amount": "900000000"
      },
      "token_2": {
        "token": "nibi",
        "token_type": {
          "native": {
            "denom": "unibi"
          }
        },
        "amount": "246867"
      }
    },
    "sender": {
      "address": "nibi1l0wgje0y43007xpdqkuxaxluffuxj7fy7eccns",
      "chain_uid": "nibiru"
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
    "address": "nibi1l0wgje0y43007xpdqkuxaxluffuxj7fy7eccns"
  },
  "contract": "nibi1ljsgwzz4zwzuk96f6s20rfemddn6m5lrkmsdyms8at7j5jvk67rqqjl6lq",
  "chain_id": "nibiru-testnet-2",
  "rpc_url": "https://rpc.testnet-2.nibiru.fi",
  "rest_url": "https://lcd.testnet-2.nibiru.fi",
  "msgs": [
    {
      "contractAddress": "nibi17zymknww0ynlgtad22dzgy6kp6qzeg28gmvm5aq32avf9248rvasxtgxuv",
      "msg": {
        "increase_allowance": {
          "amount": "900000000",
          "spender": "nibi1ljsgwzz4zwzuk96f6s20rfemddn6m5lrkmsdyms8at7j5jvk67rqqjl6lq"
        }
      },
      "funds": []
    },
    {
      "contractAddress": "nibi1ljsgwzz4zwzuk96f6s20rfemddn6m5lrkmsdyms8at7j5jvk67rqqjl6lq",
      "msg": {
        "add_liquidity_request": {
          "pair_info": {
            "token_1": {
              "amount": "900000000",
              "token": "euclid",
              "token_type": {
                "smart": {
                  "contract_address": "nibi17zymknww0ynlgtad22dzgy6kp6qzeg28gmvm5aq32avf9248rvasxtgxuv"
                }
              }
            },
            "token_2": {
              "amount": "246867",
              "token": "nibi",
              "token_type": {
                "native": {
                  "denom": "unibi"
                }
              }
            }
          },
          "slippage_tolerance_bps": 100,
          "timeout": null
        }
      },
      "funds": [
        {
          "denom": "unibi",
          "amount": "246867"
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
      "data": "0x095ea7b300...",
      "gasLimit": "0x186A0",
      "to": "0xeuclidtoken...",
      "value": "0x0"
    },
    {
      "chainId": "2021",
      "data": "0x08c9bfe400000...",
      "gasLimit": "0x493E0",
      "to": "0x43d4759e0cb8e4d3b2aab1ba6e39a60dce1a8f5b",
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
| `pair_info`               | [`PairWithDenomAndAmount`](../../common%20types.md#pairwithdenomandamount) | Token pair with amounts and token types.                                       |
| `sender`                  | [`CrossChainUser`](../../common%20types.md#crosschainuser)                | Wallet address and chain UID of the sender.                                    |