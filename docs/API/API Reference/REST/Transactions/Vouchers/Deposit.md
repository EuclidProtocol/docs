---
sidebar_position: 8
---
import Tabs from '@site/src/components/Tabs';

# Deposit

Exchanges native or smart tokens to voucher tokens and sends them to the specified recipient address.

<details>
<summary><strong>Related Queries</strong></summary>

- [All Tokens](/docs/API/API%20Reference/GQL/Router/All%20Tokens): Use this query to fetch valid token IDs for `asset_in.token`.
- [Token Denoms](/docs/API/API%20Reference/GQL/Token/Token%20Denoms): Use this query to fetch the correct `token_type` value for `asset_in.token_type`.
- [All Chains](/docs/API/API%20Reference/GQL/Router/All%20Chains): Use this query to fetch valid destination chain UIDs for on-chain `recipient.chain_uid`. In most integrations, `sender.chain_uid` is derived from the connected wallet or source chain context.

</details>


### Request URL

**Method:** `POST`

```bash
https://api.euclidprotocol.com/api/v1/execute/token/deposit
```


## Case 1: Deposit to On-Chain Address

Use this approach when depositing to a recipient identified by a standard **wallet address and chain UID**. This is the most common format when the destination is a known address on a blockchain like Monad, Osmosis, Ethereum, etc.

### Examples

<Tabs
  tabs={[
    {
      id: 'evm-deposit-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://api.euclidprotocol.com/api/v1/execute/token/deposit' \
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
      label: 'EVM Response',
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
      "chainId": "16661",
      "data": "0x3c29ede800000000...",
      "gasLimit": "0x493E0",
      "to": "0x08E6604931E9c2a978D4861b912f7894CC6063F7",
      "value": "0x1bc16d674ec80000"
    }
  ],
  "type": "evm"
}`


    },
    {
      id: 'cosmos-deposit-request',
      label: 'Cosmos Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://api.euclidprotocol.com/api/v1/execute/token/deposit' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
  "amount_in": "2000000",
  "asset_in": {
    "token": "usdc",
    "token_type": {
      "native": {
        "denom": "factory/inj17vytdwqczqz72j65saukplrktd4gyfme5agf6c/usdc"
      }
    }
  },
 "sender": {
  "chain_uid": "injective",
  "address": "inj1y2n2fysm3r9t09kw9gmgfnpu746g8yu0pl24en"
},
  "recipient": {
    "chain_uid": "osmosis",
    "address": "osmo1468tkm9zh0fl8ragatwjuwz0v065zssadrunml"
  }
}'`
    },
    {
      id: 'cosmos-deposit-response',
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
      "contractAddress": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q",
      "msg": {
        "deposit_token": {
          "amount_in": "2000000",
          "asset_in": {
            "token": "usdc",
            "token_type": {
              "native": {
                "denom": "factory/inj17vytdwqczqz72j65saukplrktd4gyfme5agf6c/usdc"
              }
            }
          },
          "recipient": {
            "chain_uid": "osmosis",
            "address": "osmo1468tkm9zh0fl8ragatwjuwz0v065zssadrunml"
          },
          "timeout": null
        }
      },
      "funds": [
        {
          "denom": "factory/inj17vytdwqczqz72j65saukplrktd4gyfme5agf6c/usdc",
          "amount": "2000000"
        }
      ]
    }
  ]
}`
    }
  ]}
/>


### Parameters

| **Field**       | **Type**                                                                                     | **Description**                                                                              |
|------------------|----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `amount_in`     | `string`                                                                                     | Amount of the token to be deposited (in raw base units, e.g., wei or uatom).                |
| `asset_in`      | [`TokenWithDenom`](/docs/API/API%20Reference/common%20types.md#tokenwithdenom)     | Token being deposited along with its type (native or smart).                                |
| `sender`        | [`CrossChainUserWithAmount`](/docs/API/API%20Reference/common%20types.md#crosschainuserwithamount)     | Address and chain initiating the deposit.                                                   |
| `recipient`     | [`DepositRecipient`](#depositrecipient)    | Destination address and chain for the deposited asset.                                      |
| `timeout`       | `string`                                                                                     | Optional timeout in seconds.                                                                |

### DepositRecipient

| **Field**       | **Type**                                                                                     | **Description**                                                                              |
|------------------|----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `chain_uid`     | `string`                                                                                     | Destination chain UID when depositing to an on-chain address.                               |
| `address`       | `string`                                                                                     | Destination wallet address when depositing to an on-chain address.                          |
| `social`        | [`SocialRecipient`](#socialrecipient)                                                        | Social recipient identity used to generate a claim link.                                    |

### SocialRecipient

| **Field**       | **Type**                                                                                     | **Description**                                                                              |
|------------------|----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `email`         | `string`                                                                                     | Email recipient identifier.                                                                  |
| `telegram`      | `string`                                                                                     | Telegram username recipient identifier.                                                      |
| `twitter`       | `string`                                                                                     | Twitter/X handle recipient identifier.                                                       |
| `pub_key`       | `string`                                                                                     | Optional public key used for social-claim flows.                                             |



## Case 2: Deposit to Social Recipient

Use this approach when depositing tokens using a **social identity** such as an email, Twitter handle, or Telegram username, instead of requiring a wallet address.  


> You may provide an optional `pub_key`, or let the system generate one automatically.

### How It Works
When using a social identifier (like email, Twitter, or Telegram), the system creates a **claim link** instead of sending tokens directly to a blockchain address. This link can be shared with the recipient, who can then:

- Authenticate using the specified identity (e.g., email)
- Choose which chain they want to withdraw the funds to
- Receive the tokens on their own wallet address on that chain


### Examples

<Tabs
  tabs={[
    {
      id: 'evm-deposit-social-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://api.euclidprotocol.com/api/v1/execute/token/deposit' \
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
      id: 'evm-deposit-social-response',
      label: 'EVM Response',
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
    },
    {
      id: 'cosmos-deposit-social-request',
      label: 'Cosmos Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://api.euclidprotocol.com/api/v1/execute/token/deposit' \\
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
      id: 'cosmos-deposit-social-response',
      label: 'Cosmos Response',
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


### Parameters

| **Field**       | **Type**                                                                                     | **Description**                                                                                         |
|------------------|----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `amount_in`     | `string`                                                                                     | Amount of the token to be deposited (in raw base units, e.g., wei or uatom).                           |
| `asset_in`      | [`TokenWithDenom`](/docs/API/API%20Reference/common%20types.md#tokenwithdenom)      | Token being deposited along with its type (native or smart).                                           |
| `sender`        | [`CrossChainUserWithAmount`](/docs/API/API%20Reference/common%20types.md#crosschainuserwithamount)    | Address and chain initiating the deposit.                                                              |
| `recipient`     | [`DepositRecipient`](#depositrecipient)                                                      | Either a standard recipient with `chain_uid` and `address`, or a `social` recipient using `email`, `twitter`, or `telegram`. Social recipients generate a claim link that allows the user to withdraw on any chain. |
| `timeout`       | `string`                                                                                     | Optional timeout in seconds.                                                                                         |


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
```
