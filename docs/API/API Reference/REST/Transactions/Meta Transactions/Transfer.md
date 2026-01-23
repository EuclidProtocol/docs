---
sidebar_position: 3
---
import Tabs from '@site/src/components/Tabs';

# Meta Transfer

Create a meta-transaction payload to transfer voucher balances to another user.

### Request URL

```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/meta-txn/transfer
```

### Examples

<Tabs
  tabs={[
    {
      id: 'cosmos-request',
      label: 'Cosmos Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/meta-txn/transfer' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount": "1000000",
  "from": {
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "amount": "1000000",
    "chain_uid": "neuron"
  },
  "msg": "",
  "recipient_address": {
    "forwarding_message": {
      "data": "0x",
      "meta": ""
    },
    "limit": {
      "less_than_or_equal": "1000000"
    },
    "preferred_denom": {
      "voucher": {}
    },
    "user": {
      "address": "0x5abfe1234567890cdefabc1234567890defabc01",
      "amount": "1000000",
      "chain_uid": "0g"
    }
  },
  "sender": {
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "amount": "1000000",
    "chain_uid": "neuron"
  },
  "timeout": "60",
  "token": "euclid"
}'`
    },
    {
      id: 'cosmos-response',
      label: 'Cosmos Response',
      language: 'json',
      content: `{
  "msg": {
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
  },
  "type": "transfer_voucher",
  "token_in": "",
  "token_out": "",
  "token": "euclid",
  "amount_in": "1000000",
  "amount_out": ""
}`
    },
    {
      id: 'evm-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/meta-txn/transfer' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount": "1000000",
  "from": {
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "amount": "1000000",
    "chain_uid": "bsc"
  },
  "msg": "",
  "recipient_address": {
    "forwarding_message": {
      "data": "0x",
      "meta": ""
    },
    "limit": {
      "less_than_or_equal": "1000000"
    },
    "preferred_denom": {
      "voucher": {}
    },
    "user": {
      "address": "0x5abfe1234567890cdefabc1234567890defabc01",
      "amount": "1000000",
      "chain_uid": "0g"
    }
  },
  "sender": {
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "amount": "1000000",
    "chain_uid": "bsc"
  },
  "timeout": "60",
  "token": "euclid"
}'`
    },
    {
      id: 'evm-response',
      label: 'EVM Response',
      language: 'json',
      content: `{
  "msg": {
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
  },
  "type": "transfer_voucher",
  "token_in": "",
  "token_out": "",
  "token": "euclid",
  "amount_in": "1000000",
  "amount_out": ""
}`
    }
  ]}
/>

### Parameters

| Field | Type | Description |
|---|---|---|
| `amount` | `string` | Amount of voucher tokens to transfer. |
| `token` | `string` | Voucher token identifier. |
| `from` | [`CrossChainUserWithAmount`](/docs/API/API%20Reference/common%20types.md#crosschainuserwithamount) | Source user and chain for the voucher balance. |
| `sender` | [`CrossChainUserWithAmount`](/docs/API/API%20Reference/common%20types.md#crosschainuserwithamount) | Address and chain initiating the meta transaction. |
| `recipient_address` | [`CrossChainAddressWithLimit`](/docs/API/API%20Reference/common%20types.md#crosschainaddresswithlimit) | Recipient details, limits, and optional forwarding message. |
| `msg` | `string` | Optional message payload to include with the transfer. |
| `timeout` | `string` | Optional timeout in seconds. |
