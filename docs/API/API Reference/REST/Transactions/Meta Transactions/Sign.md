---
sidebar_position: 5
---
import Tabs from '@site/src/components/Tabs';

# Meta Sign

Build and return the signable meta-transaction payload for one or more prepared messages.

### Request URL

```bash
https://api.euclidprotocol.com/api/v1/execute/meta-txn/sign
```

### Example

<Tabs
  tabs={[
    {
      id: 'request',
      label: 'Request',
      language: 'bash',
      content: `curl --request POST \\
  --url https://api.euclidprotocol.com/api/v1/execute/meta-txn/sign \\
  --header 'content-type: application/json' \\
  --data '{
    "msgs": [
      {
        "msg": {
          "target": "lumen1yvgh8xeju5dyr0zxlkvq09htvhjj20fncp5g58np4u25g8rkpgjsvavs5t",
          "call_data": "{...}"
        },
        "type": "withdraw_voucher",
        "token_in": "",
        "token_out": "",
        "token": "euclid",
        "amount_in": "90000",
        "amount_out": ""
      }
    ],
    "sender_address": "lumen10f4xyp6sq3g47yf6m8dfxh233r878wqjegmtug",
    "sender_chain_uid": "lumen"
  }'`
    },
    {
      id: 'response',
      label: 'Response',
      language: 'json',
      content: `{
  "cosmos_raw_payload": "...",
  "evm_raw_payload": "...",
  "meta": [
    {
      "type": "withdraw_voucher",
      "token_in": "",
      "token_out": "",
      "token": "euclid",
      "amount_in": "90000",
      "amount_out": ""
    }
  ],
  "payload": {
    "signer_address": "lumen10f4xyp6sq3g47yf6m8dfxh233r878wqjegmtug",
    "signer_prefix": "lumen",
    "signer_chain_uid": "lumen",
    "call_data": [
      {
        "target": "lumen1yvgh8xeju5dyr0zxlkvq09htvhjj20fncp5g58np4u25g8rkpgjsvavs5t",
        "call_data": "{...}"
      }
    ],
    "expiry": 1772797186,
    "nonce": "1772796886"
  },
  "types": ["withdraw_voucher"]
}`
    }
  ]}
/>

### Parameters

| Field | Type | Description |
|---|---|---|
| `msgs` | `object[]` | Array of prepared messages to be signed. Use the message items returned by the previous transaction-construction steps (for example swap, transfer, withdraw). Each item includes `type` and `msg`. |
| `sender_address` | `string` | Address of the signer. |
| `sender_chain_uid` | `string` | Chain UID of the signer. |
| `expiry_time` | `string` | Optional expiry duration (for example `5m`, `10m`, `1h`). |

### MsgItem

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Message type (for example `swap`, `transfer_voucher`, `withdraw_voucher`). |
| `msg` | `object` | Message payload containing `target` and `call_data`, typically copied from the corresponding transaction-construction response in the previous step. |
| `token_in` | `string` | Optional metadata token-in value used for tracking. |
| `token_out` | `string` | Optional metadata token-out value used for tracking. |
| `token` | `string` | Optional metadata token value used for tracking. |
| `amount_in` | `string` | Optional metadata input amount used for tracking. |
| `amount_out` | `string` | Optional metadata output amount used for tracking. |

### Payload Response

| Field | Type | Description |
|---|---|---|
| `cosmos_raw_payload` | `string` | Cosmos-ready encoded sign bytes. |
| `evm_raw_payload` | `string` | EVM personal-sign formatted message. |
| `meta` | `object[]` | Meta summary for tracking. |
| `payload` | `object` | Canonical payload that is signed and later broadcast. |
| `types` | `string[]` | Transaction types included in the payload. |

### Payload Object

| Field | Type | Description |
|---|---|---|
| `signer_address` | `string` | Address of the signer. |
| `signer_prefix` | `string` | Signing prefix (for example `0x`, `lumen`, `cosmos`). |
| `signer_chain_uid` | `string` | Chain UID of the signer. |
| `call_data` | `object[]` | Array of target call-data items. |
| `expiry` | `number` | Expiry timestamp for the signed payload. |
| `nonce` | `string` | Nonce used for replay protection. |
