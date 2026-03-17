---
sidebar_label: Performance
---

# Performance

This page explains the relative time and relay-cost model for Euclid integration patterns.

## The `T` Model

To compare different execution paths clearly, define:

- `T`: the cost of one cross-chain packet

`T` is a compact unit that represents both:
- relay time
- relay cost

## What A Cycle Means

One cycle is defined as `2T`, meaning at least two cross-chain packet events are required to complete that stage of the flow.

So:
- `1 cycle = 2T`
- `2 cycles = 4T`

This gives a simple way to compare native-token flows, voucher flows, and meta-transaction flows.

## Performance By Interaction Type

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1.7fr 1.15fr 0.55fr 2.6fr",
    width: "100%",
    border: "1px solid var(--ifm-color-emphasis-200)",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "var(--ifm-background-surface-color)",
  }}
>
  <div style={{ padding: "0.9rem", fontWeight: 700, backgroundColor: "var(--ifm-table-head-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)", whiteSpace: "nowrap" }}>Type</div>
  <div style={{ padding: "0.9rem", fontWeight: 700, backgroundColor: "var(--ifm-table-head-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)", whiteSpace: "nowrap" }}>Cycles</div>
  <div style={{ padding: "0.9rem", fontWeight: 700, backgroundColor: "var(--ifm-table-head-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)", whiteSpace: "nowrap" }}>Cost</div>
  <div style={{ padding: "0.9rem", fontWeight: 700, backgroundColor: "var(--ifm-table-head-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Typical meaning</div>

  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Native -&gt; Native</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>at least 2 cycles</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}><code>&gt;= 4T</code></div>
  <div style={{ padding: "0.9rem", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Full native cross-chain movement and settlement</div>

  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Voucher -&gt; Native</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>at least 2 cycles</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}><code>&gt;= 4T</code></div>
  <div style={{ padding: "0.9rem", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Redeeming voucher value back into a native asset</div>

  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Native -&gt; Voucher</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>1 cycle</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}><code>2T</code></div>
  <div style={{ padding: "0.9rem", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Depositing native assets into Euclid and minting vouchers</div>

  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Voucher -&gt; Voucher</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>1 cycle</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}><code>2T</code></div>
  <div style={{ padding: "0.9rem", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Value movement within the voucher layer</div>

  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>MetaTx Voucher -&gt; Native</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>at least 1 cycle</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}><code>&gt;= 2T</code></div>
  <div style={{ padding: "0.9rem", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>User signs intent; relayer handles execution to native redemption</div>

  <div style={{ padding: "0.9rem", whiteSpace: "nowrap" }}>MetaTx Voucher -&gt; Voucher</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap" }}>0 cycles</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap" }}><code>0T</code></div>
  <div style={{ padding: "0.9rem" }}>Fastest path; internal voucher-layer execution with no user gas</div>
</div>

## How To Read The Table

When a row uses `>=`, the final cost depends on how many destination chains the output is being released to. Releasing value to more chains means more settlement work and more relay packets, which pushes the total above the baseline minimum.

### Native -> Native

This is the traditional cross-chain path. Because real assets need to move and settle across chains, it requires at least two full cycles. It is generally the slowest and most relay-heavy option.

### Voucher -> Native

This is a redemption flow. Even though value is already represented internally, the system still needs to release a real asset on-chain, so the cycle profile remains relatively heavy.

### Native -> Voucher

This is the entry path into Euclid's voucher system. The user deposits native assets and receives voucher balance. It takes one cycle and is materially faster than full native-to-native movement.

### Voucher -> Voucher

This is where the architecture becomes powerful. Since value stays inside the internal settlement system, only one cycle is required in the baseline model.

### MetaTx Voucher -> Native

This still ends in a real native payout, so some real settlement remains necessary. The user experience improves because the user signs an intent while a relayer handles execution.

### MetaTx Voucher -> Voucher

This is the fastest path. Execution stays fully within the voucher layer and is submitted through relayer infrastructure, so the user experiences a near-immediate and gasless interaction.

## Practical Performance Summary

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1.8fr 1fr 1.35fr 1.35fr",
    width: "100%",
    border: "1px solid var(--ifm-color-emphasis-200)",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "var(--ifm-background-surface-color)",
  }}
>
  <div style={{ padding: "0.9rem", fontWeight: 700, backgroundColor: "var(--ifm-table-head-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)", whiteSpace: "nowrap" }}>Flow family</div>
  <div style={{ padding: "0.9rem", fontWeight: 700, backgroundColor: "var(--ifm-table-head-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)", whiteSpace: "nowrap" }}>User needs gas?</div>
  <div style={{ padding: "0.9rem", fontWeight: 700, backgroundColor: "var(--ifm-table-head-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>User signs direct tx?</div>
  <div style={{ padding: "0.9rem", fontWeight: 700, backgroundColor: "var(--ifm-table-head-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Relative UX speed</div>

  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Standard Native -&gt; Native</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Yes</div>
  <div style={{ padding: "0.9rem", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Yes</div>
  <div style={{ padding: "0.9rem", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Slowest</div>

  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Standard Native -&gt; Voucher</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Yes</div>
  <div style={{ padding: "0.9rem", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Yes</div>
  <div style={{ padding: "0.9rem", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Moderate</div>

  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Standard Voucher -&gt; Voucher</div>
  <div style={{ padding: "0.9rem", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Usually yes unless meta-tx</div>
  <div style={{ padding: "0.9rem", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Usually yes unless meta-tx</div>
  <div style={{ padding: "0.9rem", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Fast</div>

  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Standard Voucher -&gt; Native</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Yes</div>
  <div style={{ padding: "0.9rem", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Yes</div>
  <div style={{ padding: "0.9rem", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Slow</div>

  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>MetaTx Voucher -&gt; Voucher</div>
  <div style={{ padding: "0.9rem", whiteSpace: "nowrap", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>No</div>
  <div style={{ padding: "0.9rem", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>No, signs intent only</div>
  <div style={{ padding: "0.9rem", backgroundColor: "var(--ifm-table-stripe-background)", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>Fastest</div>

  <div style={{ padding: "0.9rem", whiteSpace: "nowrap" }}>MetaTx Voucher -&gt; Native</div>
  <div style={{ padding: "0.9rem" }}>No at user level</div>
  <div style={{ padding: "0.9rem" }}>No, signs intent only</div>
  <div style={{ padding: "0.9rem" }}>Very fast user-side, slower than Voucher -&gt; Voucher</div>
</div>

## Rules Of Thumb

- If real native assets must leave or enter the system, expect more relay cost and more waiting.
- If value can stay inside the voucher layer, the flow becomes much faster.
- Meta-transactions improve user experience most when combined with voucher-layer execution.
- The biggest UX gain comes from keeping repeated actions inside the voucher layer for as long as possible.
