---
sidebar_position: 5
---
import Tabs from '@site/src/components/Tabs';

# Meta Sign

Create a meta-transaction signature payload for one or more messages.

### Request URL

```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/meta-txn/sign
```

### Examples

<Tabs
  tabs={[
    {
      id: 'evm-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/meta-txn/sign' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "msgs": [
    {
      "msg": {
        "call_data": "{\\\"transfer\\\":{\\\"amount\\\":\\\"1000000\\\",\\\"from\\\":{\\\"chain_uid\\\":\\\"bsc\\\",\\\"address\\\":\\\"0x887e4aac216674d2c432798f851c1ea5d505b2e1\\\",\\\"amount\\\":\\\"1000000\\\"},\\\"msg\\\":\\\"\\\",\\\"recipient_address\\\":{\\\"user\\\":{\\\"chain_uid\\\":\\\"0g\\\",\\\"address\\\":\\\"0x5abfe1234567890cdefabc1234567890defabc01\\\",\\\"amount\\\":\\\"1000000\\\"},\\\"limit\\\":{\\\"less_than_or_equal\\\":\\\"1000000\\\"},\\\"preferred_denom\\\":{\\\"voucher\\\":{}},\\\"forwarding_message\\\":{\\\"data\\\":\\\"0x\\\"}},\\\"sender\\\":{\\\"chain_uid\\\":\\\"bsc\\\",\\\"address\\\":\\\"0x887e4aac216674d2c432798f851c1ea5d505b2e1\\\",\\\"amount\\\":\\\"1000000\\\"},\\\"timeout\\\":\\\"60\\\",\\\"token\\\":\\\"euclid\\\",\\\"tx_id\\\":\\\"\\\"}}",
        "target": "euclid1ywzqwvhmm58e02lvr579xlcn873kptl40a4teqnjd8t8kndfps7qdghdaq"
      },
      "type": "transfer_voucher"
    }
  ],
  "sender_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
  "sender_chain_uid": "bsc"
}'`
    },
    {
      id: 'evm-response',
      label: 'EVM Response',
      language: 'json',
      content: `{
  "meta": [
    {
      "type": "transfer_voucher",
      "token_in": "",
      "token_out": "",
      "token": "",
      "amount_in": "",
      "amount_out": ""
    }
  ],
  "payload": {
    "signer_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "signer_prefix": "0x",
    "signer_chain_uid": "bsc",
    "call_data": [
      {
        "target": "euclid1ywzqwvhmm58e02lvr579xlcn873kptl40a4teqnjd8t8kndfps7qdghdaq",
        "call_data": {
          "transfer": {
            "amount": "1000000",
            "from": {
              "chain_uid": "bsc",
              "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
              "amount": "1000000"
            },
            "msg": "",
            "recipient_address": {
              "user": {
                "chain_uid": "0g",
                "address": "0x5abfe1234567890cdefabc1234567890defabc01",
                "amount": "1000000"
              },
              "limit": {
                "less_than_or_equal": "1000000"
              },
              "preferred_denom": {
                "voucher": {}
              },
              "forwarding_message": {
                "data": "0x"
              }
            },
            "sender": {
              "chain_uid": "bsc",
              "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
              "amount": "1000000"
            },
            "timeout": "60",
            "token": "euclid",
            "tx_id": ""
          }
        }
      }
    ],
    "expiry": 1768847836,
    "nonce": "1768847776"
  },
  "types": [
    "transfer_voucher"
  ]
}`
    },
    {
      id: 'cosmos-request',
      label: 'Cosmos Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/meta-txn/sign' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "msgs": [
    {
      "msg": {
        "call_data": "{\\\"transfer\\\":{\\\"amount\\\":\\\"1000000\\\",\\\"from\\\":{\\\"chain_uid\\\":\\\"neuron\\\",\\\"address\\\":\\\"0x887e4aac216674d2c432798f851c1ea5d505b2e1\\\",\\\"amount\\\":\\\"1000000\\\"},\\\"msg\\\":\\\"\\\",\\\"recipient_address\\\":{\\\"user\\\":{\\\"chain_uid\\\":\\\"0g\\\",\\\"address\\\":\\\"0x5abfe1234567890cdefabc1234567890defabc01\\\",\\\"amount\\\":\\\"1000000\\\"},\\\"limit\\\":{\\\"less_than_or_equal\\\":\\\"1000000\\\"},\\\"preferred_denom\\\":{\\\"voucher\\\":{}},\\\"forwarding_message\\\":{\\\"data\\\":\\\"0x\\\"}},\\\"sender\\\":{\\\"chain_uid\\\":\\\"neuron\\\",\\\"address\\\":\\\"0x887e4aac216674d2c432798f851c1ea5d505b2e1\\\",\\\"amount\\\":\\\"1000000\\\"},\\\"timeout\\\":\\\"60\\\",\\\"token\\\":\\\"euclid\\\",\\\"tx_id\\\":\\\"\\\"}}",
        "target": "euclid1ywzqwvhmm58e02lvr579xlcn873kptl40a4teqnjd8t8kndfps7qdghdaq"
      },
      "type": "transfer_voucher"
    }
  ],
  "sender_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
  "sender_chain_uid": "neuron"
}'`
    },
    {
      id: 'cosmos-response',
      label: 'Cosmos Response',
      language: 'json',
      content: `{
  "meta": [
    {
      "type": "transfer_voucher",
      "token_in": "",
      "token_out": "",
      "token": "",
      "amount_in": "",
      "amount_out": ""
    }
  ],
  "payload": {
    "signer_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "signer_prefix": "0x",
    "signer_chain_uid": "neuron",
    "call_data": [
      {
        "target": "euclid1ywzqwvhmm58e02lvr579xlcn873kptl40a4teqnjd8t8kndfps7qdghdaq",
        "call_data": {
          "transfer": {
            "amount": "1000000",
            "from": {
              "chain_uid": "neuron",
              "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
              "amount": "1000000"
            },
            "msg": "",
            "recipient_address": {
              "user": {
                "chain_uid": "0g",
                "address": "0x5abfe1234567890cdefabc1234567890defabc01",
                "amount": "1000000"
              },
              "limit": {
                "less_than_or_equal": "1000000"
              },
              "preferred_denom": {
                "voucher": {}
              },
              "forwarding_message": {
                "data": "0x"
              }
            },
            "sender": {
              "chain_uid": "neuron",
              "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
              "amount": "1000000"
            },
            "timeout": "60",
            "token": "euclid",
            "tx_id": ""
          }
        }
      }
    ],
    "expiry": 1768847504,
    "nonce": "1768847444"
  },
  "types": [
    "transfer_voucher"
  ]
}`
    }
  ]}
/>

### Decoded call_data (transfer example)

```json
{
  "transfer": {
    "amount": "1000000",
    "from": {
      "chain_uid": "neuron",
      "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
      "amount": "1000000"
    },
    "msg": "",
    "recipient_address": {
      "user": {
        "chain_uid": "0g",
        "address": "0x5abfe1234567890cdefabc1234567890defabc01",
        "amount": "1000000"
      },
      "limit": {
        "less_than_or_equal": "1000000"
      },
      "preferred_denom": {
        "voucher": {}
      },
      "forwarding_message": {
        "data": "0x"
      }
    },
    "sender": {
      "chain_uid": "neuron",
      "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
      "amount": "1000000"
    },
    "timeout": "60",
    "token": "euclid",
    "tx_id": ""
  }
}
```

### Parameters

| Field | Type | Description |
|---|---|---|
| `msgs` | `object[]` | Array of messages to be signed. Each item includes `type` and `msg`. |
| `sender_address` | `string` | Address of the signer. |
| `sender_chain_uid` | `string` | Chain UID of the signer. |

### MsgItem

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Message type (e.g., `transfer_voucher`, `swap`, `withdraw_voucher`). |
| `msg` | `object` | Message payload containing `target` and `call_data`. |

### MsgPayload

| Field | Type | Description |
|---|---|---|
| `target` | `string` | Contract address to receive the meta transaction. |
| `call_data` | `string` | Encoded call data payload for the meta transaction. |
