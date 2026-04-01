---
sidebar_position: 6
---
import Tabs from '@site/src/components/Tabs';

# Broadcast

Broadcast a signed meta-transaction payload to the relayer.

<details>
<summary><strong>Related Queries</strong></summary>

- No GraphQL queries are typically required for this call. It consumes the signed payload returned by [Sign](/docs/API/API%20Reference/REST/Transactions/Meta%20Transactions/Sign).

</details>

### Request URL

```bash
https://api.euclidprotocol.com/api/v1/execute/meta-txn/broadcast
```

### Example

<Tabs
  tabs={[
    {
      id: 'request',
      label: 'Request',
      language: 'bash',
      content: `curl --request POST \\
  --url https://api.euclidprotocol.com/api/v1/execute/meta-txn/broadcast \\
  --header 'content-type: application/json' \\
  --data '{
    "wallet_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "chain_uid": "monad",
    "signature": "09943f80f12cd92bd159cf08d3dc3505cdc22017fef2929f1d5f2946da952056...",
    "pub_key": "0437c6e8362883ef2497eed6adefa91e8d11783a1f4d535334d6e9d3040bbbd3...",
    "call_data": {
      "signer_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
      "signer_prefix": "0x",
      "signer_chain_uid": "monad",
      "call_data": [
        {
          "target": "euclid1yvgh8xeju5dyr0zxlkvq09htvhjj20fncp5g58np4u25g8rkpgjsy5hngy",
          "call_data": "{...}"
        }
      ],
      "expiry": 1771849451,
      "nonce": "1771849151"
    },
    "types": ["swap"],
    "meta": [
      {
        "type": "swap",
        "token_in": "mon",
        "token_out": "usdt",
        "token": "",
        "amount_in": "40000000000000000",
        "amount_out": ""
      }
    ]
  }'`
    },
    {
      id: 'response',
      label: 'Response',
      language: 'json',
      content: `{
  "queue_id": "0x887e4aac216674d2c432798f851c1ea5d505b2e1-monad-20260120161734"
}`
    }
  ]}
/>

### Parameters

| Field | Type | Description |
|---|---|---|
| `call_data` | [`CallDataPayload`](#calldatapayload) | Signed call data payload from the `meta-txn/sign` response. |
| `chain_uid` | `string` | Chain UID to broadcast on. |
| `pub_key` | `string` | Public key of the signer. |
| `signature` | `string` | Signature for the payload. |
| `types` | `string[]` | List of message types included in the payload. |
| `wallet_address` | `string` | Wallet address of the signer. |
| `meta` | [`MetaItem[]`](#metaitem) | Optional meta transaction context passed with broadcast payload. |

### CallDataPayload

| Field | Type | Description |
|---|---|---|
| `call_data` | [`CallDataItem[]`](#calldataitem) | Array of target call-data items. |
| `expiry` | `number` | Expiry timestamp for the signed payload. |
| `nonce` | `string` | Nonce used for signing and replay protection. |
| `signer_address` | `string` | Address of the signer. |
| `signer_chain_uid` | `string` | Chain UID of the signer. |
| `signer_prefix` | `string` | Prefix used for signing. |

### MetaItem

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Message type included in the meta transaction. |
| `token_in` | `string` | Optional metadata token-in value used for tracking. |
| `token_out` | `string` | Optional metadata token-out value used for tracking. |
| `token` | `string` | Optional metadata token value used for tracking. |
| `amount_in` | `string` | Optional metadata input amount used for tracking. |
| `amount_out` | `string` | Optional metadata output amount used for tracking. |

### CallDataItem

| Field | Type | Description |
|---|---|---|
| `call_data` | `string` | Encoded call data for the message. |
| `target` | `string` | Contract address to receive the meta transaction. |
