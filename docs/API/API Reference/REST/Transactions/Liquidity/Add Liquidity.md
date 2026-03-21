---
sidebar_position: 3 
---
import Tabs from '@site/src/components/Tabs';

# Add Liquidity Request 

Generates a transaction to add liquidity to a pool.

### Request URL

**Method:** `POST`
 
```bash
https://api.euclidprotocol.com/api/v1/execute/liquidity/add
```

### Examples

<Tabs
  tabs={[
    {
      id: 'evm-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://api.euclidprotocol.com/api/v1/execute/liquidity/add' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "slippage_tolerance_bps": 100,
    "timeout": "60",
    "pair_info": {
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
    "sender": {
      "address": "0x1111111111111111111111111111111111111111",
      "chain_uid": "polygon"
    }
}'`
    },
    {
      id: 'evm-response',
      label: 'EVM Response',
      language: 'json',
      content: `{
  "msgs": [
    {
      "chainId": "137",
      "data": "0x095ea7b300000000000000000000000008e6604931e9c2a978d4861b912f7894cc6063f700000000000000000000000000000000000000000000000000000000000f4240",
      "gasLimit": "0x186A0",
      "to": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      "value": "0x0"
    },
    {
      "chainId": "137",
      "data": "0x095ea7b300000000000000000000000008e6604931e9c2a978d4861b912f7894cc6063f700000000000000000000000000000000000000000000000000000000000f4240",
      "gasLimit": "0x186A0",
      "to": "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
      "value": "0x0"
    },
    {
      "chainId": "137",
      "data": "0x1d53cc080000000000000000000000000000000000000000000000000000000000000060...",
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
  'https://api.euclidprotocol.com/api/v1/execute/liquidity/add' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "slippage_tolerance_bps": 100,
    "pair_info": {
      "token_1": {
        "token": "euclid",
        "token_type": {
          "smart": {
            "contract_address": "inj1c9s44gr4jqzt9q44xq5as8smsspc8u6qu8ct8w"
          }
        },
        "amount": "900000000"
      },
      "token_2": {
        "token": "inj",
        "token_type": {
          "native": {
            "denom": "inj"
          }
        },
        "amount": "246867"
      }
    },
    "sender": {
      "address": "inj1y2n2fysm3r9t09kw9gmgfnpu746g8yu0pl24en",
      "chain_uid": "injective"
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
    "chain_uid": "injective",
    "address": "inj1y2n2fysm3r9t09kw9gmgfnpu746g8yu0pl24en"
  },
  "contract": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q",
  "chain_id": "injective-888",
  "rpc_url": "https://injective-testnet-rpc.publicnode.com",
  "rest_url": "https://testnet.sentry.lcd.injective.network",
  "msgs": [
    {
      "contractAddress": "inj1c9s44gr4jqzt9q44xq5as8smsspc8u6qu8ct8w",
      "msg": {
        "increase_allowance": {
          "amount": "900000000",
          "spender": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q"
        }
      },
      "funds": []
    },
    {
      "contractAddress": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q",
      "msg": {
        "add_liquidity_request": {
          "pair_info": {
            "token_1": {
              "amount": "900000000",
              "token": "euclid",
              "token_type": {
                "smart": {
                  "contract_address": "inj1c9s44gr4jqzt9q44xq5as8smsspc8u6qu8ct8w"
                }
              }
            },
            "token_2": {
              "amount": "246867",
              "token": "inj",
              "token_type": {
                "native": {
                  "denom": "inj"
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
          "denom": "inj",
          "amount": "246867"
        }
      ]
    }
  ]
}`
    }
  ]}
/>

### Parameters 

| **Field**                 | **Type**                                                                                                   | **Description**                                                                 |
|---------------------------|------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| `slippage_tolerance_bps`  | `int`                                                                                                      | Max slippage allowed, in basis points (e.g. 100 = 1%).                         |
| `timeout`                 | `string`                                                                                                      | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified.                                    |
| `pair_info`               | [`PairWithDenomAndAmount`](/docs/API/API%20Reference/common%20types.md#pairwithdenomandamount) | Token pair with amounts and token types.                                       |
| `sender`                  | [`CrossChainUserWithAmount`](/docs/API/API%20Reference/common%20types.md#crosschainuserwithamount)                | Wallet address and chain UID of the sender.                                    |
