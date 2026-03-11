---
sidebar_position: 7
---
import Tabs from '@site/src/components/Tabs';

# Meta Track

Track a meta transaction status using the `queue_id` returned by Meta Broadcast, or by `tx_hash`.

### Request URL

```bash
https://testnet.api.euclidprotocol.com/api/v1/txn/track/meta-txn
```

### Example

<Tabs
  tabs={[
    {
      id: 'request',
      label: 'Request',
      language: 'bash',
      content: `curl --request POST \\
  --url https://api.euclidprotocol.com/api/v1/txn/track/meta-txn \\
  --header 'content-type: application/json' \\
  --data '{
    "queue_id": "1772700210201242"
}'`
    },
    {
      id: 'response',
      label: 'Response',
      language: 'json',
      content: `{
  "response": {
    "type": "meta_txn",
    "tx_status": "queued",
    "is_completed": false,
    "source_chain_uid": "vsl",
    "meta_source_chain_uid": "monad",
    "destination_chain_uid": ["monad"],
    "meta_txn_sub_type": ["swap"],
    "meta_call_txn_response": [
      {
        "type": "swap",
        "token_in": "mon",
        "token_out": "usdt",
        "token": "",
        "amount_in": "40000000000000000",
        "amount_out": ""
      }
    ],
    "status": [
      {
        "chain_uid": "vsl",
        "status": "queued",
        "msg": "queued",
        "tx_hash": ""
      }
    ]
  }
}`
    }
  ]}
/>

### Parameters

| Field | Type | Description |
|---|---|---|
| `queue_id` | `string` | Queue ID returned by [Meta Broadcast](/docs/API/API%20Reference/REST/Transactions/Meta%20Transactions/Broadcast). Recommended tracking key. |
| `tx_hash` | `string` | Optional fallback if queue ID is not available. |
| `chain` | `string` | Chain UID field accepted by API. For meta tracking, backend tracks on VSL. |

### Response Fields

| Field | Type | Description |
|---|---|---|
| `response.type` | `string` | Tracker response type (`meta_txn`). |
| `response.tx_status` | `string` | Current status (`pending`, `queued`, `success`, `failed`). |
| `response.is_completed` | `boolean` | Whether the meta transaction reached a terminal state. |
| `response.meta_txn_sub_type` | `string[]` | Meta call types included (for example `swap`, `transfer_voucher`, `withdraw_voucher`). |
| `response.meta_call_txn_response` | `object[]` | Metadata summary originally passed in meta transaction payload. |
| `response.status` | `object[]` | Per-stage status details. |

:::note
Use `queue_id` as the primary tracker key. It is created in broadcast and persisted by the API for status updates.
:::
