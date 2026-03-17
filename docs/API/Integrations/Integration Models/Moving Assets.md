---
sidebar_label: Moving Assets
---

# Moving Assets: Two-Step vs One-Step

This page explains how Euclid can move assets across chains with either a two-step flow or a one-step user-visible flow.

This is Euclid's asset movement model. It is similar to what users often call bridging, but the point here is not a standalone bridge UX. The point is to move value across chains through Euclid's execution and settlement model.

## Two-Step Process

The two-step process separates deposit and withdrawal.

### Step 1: Deposit (Native -> Voucher)

- `Native -> Voucher = 2T`

The user deposits a native asset into Euclid and receives voucher balance.

### Step 2: Withdraw (Voucher -> Native)

- `Voucher -> Native = 4T`

The user redeems voucher value into a native asset on any other chain that supports that asset.

### Meta-Transaction Withdrawal

- `MetaTx Voucher -> Native = 2T`

This reduces user-side friction and can improve practical execution experience because the user signs an intent rather than directly paying gas for the withdrawal step.

### Two-Step Summary

- maximum total: `6T`
- average total: `4T`
- usually involves two visible stages
- usually requires two signatures in the normal non-meta flow

This model is more flexible, but heavier in user interaction.

## One-Step Process

The one-step process can be thought of as deposit and release in a single user-visible flow.

- `Native -> Native = 4T`

Interpretation:
- the user provides a native asset
- the system handles internal routing and final native release as one visible process
- there is no separate user-managed wait between deposit and redeem phases
- the experience feels like one continuous action rather than two operational stages

## Why This Matters

For products that need to move assets from one chain to another cleanly, the one-step flow can be easier to explain and easier to use because:

- there is less user waiting between stages
- the user does not need to understand vouchers explicitly
- there is only one visible action instead of two distinct ones
- payout and off-ramp style experiences feel cleaner

The two-step flow remains useful when you want users to enter the voucher system first and then continue operating from voucher balances.

## Comparison Table

| Process | Steps | Cost model | Signatures | UX characteristics |
| --- | --- | --- | --- | --- |
| Two-Step: Deposit then Withdraw | 2 | max `6T`, avg `4T` | 2 | Flexible but slower and more explicit |
| One-Step: Deposit and Release | 1 | `4T` | 1 | Cleaner for off-ramp and simple payout UX |

## Choosing Between Them

Use the two-step flow when:
- you want users to enter the voucher system and continue using voucher balances
- you expect follow-up actions inside Euclid after deposit
- explicit deposit and redemption stages are acceptable in the UX

Use the one-step flow when:
- the main goal is simply moving value from chain A to chain B
- you want the cleanest user-visible experience
- you do not want to expose voucher concepts in the core user journey
