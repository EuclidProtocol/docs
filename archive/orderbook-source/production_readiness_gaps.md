# Production Readiness Gaps (Matching Engine)
Date: 2026-01-27

## Scope reviewed
- engine (core matching, API, WAL, outboxes, Kafka integration)
- account-service (balances, settlement, withdrawals)
- auth-service (JWT + API key issuance)
- oms-service (order history read model)
- market-data (trade + depth streams)
- deposit-listener, withdrawal-watcher
- docs: API.md, CONSUMER.md, ORDERBOOK_CONTRACT.md, WEBSOCKET.md, docs/*

## Baseline acceptance criteria (locked)
- Availability: 99.95% monthly for order entry + match pipeline
- Latency: order ack p50/p95/p99 <= 5/20/50 ms; match confirmation <= 10/50/100 ms (internal)
- Throughput: sustain 5-10x expected peak TPS with <= 10% error rate increase and no data loss
- Error budget: <= 0.05% failed order submissions (non-client); <= 0.01% match inconsistencies
- Recovery: RTO <= 5 minutes; RPO = 0 for orders/trades
- Correctness: deterministic replay; strict per-pair ordering; idempotent order/cancel; invariants on balances/fees
- Security: strong authn/authz, scoped keys, audit logs, TLS, at-rest protections
- Observability: metrics/tracing/logs, health checks, alerting on SLO burn
- Testing: unit + integration + load + chaos + replay; runbooks + incident drills

## Gaps (prioritized)
### Tracker workflow
- Status values: Backlog -> Needs Review -> Completed
- Entry format: Status, Type, Component, Owner, Labels, Acceptance Criteria

### P0 - Must fix before production
- PR-001 Auth can be disabled and internal routes are unauthenticated
  - Tracker:
    - Status: Completed
    - Type: Task
    - Component: Security/Auth
    - Owner: TBD
    - Labels: security, auth, internal, hardening
    - Acceptance criteria: services fail fast without required auth config; internal endpoints require mTLS or signed service tokens; gateway/db_service endpoints are protected or removed.
  - Notes: market-data remains intentionally public; internal JWTs are now required for internal endpoints and callers (unless ALLOW_INSECURE_INTERNAL_AUTH=true).
  - Evidence: auth fallback allows unauthenticated access when env vars are missing (engine/src/auth.rs:19-42, 155-175). Admin token is optional for pair creation (engine/src/api.rs:1787-1796). Account-service exposes all balance/settle/withdrawal endpoints without auth (account-service/src/main.rs:173-188). Gateway uses shared-secret placeholder (engine/src/bin/gateway.rs:64-75). DB service is open (engine/src/bin/db_service.rs:32-41).
  - Required: enforce auth as mandatory in production; require mTLS or signed internal tokens for service-to-service calls; fail fast on missing secrets; remove shared-secret gateway or replace with real EIP-712.

- PR-002 Signed orders are replayable (no nonce tracking / replay protection)
  - Tracker:
    - Status: Completed
    - Type: Task
    - Component: Engine/API
    - Owner: TBD
    - Labels: security, replay, signed-orders
    - Acceptance criteria: persist per-user (or per-user+pair) nonce; reject replays; add tests for duplicate signed submissions.
  - Evidence: signed order verification only checks signature + expiry; nonce is not stored or validated (engine/src/api.rs:1293-1325, 1852-1929).
  - Required: persist per-user nonce/sequence and reject replays; include domain separator (chain + venue) in signing payload; add expiry + nonce enforcement at storage layer.
  - Notes: per-user nonce persistence is stored in Postgres via `signed_order_nonces`; signed order hashing includes `SIGNED_ORDER_DOMAIN_VENUE` + `SIGNED_ORDER_DOMAIN_CHAIN_ID`; replay rejection covered by tests (in-memory + DB-backed when `TEST_DATABASE_URL` is set).

- PR-003 Reservation accounting can over-release funds on partial fills
  - Tracker:
    - Status: Completed
    - Type: Bug
    - Component: Engine/Accounts
    - Owner: TBD
    - Labels: balances, correctness, funds-safety
    - Acceptance criteria: decrement reservation on each fill; release only remaining on cancel; remove reservation on full fill; add regression tests.
  - Evidence: leftover reserve is stored once at order placement and only released on cancel (engine/src/api.rs:1451-1467, 1116-1151). Maker fills reduce locked balances (engine/src/api.rs:825-900), but reservation map is not adjusted, so later cancel can release more than remaining.
  - Required: track per-order reserved remaining and decrement on each fill; release only true remaining on cancel; remove stale reservation entries on full fill.
  - Notes: maker-fill reservation decrements added; full-fill removes reservation entry; regression tests cover bid/ask maker cases and cancel after partial fills.

- PR-004 Scope enforcement is effectively bypassed for JWT tokens
  - Tracker:
    - Status: Completed
    - Type: Task
    - Component: Security/Auth
    - Owner: TBD
    - Labels: auth, scopes
    - Acceptance criteria: JWT includes scopes and enforcement is strict for trade/internal routes; tests cover scope denial and allow cases.
  - Evidence: ensure_scope_optional only enforces if scopes exist; JWT auth does not populate scopes (engine/src/auth.rs:205-219; engine/src/api.rs:392-412, 1091-1122).
  - Required: encode scopes in JWT and enforce strictly for trading/internal endpoints, or remove optional scope path.
  - Notes: JWTs now carry `scopes`; trade routes enforce strict scope checks; regression tests cover missing scopes (orders/cancel) and API-key denial. Internal scope enforcement deferred per current requirements.

### P1 - High priority (data integrity / reliability)
- PR-005 Order events are not durable and can be dropped
  - Tracker:
    - Status: Completed
    - Type: Task
    - Component: Engine/OMS
    - Owner: TBD
    - Labels: reliability, events, kafka
    - Acceptance criteria: order events are persisted (outbox or durable queue); backpressure or retries prevent silent drops; OMS receives all events under load.
  - Evidence: order events are appended to an on-disk outbox with bounded sync_channel + fsync; dispatcher replays with a persisted cursor and retries Kafka publishes; OMS commits Kafka offsets manually after apply/skip (engine/src/order_events.rs:71-322, 662-778; oms-service/src/main.rs:260-331).
  - Required: fail fast without ORDER_KAFKA_BROKERS (unless ALLOW_NO_ORDER_SINK=true); propagate order outbox publish failures to the order path; disable auto-commit and commit offsets only after successful apply or duplicate skip (engine/src/main.rs:69-80; engine/src/engine.rs:260-606; oms-service/src/main.rs:260-331; oms-service/src/db.rs:21-51).
  - Notes: dispatcher returns an error when no sink is configured so the cursor does not advance; order-event apply is idempotent via order_events.event_key (engine/src/order_events.rs:686-778; oms-service/src/db.rs:21-51).

- PR-006 Account cache updates are non-idempotent with auto-commit Kafka consumption
  - Tracker:
    - Status: Completed
    - Type: Task
    - Component: Engine/Accounts
    - Owner: TBD
    - Labels: reliability, idempotency, kafka
    - Acceptance criteria: updates include id/version; consumer applies idempotently; manual commit after successful apply; tests for duplicate delivery.
  - Evidence: account updates carry `update_id` and are deduped via a persisted update-id store; consumer uses manual commit and only commits after apply/duplicate (engine/src/api.rs:171-279, 1635-1676; engine/src/consumer.rs:29-116).
  - Required: persist update-id dedupe state; commit offsets only after successful apply/duplicate; tests cover duplicate delivery and persistence.
  - Notes: update-id store is backed by `ACCOUNT_UPDATE_ID_STORE_PATH` (default `account_update_ids.log` outside tests), with TTL/size configurable via `ACCOUNT_UPDATE_ID_TTL_SECS` and `ACCOUNT_UPDATE_ID_CACHE_SIZE`; tests cover duplicate updates, missing update id, and persistence across restart (engine/src/api.rs:3970-4105).

- PR-007 WAL format is fragile to partial writes (no checksum / truncation handling)
  - Tracker:
    - Status: Completed
    - Type: Task
    - Component: Engine/Persistence
    - Owner: TBD
    - Labels: durability, wal
    - Acceptance criteria: WAL uses framing + checksum; replay truncates partial tail safely; recovery tests cover crash during append.
  - Evidence: WAL is now framed with length + CRC32, with legacy newline JSON supported; replay truncates partial/corrupt tails (engine/src/wal.rs:45-214).
  - Required: confirm legacy WAL migration behavior is acceptable; verify framed WAL offsets are compatible with snapshot restore; review recovery tests for partial append and CRC mismatch.
  - Notes: replay tests cover partial tail truncation, CRC mismatch, and legacy newline WAL replay; framed WAL writes include 4-byte magic header (engine/src/wal.rs:403-708).

- PR-008 Snapshot support exists but is not wired into startup or automated
  - Tracker:
    - Status: Completed
    - Type: Task
    - Component: Engine/Persistence
    - Owner: TBD
    - Labels: snapshots, recovery
    - Acceptance criteria: startup loads latest snapshot and replays from marker; periodic snapshots enabled; retention policy documented.
  - Evidence: startup restores latest snapshot and replays from the marker; restore keeps WAL segment index derived from files; truncation preserves a marker segment so post-snapshot WAL is replayed; tests cover rotated WAL and truncate/replay paths (engine/src/main.rs:24-170; engine/src/engine.rs:612-1205; engine/src/snapshots.rs:1-86).
  - Required: none (resolved).
  - Notes: snapshot scheduling is controlled by `ENGINE_SNAPSHOT_DIR`, `ENGINE_SNAPSHOT_INTERVAL_SECS` (0 disables), `ENGINE_SNAPSHOT_RETENTION`, and `ENGINE_SNAPSHOT_TRUNCATE_WAL` (engine/src/main.rs:312-382).

- PR-009 Duplicate order IDs are not rejected
  - Tracker:
    - Status: Completed
    - Type: Bug
    - Component: Engine/Orderbook
    - Owner: TBD
    - Labels: idempotency, correctness
    - Acceptance criteria: duplicate order IDs are rejected or return idempotent response; tests added for duplicates.
  - Evidence: engine tracks globally seen order IDs and rejects duplicates across pairs and after cancel; replay errors if duplicates are encountered; API checks global seen IDs before reserving funds (engine/src/engine.rs:24-410, 690-750; engine/src/api.rs:929-944).
  - Required: none (resolved).
  - Notes: tests cover same-pair duplicate, cross-pair duplicate, and reuse after cancel (engine/src/engine.rs:960-1140).

- PR-010 Service-to-service settlement calls are unauthenticated
  - Tracker:
    - Status: Completed
    - Type: Task
    - Component: Security/Accounts
    - Owner: TBD
    - Labels: security, internal, settlement
    - Acceptance criteria: /settle requires authenticated service credentials; audit log for settlements; tests for auth failure paths.
  - Evidence: internal JWTs now require `sub` (caller identity) and can be allowlisted; `/settle` logs caller subject and is covered by auth tests (account-service/src/internal_auth.rs:18-210; account-service/src/main.rs:453-520). Engine internal auth also requires `sub` (engine/src/auth.rs:140-356). Engine attaches `x-internal-auth` token for settlement calls (engine/src/trade_events.rs:831-847).
  - Required: none (resolved).

- PR-017 Deposit listener drops or delays deposits under backlog
  - Tracker:
    - Status: Completed
    - Type: Task
    - Component: Deposit-Listener
    - Owner: TBD
    - Labels: reliability, deposits, ingestion
    - Acceptance criteria: deposits are persisted to a durable outbox before submission; dispatcher retries until account-service acknowledges; idempotent processing ensures no double-credit on retries; backlog catch-up does not block live ingestion.
  - Evidence: deposit listener writes deposits to an on-disk outbox and dispatches them with retries; cursor persists progress for restart safety; ingestion enqueues via a live/backfill async queue so backfill does not block live events; account-service idempotency is preserved via chain event metadata (deposit-listener/src/outbox.rs; deposit-listener/src/main.rs; docs/DEPOSIT_LISTENER.md).
  - Required: none (production assumes account-service DB backend for idempotent crediting).
  - Notes: pending deposits for unknown wallets are written to a separate pending outbox for manual review (docs/DEPOSIT_LISTENER.md).

### P2 - Medium priority (risk controls / ops readiness)
- PR-011 Missing trade risk controls (self-trade prevention, price bands, rate limits, max order size)
  - Tracker:
    - Status: Needs Review
    - Type: Task
    - Component: Risk/Engine
    - Owner: TBD
    - Labels: risk, controls
    - Acceptance criteria: STP, price bands, rate limits, and max size/notional checks are configurable and enforced; tests cover each rule.
  - Evidence: no STP or price-band checks found in matching flow; validation only checks tick/lot/min notional (engine/src/engine.rs:285-373).
  - Required: add configurable risk rules per pair/user (STP, max notional/size, price collars, rate limiting).

- PR-018 Missing batch cancel endpoint for rapid risk-off
  - Tracker:
    - Status: Completed
    - Type: Task
    - Component: Engine/API
    - Owner: TBD
    - Labels: risk, controls, api, market-maker
    - Acceptance criteria: add authenticated batch cancel API (by list of order_ids and/or cancel-all by pair/user); enforce limits/quotas; return per-order results; idempotent for already-cancelled orders; metrics + tests for bulk cancel.
  - Evidence: cancel-all endpoint added (`POST /orders/cancel_all`) with per-order results, limits (`CANCEL_ALL_MAX_ORDERS`), metrics, and tests; cancels all open orders for the authenticated user on a pair (engine/src/api.rs; API.md).
  - Required: confirm limit/quotas are acceptable for production; review atomicity expectations.

- PR-019 Missing cancel-replace endpoint (atomic cancel + new order)
  - Tracker:
    - Status: Needs Review
    - Type: Task
    - Component: Engine/API
    - Owner: TBD
    - Labels: risk, controls, api, market-maker, cancel-replace
    - Acceptance criteria: add authenticated cancel-replace endpoint; atomically cancel the target order and place a new order; ensure reservation updates are correct; provide per-request results and error codes; enforce limits/quotas; metrics + tests for success, cancel-failure, and order-placement-failure paths; idempotent responses for already-canceled orders.
  - Evidence: `/orders/cancel_replace` added with STOP_ON_FAILURE/ALLOW_FAILURE modes, per-step results, error codes, metrics, and tests (engine/src/api.rs; API.md).
  - Required: confirm cancel-replace semantics (cancel-first vs pre-validate) and any production limits/quotas.

- PR-020 No offline reconciliation workflow for OMS/market-data (Kafka dependence)
  - Tracker:
    - Status: Backlog
    - Type: Task
    - Component: OMS/Market-Data/Engine
    - Owner: TBD
    - Labels: reliability, kafka, reconciliation, replay, runbooks
    - Acceptance criteria: persist order/trade events to a durable Postgres event store; add monotonic sequences; expose manual replay tools for OMS and market-data; add gap detection + alerting (no auto-replay); provide validation checks and runbooks for recovery.
  - Evidence: OMS and market-data are fed by Kafka only; there is no documented replay or reconciliation workflow.
  - Required: implement Postgres-backed event store, manual replay CLI, gap detection metrics/alerts, and recovery runbooks.

- PR-012 Market-data consumer uses auto-commit and best-effort processing
  - Tracker:
    - Status: Completed
    - Type: Task
    - Component: Market-Data
    - Owner: TBD
    - Labels: reliability, kafka
    - Acceptance criteria: manual commit after successful processing; idempotent persistence for trades; tests for restart replay.
  - Evidence: consumer now uses manual commit with retry after successful processing; trade persistence dedupes on UUID `id` (trade_id) with `ON CONFLICT (id)`; schema check enforces `trades.id` is UUID; tests cover idempotent persistence and DB replay backfill (market-data/src/main.rs:155-250, 1030-1185, 1360-1515).
  - Required: none.

- PR-013 Admin actions are protected only by optional env token
  - Tracker:
    - Status: Completed
    - Type: Task
    - Component: Security/Admin
    - Owner: TBD
    - Labels: admin, audit
    - Acceptance criteria: admin actions require auth even when env token missing; admin actions are audited.
  - Evidence: admin token is required and validated for admin actions; create_pair writes audit log entries (engine/src/api.rs:1435-1475, 2250-2320; tests in engine/src/api.rs:3950-4010).
  - Required: none.

- PR-014 Observability gaps (limited metrics, no tracing spans or SLO alerts)
  - Tracker:
    - Status: Completed
    - Type: Task
    - Component: Observability
    - Owner: TBD
    - Labels: metrics, tracing, alerting
    - Acceptance criteria: add latency histograms, error rate counters, queue depth gauges; tracing across services; alert rules tied to SLOs.
  - Evidence: HTTP latency histograms and request/error counters added for engine/account-service/market-data; engine command latency/error metrics added; market-data queue and Kafka error metrics added; request correlation via `x-request-id` across services; alerting guidance documented in `OBSERVABILITY.md`.
  - Required: none.

- PR-015 Testing gaps for production confidence
  - Tracker:
    - Status: Completed
    - Type: Task
    - Component: QA/Testing
    - Owner: TBD
    - Labels: testing, reliability
    - Acceptance criteria: load/soak tests, replay determinism tests, chaos tests for Kafka/DB failures; CI gates for critical suites.
  - Evidence: replay determinism test covers WAL rotation and non-limit orders (engine/tests/replay_determinism.rs); invariants include cancels, market/IOC/post-only paths (engine/tests/invariants.rs); load/soak harness added with failure threshold and steady pacing (load-test/src/main.rs); chaos scripts for Kafka/Postgres pauses updated to bash (scripts/chaos); CI workflow gates critical suites and scheduled load runs (.github/workflows/ci.yml, .github/workflows/load-soak.yml); testing guide documented (docs/TESTING.md).
  - Required: none.

- PR-016 Market-wide halt/circuit breaker or auction/uncrossing modes
  - Tracker:
    - Status: Needs Review
    - Type: Task
    - Component: Risk/Engine
    - Owner: TBD
    - Labels: risk, controls, auction
    - Acceptance criteria: global halt/cancel-only modes; configurable circuit breaker rules (price bands/volatility/market-wide triggers); optional auction/uncrossing mode with deterministic clearing; tests for halt transitions and auction outcomes.
  - Evidence: market-wide state + manual auction/uncrossing flow now exist (engine/src/engine.rs; engine/src/api.rs; docs/AUCTION.md). Circuit breaker evaluation/auto-triggers are still missing.
  - Required: implement configurable circuit breakers (price bands/volatility/market-wide triggers) with metrics/alerts; review/tune auction policy and thresholds per venue; add tests for trigger evaluation.

## Notes on missing functionality (if required by product)
- Order modification / cancel-replace and bulk cancels are not present.
- No explicit market-wide halt/circuit breaker or auction/uncrossing modes.
- OMS and market-data depend on Kafka delivery; no offline reconciliation workflow documented.
- No explicit data retention or archival policy for WAL/outboxes/trades.

## Suggested next steps
1) Confirm product requirements (order types, risk rules, compliance scope, deployment model).
2) Prioritize P0 items into an implementation plan; add tests for each fix.
3) Build tracker-ready backlog from these gaps.
