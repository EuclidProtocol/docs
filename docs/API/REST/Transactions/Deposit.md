---
sidebar_position: 8
---
import Tabs from '@site/src/components/Tabs';

# Deposit

Exchanges native or smart tokens to voucher tokens and sends them to the specified recipient address.


### Request URL

```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/token/deposit
```


## Case 1: Deposit to On-Chain Address

Use this approach when depositing to a recipient identified by a standard **wallet address and chain UID**. This is the most common format when the destination is a known address on a blockchain like Monad, Osmosis, Ethereum, etc.

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
  "contract": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q",
  "chain_id": "injective-888",
  "rpc_url": "https://injective-testnet-rpc.publicnode.com",
  "rest_url": "https://testnet.sentry.lcd.injective.network",
  "msgs": [
    {
      "contractAddress": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q",
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
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/token/deposit' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "amount_in": "2000000000000000000",
    "asset_in": {
      "token": "stt",
      "token_type": {
        "native": {
          "denom": "stt"
        }
      }
    },
    "sender": {
    "chain_uid": "0g",
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1"
  },
    "recipient": {
      "chain_uid": "somnia",
      "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1"
    },
    "timeout": "60"
}'`
    },
    {
      id: 'evm-deposit-response',
      label: 'Response',
      language: 'json',
      content: `{
  "claimer": {
    "public_secret": "",
    "otp": "",
    "_id": "",
    "created_at": "0001-01-01T00:00:00Z"
  },
  "msgs": [
    {
      "chainId": "16601",
      "data": "0xaf18a6d700000000...",
      "gasLimit": "0x493E0",
      "to": "0x171931f5670037173b9db13ab83186adab350cf2",
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
| `asset_in`      | [`TokenWithDenom`](../../common%20types.md#tokenwithdenom)     | Token being deposited along with its type (native or smart).                                |
| `sender`        | [`CrossChainUser`]((../../common%20types.md#crosschainuser)     | Address and chain initiating the deposit.                                                   |
| `recipient`     | [`CrossChainUser`](../../common%20types.md#crosschainuser)    | Destination address and chain for the deposited asset.                                      |



## Case 2: Deposit to Social Recipient

Use this approach when depositing tokens using a **social identity** such as an email, Twitter handle, or Telegram username, instead of requiring a wallet address.  


> You may provide an optional `pub_key`, or let the system generate one automatically.

### How It Works
When using a social identifier (like email, Twitter, or Telegram), the system creates a **claim link** instead of sending tokens directly to a blockchain address. This link can be shared with the recipient, who can then:

- Authenticate using the specified identity (e.g., email)
- Choose which chain they want to withdraw the funds to
- Receive the tokens on their own wallet address on that chain


### CosmWasm

<Tabs
  tabs={[
    {
      id: 'cosmos-deposit-social-request',
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
    "social": {
      "email": "hello@example.com"
    }
  }
}'`
    },
  {
     id: 'evm-deposit-response',
      label: 'Response',
      language: 'json',
      content: `{
  "type": "cosmwasm",
  "sender": {
    "chain_uid": "injective",
    "address": "inj1eppts..."
  },
  "contract": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q",
  "chain_id": "injective-888",
  "rpc_url": "https://injective-testnet-rpc.publicnode.com",
  "rest_url": "https://testnet.sentry.lcd.injective.network",
  "msgs": [
    {
      "contractAddress": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q",
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
          "msg": "eyJjcmVhdGVfdm91Y2hlc...",
          "recipient": {
            "chain_uid": "neuron",
            "address": "euclid16f2t3yyax8ahau7g37v4r6vl65py3mh6wg63kzvz39mknc7txgms72dpe4",
            "social": {
              "email": "hello@example.com"
            }
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
  ],
  "claimer": {
    "public_secret": "BGsAjEECTeHspZF8rzBAVHj4yNMQkebwa4bp7Q/KuEkcu4xCOuR9qb7D1rPzZqN2mqn12Uwp0Idl3CFw+hSpoFs=",
    "otp": "vzNexm",
    "_id": "68c1a4c7468df3a1b51363ea",
    "social": {
      "email": "hello@example.com"
    },
    "created_at": "2025-09-10T16:18:15.010858502Z",
    "sender": {
      "chain_uid": "injective",
      "address": "inj1eppts..."
    }
  }
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
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/token/deposit' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "amount_in": "2000000000000000000",
    "asset_in": {
      "token": "stt",
      "token_type": {
        "native": {
          "denom": "stt"
        }
      }
    },
    "sender": {
      "chain_uid": "0g",
      "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1"
    },
    "recipient": {
      "social": {
        "email": "hello@example.com"
      }
    },
    "timeout": "60"
}'`
    },
    {
      id: 'evm-deposit-response',
      label: 'Response',
      language: 'json',
      content: `{
  "claimer": {
    "public_secret": "BGD3GhXfHo7zDqcSsDEJuPV7GD+eQ3UifvclndGbVitHZlMAZkqbzW7y0c8X/ayz78UX4lYXV/KoYEyu+Nq8FzM=",
    "otp": "LGdL6B",
    "_id": "68c19e0749cfdc66a2340bb4",
    "social": {
      "email": "hello@example.com"
    },
    "created_at": "2025-09-10T15:49:27.564391531Z",
    "sender": {
      "chain_uid": "0g",
      "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1"
    }
  },
  "msgs": [
    {
      "chainId": "16601",
      "data": "0xaf18a6d7...",
      "gasLimit": "0x493E0",
      "to": "0x171931f5670037173b9db13ab83186adab350cf2",
      "value": "0x1bc16d674ec80000"
    }
  ],
  "type": "evm"
}`
    }
  ]}
/>


### Parameters

| **Field**       | **Type**                                                                                     | **Description**                                                                                         |
|------------------|----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `amount_in`     | `string`                                                                                     | Amount of the token to be deposited (in raw base units, e.g., wei or uatom).                           |
| `asset_in`      | [`TokenWithDenom`](../../common%20types.md#tokenwithdenom)      | Token being deposited along with its type (native or smart).                                           |
| `sender`        | [`CrossChainUser`](../../common%20types.md#crosschainuser)    | Address and chain initiating the deposit.                                                              |
| `recipient`     | `object`                                                                                     | Either a standard recipient with `chain_uid` and `address`, or a `social` recipient using `email`, `twitter`, or `telegram`. Social recipients generate a claim link that allows the user to withdraw on any chain. |


### Social Recipient Format Examples

```json
// Using email
"recipient": {
  "social": {
    "email": "hello@example.com"
  }
}

// Using telegram
"recipient": {
  "social": {
    "telegram": "@recipient_handle"
  }
}

// Using twitter with pub_key
"recipient": {
  "social": {
    "twitter": "@recipient_xyz",
    "pub_key": "abcd1234efgh5678ijkl9012mnop3456qrst7890uvwx"
  }
}