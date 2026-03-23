---
sidebar_position: 3
---
import Tabs from '@site/src/components/Tabs';

# Meta Transfer

Create a meta-transaction message payload to transfer voucher balances.

### Request URL

```bash
https://api.euclidprotocol.com/api/v1/execute/meta-txn/transfer
```

### Example

<Tabs
  tabs={[
    {
      id: 'request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://api.euclidprotocol.com/api/v1/execute/meta-txn/transfer' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount": "1000000",
  "from": {
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "chain_uid": "monad"
  },
  "recipient_address": {
    "address": "0x5abfe1234567890cdefabc1234567890defabc01",
    "chain_uid": "0g"
  },
  "sender": {
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "chain_uid": "monad"
  },
  "timeout": "60",
  "token": "euclid"
}'`
    },
    {
      id: 'response',
      label: 'Response',
      language: 'json',
      content: `{
  "msg": {
    "target": "euclid1yvgh8xeju5dyr0zxlkvq09htvhjj20fncp5g58np4u25g8rkpgjsy5hngy",
    "call_data": "{\"transfer_voucher\":{...}}"
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
| `recipient_address` | [`CrossChainUserWithAmount`](/docs/API/API%20Reference/common%20types.md#crosschainuserwithamount) | Recipient user and chain for this transfer request. |
| `msg` | `string` | Optional message payload to include with the transfer. |
| `timeout` | `string` | Optional timeout in seconds. |

### Response Fields

| Field | Type | Description |
|---|---|---|
| `msg.target` | `string` | Router contract address that will receive the message. |
| `msg.call_data` | `string` | Encoded contract call data. |
| `type` | `string` | Transaction type (`transfer_voucher`). |
| `token` | `string` | Token identifier for this meta message. |
| `amount_in` | `string` | Input amount tracked for this meta message. |
