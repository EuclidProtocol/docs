---
sidebar_position: 6
---
import Tabs from '@site/src/components/Tabs';

# Meta Broadcast

Broadcast a signed meta-transaction payload to the network.

### Request URL

```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/meta-txn/broadcast
```

### Examples

<Tabs
  tabs={[
    {
      id: 'cosmos-request',
      label: 'Cosmos Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/meta-txn/broadcast' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "call_data": {
    "call_data": [
      {
        "call_data": "{\\\"transfer\\\":{\\\"amount\\\":\\\"1000000\\\",\\\"from\\\":{\\\"chain_uid\\\":\\\"neuron\\\",\\\"address\\\":\\\"0x887e4aac216674d2c432798f851c1ea5d505b2e1\\\",\\\"amount\\\":\\\"1000000\\\"},\\\"msg\\\":\\\"\\\",\\\"recipient_address\\\":{\\\"user\\\":{\\\"chain_uid\\\":\\\"0g\\\",\\\"address\\\":\\\"0x5abfe1234567890cdefabc1234567890defabc01\\\",\\\"amount\\\":\\\"1000000\\\"},\\\"limit\\\":{\\\"less_than_or_equal\\\":\\\"1000000\\\"},\\\"preferred_denom\\\":{\\\"voucher\\\":{}},\\\"forwarding_message\\\":{\\\"data\\\":\\\"0x\\\"}},\\\"sender\\\":{\\\"chain_uid\\\":\\\"neuron\\\",\\\"address\\\":\\\"0x887e4aac216674d2c432798f851c1ea5d505b2e1\\\",\\\"amount\\\":\\\"1000000\\\"},\\\"timeout\\\":\\\"60\\\",\\\"token\\\":\\\"euclid\\\",\\\"tx_id\\\":\\\"\\\"}}",
        "target": "euclid1ywzqwvhmm58e02lvr579xlcn873kptl40a4teqnjd8t8kndfps7qdghdaq"
      }
    ],
    "expiry": 1768847504,
    "nonce": "1768847444",
    "signer_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "signer_chain_uid": "neuron",
    "signer_prefix": "0x"
  },
  "chain_uid": "neuron",
  "pub_key": "0x02c1aab42e1e0f3e19d9c8e0f2f93d6c8b6b9e77f6f5d2a3b3a1f6f8a2f1b1c3d4",
  "signature": "0x2f9a4c8e0b7d3a1f9c4d6e8f7a5b3c1d9e0f2a4b6c8d0e1f2a3b4c5d6e7f8a9b",
  "types": [
    "transfer_voucher"
  ],
  "wallet_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1"
}'`
    },
    {
      id: 'cosmos-response',
      label: 'Cosmos Response',
      language: 'json',
      content: `{
  "queue_id": "0x887e4aac216674d2c432798f851c1ea5d505b2e1-neuron-20260120161630"
}`
    },
    {
      id: 'evm-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/meta-txn/broadcast' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "call_data": {
    "call_data": [
      {
        "call_data": "{\\\"transfer\\\":{\\\"amount\\\":\\\"1000000\\\",\\\"from\\\":{\\\"chain_uid\\\":\\\"bsc\\\",\\\"address\\\":\\\"0x887e4aac216674d2c432798f851c1ea5d505b2e1\\\",\\\"amount\\\":\\\"1000000\\\"},\\\"msg\\\":\\\"\\\",\\\"recipient_address\\\":{\\\"user\\\":{\\\"chain_uid\\\":\\\"0g\\\",\\\"address\\\":\\\"0x5abfe1234567890cdefabc1234567890defabc01\\\",\\\"amount\\\":\\\"1000000\\\"},\\\"limit\\\":{\\\"less_than_or_equal\\\":\\\"1000000\\\"},\\\"preferred_denom\\\":{\\\"voucher\\\":{}},\\\"forwarding_message\\\":{\\\"data\\\":\\\"0x\\\"}},\\\"sender\\\":{\\\"chain_uid\\\":\\\"bsc\\\",\\\"address\\\":\\\"0x887e4aac216674d2c432798f851c1ea5d505b2e1\\\",\\\"amount\\\":\\\"1000000\\\"},\\\"timeout\\\":\\\"60\\\",\\\"token\\\":\\\"euclid\\\",\\\"tx_id\\\":\\\"\\\"}}",
        "target": "euclid1ywzqwvhmm58e02lvr579xlcn873kptl40a4teqnjd8t8kndfps7qdghdaq"
      }
    ],
    "expiry": 1768847836,
    "nonce": "1768847776",
    "signer_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "signer_chain_uid": "bsc",
    "signer_prefix": "0x"
  },
  "chain_uid": "bsc",
  "pub_key": "0x02c1aab42e1e0f3e19d9c8e0f2f93d6c8b6b9e77f6f5d2a3b3a1f6f8a2f1b1c3d4",
  "signature": "0x2f9a4c8e0b7d3a1f9c4d6e8f7a5b3c1d9e0f2a4b6c8d0e1f2a3b4c5d6e7f8a9b",
  "types": [
    "transfer_voucher"
  ],
  "wallet_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1"
}'`
    },
    {
      id: 'evm-response',
      label: 'EVM Response',
      language: 'json',
      content: `{
  "queue_id": "0x887e4aac216674d2c432798f851c1ea5d505b2e1-bsc-20260120161734"
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
| `call_data` | `object` | Signed call data payload from the `meta-txn/sign` response. |
| `chain_uid` | `string` | Chain UID to broadcast on. |
| `pub_key` | `string` | Public key of the signer. |
| `signature` | `string` | Signature for the payload. |
| `types` | `string[]` | List of message types included in the payload. |
| `wallet_address` | `string` | Wallet address of the signer. |

### CallDataPayload

| Field | Type | Description |
|---|---|---|
| `call_data` | `object[]` | Array of target call data items. |
| `expiry` | `number` | Expiry timestamp for the signed payload. |
| `nonce` | `string` | Nonce used for signing. |
| `signer_address` | `string` | Address of the signer. |
| `signer_chain_uid` | `string` | Chain UID of the signer. |
| `signer_prefix` | `string` | Prefix used for signing. |

### CallDataItem

| Field | Type | Description |
|---|---|---|
| `call_data` | `string` | Encoded call data for the message. |
| `target` | `string` | Contract address to receive the meta transaction. |
