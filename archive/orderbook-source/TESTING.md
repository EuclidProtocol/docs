# Testing Guide

This repo separates fast correctness checks (run on every PR) from heavier validation (run on demand or nightly).

## CI (PR gating)
- `cargo test --workspace` runs unit + integration + determinism + property tests.

## Replay determinism
Validates that snapshot + WAL replay yields identical engine state.

```
cargo test -p engine replay_determinism
```

## Property tests (invariants)
Checks orderbook invariants across randomized inputs.

```
cargo test -p engine invariants
```

## Load test (in-process engine)
Runs a synthetic load against the matching engine directly (no HTTP/auth required).

```
LOAD_USERS=25 \
LOAD_ORDERS_PER_USER=5 \
LOAD_DURATION_SECS=30 \
LOAD_PAIR_ID=ETH-USDC \
cargo run -p load-test
```

Or use the Makefile target:

```
make load-test
```

Optional knobs:
- `LOAD_BASE_PRICE` (default 100000)
- `LOAD_PRICE_SPREAD` (default 500)
- `LOAD_SIZE` (default 5)
- `LOAD_WAL_PATH` (defaults to a temp file)
- `LOAD_WAL_SYNC_INTERVAL` (default 1024)
- `LOAD_FAIL_THRESHOLD_PCT` (default 0; fail if exceeded)
- `LOAD_KEEP_WAL=true` to keep the WAL file

## Soak test
Use the same load test with a longer duration (e.g., 10-30 minutes) and lower rate.

```
LOAD_DURATION_SECS=1800 LOAD_ORDERS_PER_USER=2 cargo run -p load-test
```

Makefile shorthand:

```
make soak-test
```

## Chaos / failure injection (manual)
These scripts pause containers to simulate temporary Kafka or Postgres outages.

```
./scripts/chaos/pause_kafka.sh 10
./scripts/chaos/pause_postgres.sh 10
```

After unpause, verify consumers catch up and services recover without manual intervention.
