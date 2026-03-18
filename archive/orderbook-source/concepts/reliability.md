# Reliability Model

- Audience: Trading API Integrators
- What this page explains: Durability, async propagation, replay/idempotency boundaries, and practical retry behavior.
- Where to go next: Cross-check endpoint behavior in [API.md](../../API.md), and service details in [OMS.md](../OMS.md) and [DEPOSIT_LISTENER.md](../DEPOSIT_LISTENER.md).

## WAL Purpose
The engine writes commands to a WAL (write-ahead log) before applying in-memory state transitions. This supports deterministic recovery/replay after restart.

## Outbox + Async Dispatch Model
The engine and listeners use durable outbox patterns:
- Persist event/data locally first.
- Dispatch asynchronously to downstream sinks (Kafka/HTTP/services).
- Resume from cursor after restarts.

This decouples hot-path execution from downstream transient failures.

## Replay and Idempotency Boundaries
- Engine replay restores matching state from snapshot + WAL.
- OMS applies order events idempotently into its read model.
- Deposit handling is designed for safe retries using idempotent identifiers.

Integrators should still implement client-side idempotency for request retries where appropriate.

## Guarantees vs Non-Guarantees
### Generally expected
- Durable command/event staging before async fan-out.
- Eventual propagation to OMS/market-data after temporary sink failures.
- Deterministic engine recovery via WAL replay.

### Not guaranteed as immediate
- Zero-latency synchronization across all read models.
- Instant alignment between execution response and all downstream query surfaces.

Short-lived eventual consistency windows are normal in distributed async pipelines.

## Operational Implications for Integrators
- Use timeout-aware retries for writes, with idempotency keys/order IDs where possible.
- Treat OMS and market-data as eventually consistent projections of engine activity.
- On reconnect/recovery, resync state using snapshot/query endpoints before resuming high-frequency actions.
- Handle duplicates and out-of-order observations defensively in your connector/UI state machine.
