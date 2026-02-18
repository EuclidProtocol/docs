---
sidebar_label: Operational Tips
id: operational-tips
---

# Step 5 — Operational Tips

Use these practices to keep execution reliable and user-facing status clear.

## Quote and execution policy

- Use short quote TTLs for volatile pairs.
- Re-quote before execution when TTL expires.
- Enforce deterministic payload generation from the selected route.

## Tracking and observability

- Persist `chain` + `tx_hash` for every execution.
- Track full lifecycle timestamps (quoted, submitted, terminal).
- Capture terminal failures with structured reason codes.

## UX guidance

- Show live status states (`pending`, `in_progress`, `success`, `failed`).
- Show final destination chain and settled amount.
- Provide a clear retry/support path when timeouts are reached.

## Optional hardening

- Add idempotency keys for execution requests.
- Add circuit-breakers for repeated endpoint failures.
- Alert on stuck swaps that exceed your timeout SLO.
