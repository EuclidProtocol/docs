---
sidebar_position: 2
---
import Tabs from '@site/src/components/Tabs';

# Swap

Create a meta-transaction message payload for a voucher swap.

<details>
<summary><strong>Related Queries</strong></summary>

- [User Balance](/docs/API/API%20Reference/GQL/Virtual%20Balance/User%20Balance): Use this query to fetch the sender's available voucher balances before constructing the swap.
- [Unified User Balance](/docs/API/API%20Reference/GQL/Virtual%20Balance/Unified%20User%20Balance): Use this query if you need voucher balances across multiple chains before selecting the swap source.
- [All Tokens](/docs/API/API%20Reference/GQL/Router/All%20Tokens): Use this query to fetch valid token IDs for voucher assets and swap route tokens.
- [All Chains](/docs/API/API%20Reference/GQL/Router/All%20Chains): Use this query to fetch valid destination chain UIDs for `recipients[].user.chain_uid`. In most integrations, `sender.chain_uid` is derived from the connected wallet or source chain context.

</details>

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
| `swap_path` | [`SwapPath`](#swappath) | Routing path with token hops and DEX info. |
| `partner_fee` | [`PartnerFee`](#partnerfee) | Optional partner fee information for swaps. |

### SwapPath

| Field | Type | Description |
|---|---|---|
| `path` | [`SwapPathStep[]`](#swappathstep) | Steps for the swap route, each defining token route and dex. |

#### SwapPathStep

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
