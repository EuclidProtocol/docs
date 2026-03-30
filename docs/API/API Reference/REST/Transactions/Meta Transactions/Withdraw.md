---
sidebar_position: 4
---
import Tabs from '@site/src/components/Tabs';

# Withdraw

Create a meta-transaction message payload to withdraw voucher balances.

### Request URL

```bash
https://api.euclidprotocol.com/api/v1/execute/meta-txn/withdraw
```

### Example

<Tabs
  tabs={[
    {
      id: 'request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://api.euclidprotocol.com/api/v1/execute/meta-txn/withdraw' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount": "90000",
  "cross_chain_addresses": [
    {
      "user": {
        "address": "lumen10f4xyp6sq3g47yf6m8dfxh233r878wqjegmtug",
        "chain_uid": "lumen"
      },
      "amount": {
        "less_than_or_equal": "90000"
      },
      "denom": {
        "voucher": {}
      },
      "forwarding_message": "",
      "unsafe_refund_as_voucher": false
    }
  ],
  "sender": {
    "address": "lumen10f4xyp6sq3g47yf6m8dfxh233r878wqjegmtug",
    "chain_uid": "lumen"
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
  "type": "withdraw_voucher",
  "token_in": "",
  "token_out": "",
  "token": "euclid",
  "amount_in": "90000",
  "amount_out": ""
}`
    }
  ]}
/>

### Parameters

| Field | Type | Description |
|---|---|---|
| `amount` | `string` | Amount of voucher tokens to withdraw. |
| `token` | `string` | Voucher token identifier. |
| `sender` | [`CrossChainUserWithAmount`](/docs/API/API%20Reference/common%20types.md#crosschainuserwithamount) | Address and chain initiating the meta transaction. |
| `cross_chain_addresses` | [`CrossChainAddressWithLimit[]`](/docs/API/API%20Reference/common%20types.md#crosschainaddresswithlimit) | Recipients for the output asset, with optional limits and forwarding. |
| `timeout` | `string` | Optional timeout in seconds. |

### Response Fields

| Field | Type | Description |
|---|---|---|
| `msg.target` | `string` | Router contract address that will receive the message. |
| `msg.call_data` | `string` | Encoded contract call data. |
| `type` | `string` | Transaction type (`withdraw_voucher`). |
| `token` | `string` | Token identifier for this meta message. |
| `amount_in` | `string` | Input amount tracked for this meta message. |
