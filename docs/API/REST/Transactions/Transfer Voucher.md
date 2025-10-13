---
sidebar_position: 7
---
import Tabs from '@site/src/components/Tabs';

# Transfer Virtual Balance Tokens

Transfers virtual voucher tokens (vcoins) to a recipient, either directly to a wallet or via a social claim link.

### Request URL
```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/vcoin/transfer
```

## Case 1: Transfer to On-Chain Address

Use this format to transfer vcoins to a known wallet address on a specific chain.

### CosmWasm

<Tabs
  tabs={[{
    id: 'cosmos-vcoin-transfer-request',
    label: 'Request',
    language: 'bash',
    content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/vcoin/transfer' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "amount": "1000000",
    "token": "euclid",
    "sender": {
      "chain_uid": "osmosis",
      "address": "osmo1abcxyz..."
    },
    "recipient_address": {
      "user": {
        "address": "inj1xyz123...",
        "chain_uid": "injective"
      }
    },
    "timeout": null
}'`
},
    {
      id: 'cosmos-vcoin-response',
      label: 'Response',
      language: 'json',
      content: `{
  "type": "cosmwasm",
  "sender": {
    "chain_uid": "osmosis",
    "address": "osmo1abcxyz..."
  },
  "contract": "osmo1jwfn0rqv8gfwez54xdgxf5h8xvugcpdqrwu47dvwug45sy2g3wvqgax2c3",
  "chain_id": "osmo-test-5",
  "rpc_url": "https://rpc.testnet.osmosis.zone",
  "rest_url": "https://lcd.testnet.osmosis.zone",
  "msgs": [
    {
      "contractAddress": "osmo1jwfn0rqv8gfwez54xdgxf5h8xvugcpdqrwu47dvwug45sy2g3wvqgax2c3",
      "msg": {
        "transfer_virtual_balance": {
          "amount": "1000000",
          "recipient_address": {
            "chain_uid": "injective",
            "address": "inj1xyz123..."
          },
          "timeout": null,
          "token": "euclid"
        }
      },
      "funds": []
    }
  ]
}`
  }]} />

### EVM

<Tabs
  tabs={[{
    id: 'evm-vcoin-transfer-request',
    label: 'Request',
    language: 'bash',
    content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/vcoin/transfer' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "amount": "1000000",
    "token": "euclid",
    "sender": {
      "chain_uid": "base",
      "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1"
    },
    "recipient_address": {
      "user": {
        "address": "0x5abfe1234567890cdefabc1234567890defabc01",
        "chain_uid": "amoy"
      }
    },
    "timeout": null
}'`
},
    {
      id: 'cosmos-vcoin-response',
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
      "chainId": "84532",
      "data": "0xf2ef68ca000000...",
      "gasLimit": "0x493E0",
      "to": "0x00a739e4479c97289801654ec1a52a67077613c0",
      "value": "0x0"
    }
  ],
  "type": "evm"
}`
  }]} />

## Case 2: Transfer to Social Recipient

Use this format to send vouchers to a recipient identified via email, Twitter, or Telegram.

> The recipient will receive a claim link to withdraw funds to any chain after verifying their identity.

### CosmWasm

<Tabs
  tabs={[{
    id: 'cosmos-vcoin-transfer-social-request',
    label: 'Request',
    language: 'bash',
    content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/vcoin/transfer' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "amount": "1000000",
    "token": "euclid",
    "sender": {
      "chain_uid": "neuron",
      "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1"
    },
    "recipient_address": {
      "user": {
        "social": {
          "email": "hello@example.com"
        }
      }
    },
    "timeout": null
}'`
},
    {
      id: 'cosmos-vcoin-response',
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
      "contractAddress": "euclid1aagn260yt7xtvq0jdecxu265zqzkc6mhc4glql2q2nmdsqwzmyzs8lfhhx",
      "msg": {
        "transfer_virtual_balance": {
          "amount": "1000000",
          "msg": "eyJjcmVhdGVfdm91Y2hlcl9j...",
          "recipient_address": {
            "chain_uid": "neuron",
            "address": "euclid16f2t3yyax8ahau7g37v4r6vl65py3mh6wg63kzvz39mknc7txgms72dpe4"
          },
          "timeout": null,
          "token": "euclid"
        }
      },
      "funds": []
    }
  ],
  "claimer": {
    "public_secret": "BDfIjPyf2NRf5XS7JU6MDQiRdn2nUWYpf8o+5QEwip+9Xe/W7E39Qyq4LD97IqRG3jyypB6rFMBNhNY5LOdNOAI=",
    "otp": "KFEVeW",
    "_id": "68c1b1a95a6900a91ee48f00",
    "social": {
      "email": "hello@example.com"
    },
    "created_at": "2025-09-10T17:13:13.018060475Z",
    "sender": {
      "chain_uid": "neuron",
      "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1"
    }
  }
}`
  }]} />

### EVM

<Tabs
  tabs={[{
    id: 'evm-vcoin-transfer-social-request',
    label: 'Request',
    language: 'bash',
    content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/vcoin/transfer' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "amount": "1000000",
    "token": "euclid",
    "sender": {
      "chain_uid": "base",
      "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1"
    },
    "recipient_address": {
      "user": {
        "social": {
          "email": "hello@example.com"
        }
      }
    },
    "timeout": null
}'`
 },
    {
      id: 'cosmos-vcoin-response',
      label: 'Response',
      language: 'json',
      content: `{
  "claimer": {
    "public_secret": "BM1KMpH9lWivFx47fdepokMz1OYoW8NVlN53VtSF/ohm/lxutP0hHAu54XppChYSEZdel7rhjS5i6H3O+8JlP5I=",
    "otp": "tjssQK",
    "_id": "68c1b21ea6528cd2c9902283",
    "social": {
      "email": "hello@example.com"
    },
    "created_at": "2025-09-10T17:15:10.09659361Z",
    "sender": {
      "chain_uid": "base",
      "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1"
    }
  },
  "msgs": [
    {
      "chainId": "84532",
      "data": "0xf2ef68ca0000...",
      "gasLimit": "0x493E0",
      "to": "0x00a739e4479c97289801654ec1a52a67077613c0",
      "value": "0x0"
    }
  ],
  "type": "evm"
}`
  }]} />

### Parameters

| **Field**          | **Type**          | **Description**                                                                 |
|---------------------|-------------------|---------------------------------------------------------------------------------|
| `amount`            | `string`          | Amount of the virtual token to transfer (in base units).                       |
| `token`             | `string`          | Name of the virtual token to transfer (e.g. "euclid").                        |
| `sender`            | [`CrossChainUser`](../../common%20types.md#crosschainuser) | The address and chain initiating the transfer.                                  |
| `recipient_address` | `object`          | Either a standard recipient with `chain_uid` and `address`, or a `social` recipient using email, Twitter, or Telegram. |
| `timeout`           | `string \| null`  | Optional timeout value in seconds or as an ISO timestamp string.               |

### Social Recipient Format Examples

```json
// Using email
"recipient_address": {
  "user": {
    "social": {
      "email": "hello@example.com"
    }
  }
}

// Using telegram
"recipient_address": {
  "user": {
    "social": {
      "telegram": "@recipient_handle"
    }
  }
}

// Using twitter with pub_key
"recipient_address": {
  "user": {
    "social": {
      "twitter": "@recipient_xyz",
      "pub_key": "abcd1234efgh5678ijkl9012mnop3456qrst7890uvwx"
    }
  }
}
```
