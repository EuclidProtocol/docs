# Deposit Listener

## Overview
The deposit listener ingests on-chain deposit events and forwards them to account-service.
It uses a durable outbox + dispatcher so ingestion does not block on downstream latency.

## Durable outbox
Deposits are written to an on-disk outbox before submission. A dispatcher reads the outbox
and retries until account-service acknowledges the deposit.

### Outbox configuration
- `DEPOSIT_OUTBOX_PATH` (default `deposit_outbox.log`)
- `DEPOSIT_OUTBOX_SEGMENT_SIZE` (default `134217728`)
- `DEPOSIT_OUTBOX_SYNC_INTERVAL` (default `1`)
- `DEPOSIT_OUTBOX_SYNC_TIMEOUT_MS` (default `200`)
- `DEPOSIT_OUTBOX_QUEUE_CAPACITY` (default `1000`)
- `DEPOSIT_OUTBOX_CURSOR_PATH` (default `deposit_outbox.cursor`)
- `DEPOSIT_OUTBOX_RETENTION_SEGMENTS` (optional)

## Pending deposits (manual review)
If a deposit arrives from a wallet that is not yet mapped to a user, the listener writes
the event to a separate on-disk pending outbox for manual review instead of dropping it.

### Pending outbox configuration
- `DEPOSIT_PENDING_OUTBOX_PATH` (default `deposit_pending.log`)

### Dispatcher configuration
- `DEPOSIT_DISPATCH_BATCH_SIZE` (default `100`)
- `DEPOSIT_DISPATCH_IDLE_WAIT_MS` (default `500`)
- `DEPOSIT_DISPATCH_CURSOR_SYNC_INTERVAL` (default `1`)
- `DEPOSIT_DISPATCH_CURSOR_SYNC_TIMEOUT_MS` (default `200`)

## Parallel backfill
When the listener is behind the chain head, it parallelizes backfill by splitting the
height range into chunks and running workers concurrently. Each worker fetches blocks
and enqueues deposits into the outbox.

### Backfill configuration
- `DEPOSIT_BACKFILL_WORKERS` (default `4`)
- `DEPOSIT_BACKFILL_RANGE_SIZE` (default `200`)
- `DEPOSIT_BACKFILL_MAX_RANGE_SIZE` (default `2000`)
- `DEPOSIT_BACKFILL_LAG_THRESHOLD` (default `500`)

When lag is below `DEPOSIT_BACKFILL_LAG_THRESHOLD`, the listener uses the smaller
`POLL_BLOCK_CHUNK` size to avoid large batches near head.

## Idempotency
Account-service dedupes deposits using chain event metadata:
`(chain_id, tx_hash, msg_index, event_index)` so retries are safe.
