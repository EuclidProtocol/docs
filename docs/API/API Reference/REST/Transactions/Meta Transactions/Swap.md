---
sidebar_position: 2
---
import Tabs from '@site/src/components/Tabs';

# Meta Swap

Create a meta-transaction message payload for a voucher swap.

### Request URL

```bash
https://api.euclidprotocol.com/api/v1/execute/meta-txn/swap
```

### Example

<Tabs
  tabs={[
    {
      id: 'request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://api.euclidprotocol.com/api/v1/execute/meta-txn/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount_in": "100000000000000000",
  "asset_in": {
    "token": "stt",
    "token_type": {
      "voucher": {}
    }
  },
  "recipients": [
    {
      "user": {
        "address": "lumen10f4xyp6sq3g47yf6m8dfxh233r878wqjegmtug",
        "chain_uid": "lumen"
      },
      "amount": {
        "dynamic": "0"
      },
      "denom": {
        "voucher": {}
      },
      "forwarding_message": "",
      "unsafe_refund_as_voucher": false
    }
  ],
  "slippage": "5",
  "sender": {
    "address": "lumen10f4xyp6sq3g47yf6m8dfxh233r878wqjegmtug",
    "chain_uid": "lumen"
  },
  "swap_path": {
    "path": [
      {
        "route": ["stt", "euclid"],
        "dex": "euclid",
        "amount_in": "100000000000000000",
        "amount_out": "1206",
        "chain_uid": "vsl"
      }
    ]
  },
  "partner_fee": {
    "partner_fee_bps": 10,
    "recipient": ""
  }
}'`
    },
    {
      id: 'response',
      label: 'Response',
      language: 'json',
      content: `{
  "msg": {
    "target": "euclid1yvgh8xeju5dyr0zxlkvq09htvhjj20fncp5g58np4u25g8rkpgjsy5hngy",
    "call_data": "{\"swap\":{...}}"
  },
  "type": "swap",
  "token_in": "stt",
  "token_out": "euclid",
  "token": "",
  "amount_in": "100000000000000000",
  "amount_out": "1206"
}`
    }
  ]}
/>

### Parameters

| Field | Type | Description |
|---|---|---|
| `amount_in` | `string` | Amount of the input token to be swapped. |
| `asset_in` | [`TokenWithDenom`](/docs/API/API%20Reference/common%20types.md#tokenwithdenom) | Input token and its type (`native`, `smart`, or `voucher`). |
| `recipients` | [`CrossChainAddressWithLimit[]`](/docs/API/API%20Reference/common%20types.md#crosschainaddresswithlimit) | A set of recipients to specify where the output should be released. |
| `slippage` | `string` | Slippage tolerance in basis points (for example `500` = 5%). |
| `sender` | [`CrossChainUserWithAmount`](/docs/API/API%20Reference/common%20types.md#crosschainuserwithamount) | Address and chain initiating the swap. |
| `swap_path` | `object` | Routing path with token hops and DEX info. |
| `partner_fee` | `object` | Optional partner fee information for swaps. |

### SwapPath

| Field | Type | Description |
|---|---|---|
| `path` | `object[]` | Steps for the swap route, each defining token route and dex. |

#### Each path object

| Field | Type | Description |
|---|---|---|
| `route` | `string[]` | Token sequence for the step (for example `['stt','euclid']`). |
| `dex` | `string` | DEX used for this step. |
| `chain_uid` | `string` | Chain uid where this step is executed. |
| `amount_in` | `string` | Input amount for this step. |
| `amount_out` | `string` | Estimated output amount for this step. |

### PartnerFee

| Field | Type | Description |
|---|---|---|
| `partner_fee_bps` | `number` | Fee in basis points (max 30 = 0.3%). |
| `recipient` | `string` | Address to receive the fee. |
