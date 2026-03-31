---
sidebar_position: 7
---
import Tabs from '@site/src/components/Tabs';

# Meta Track

Track a meta transaction status using the `queue_id` returned by [Broadcast](/docs/API/API%20Reference/REST/Transactions/Meta%20Transactions/Broadcast), or by `tx_hash`.

<details>
<summary><strong>Related Queries</strong></summary>

- No GraphQL queries are typically required for this call. Use the `queue_id` returned by [Broadcast](/docs/API/API%20Reference/REST/Transactions/Meta%20Transactions/Broadcast), or track by `tx_hash` if you already have it.

</details>

### Request URL

```bash
https://api.euclidprotocol.com/api/v1/txn/track/meta-txn
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
| `queue_id` | `string` | Queue ID returned by [Broadcast](/docs/API/API%20Reference/REST/Transactions/Meta%20Transactions/Broadcast). Recommended tracking key. |
| `tx_hash` | `string` | Optional fallback if queue ID is not available. |
| `chain` | `string` | Chain UID field accepted by API. For meta tracking, backend tracks on VSL. |

### Response Fields

| Field | Type | Description |
|---|---|---|
| `response.type` | `string` | Tracker response type (`meta_txn`). |
| `response.tx_status` | `string` | Current status (`pending`, `queued`, `success`, `failed`). |
| `response.is_completed` | `boolean` | Whether the meta transaction reached a terminal state. |
| `response.meta_txn_sub_type` | `string[]` | Meta call types included (for example `swap`, `transfer_voucher`, `withdraw_voucher`). |
| `response.meta_call_txn_response` | [`MetaCallTxnResponseItem[]`](#metacalltxnresponseitem) | Metadata summary originally passed in meta transaction payload. |
| `response.status` | [`StatusItem[]`](#statusitem) | Per-stage status details. |

### MetaCallTxnResponseItem

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Message type represented in the tracked meta transaction. |
| `token_in` | `string` | Optional input token metadata for the message. |
| `token_out` | `string` | Optional output token metadata for the message. |
| `token` | `string` | Optional token metadata for non-swap operations. |
| `amount_in` | `string` | Optional input amount metadata for the message. |
| `amount_out` | `string` | Optional output amount metadata for the message. |

### StatusItem

| Field | Type | Description |
|---|---|---|
| `chain_uid` | `string` | Chain UID for this stage status entry. |
| `status` | `string` | Status value for the stage (for example `queued`, `success`, `failed`). |
| `msg` | `string` | Human-readable status message for the stage. |
| `tx_hash` | `string` | Transaction hash associated with the stage, when available. |

:::note
Use `queue_id` as the primary tracker key. It is created in broadcast and persisted by the API for status updates.
:::
