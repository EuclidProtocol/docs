---
sidebar_label: FAQ
---

# Aggregator FAQ

## How should we evaluate quote quality?

Use `paths` from the Routes response and evaluate by your policy: output amount, price impact, and execution constraints.

## How do we keep quotes reliable?

Use short TTLs, re-quote before execution, and submit the exact selected `swap_path`.

## What should we track after broadcast?

Track by `chain` + `tx_hash`, then surface terminal status and final destination amount/chain.

## What if execution is delayed?

Keep state as pending, continue polling with backoff, and expose retry/support actions only when your timeout policy is reached.

## Is execution deterministic?

It is deterministic for the payload you submit. Validate sender context, selected route, and recipient data before signing and broadcast.
