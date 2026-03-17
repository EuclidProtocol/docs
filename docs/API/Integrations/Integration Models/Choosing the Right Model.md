---
sidebar_label: Choosing the Right Model
---

# Choosing the Right Model

The right integration model depends less on protocol capability and more on your product goals, user expectations, and operational appetite.

## Choose Standard API Integration If

- speed to market is your top priority
- your users are already comfortable with wallet prompts and gas management
- you want the simplest integration surface
- your product is an aggregator or direct-execution interface
- you expect the output to be native and the product cannot really operate on internal voucher balances

## Choose Voucher-Based Integration If

- your priority is best-in-class user experience
- you are building multi-step or cross-chain-heavy flows
- you want to abstract gas costs away from users
- you support frequent or repeated activity
- you want a single-balance experience
- you want a smoother, more exchange-like user experience

## Product Fit

### Aggregators

Best default: **Standard API**

Why:
- easiest to integrate
- matches direct token-routing expectations
- works well with standard wallet-based execution
- keeps backend design simpler

Voucher-based execution can still make sense behind solver or backend infrastructure, but it is usually not the default fit for aggregator UX.

### DEXs And Trading Apps

Best strategic fit: **Voucher-based**, especially with meta-transactions

Why:
- stronger UX for repeated actions
- better fit for high-frequency activity
- easier to support abstracted balances
- can feel closer to exchange-style execution

This is one of the strongest fits for voucher-layer execution.

### Consumer Apps And Embedded Flows

Best fit depends on the user journey.

Choose Standard API when:
- simplicity matters most
- users are already crypto-native
- direct wallet flow is acceptable

Choose Voucher-based when:
- you want less friction
- you want to reduce visible gas complexity
- you want a smoother cross-chain experience

## Decision Matrix

| Priority | Better fit |
| --- | --- |
| Fastest launch | Standard API |
| Lowest backend complexity | Standard API |
| Familiar wallet UX | Standard API |
| Best end-user experience | Voucher-based |
| Gas abstraction | Voucher-based |
| Repeated actions / trading-like flows | Voucher-based |
| Single abstracted balance | Voucher-based |

## Final Guidance

Standard API is the right default when you want fast launch, direct on-chain compatibility, and minimal orchestration.

Voucher-based integration is the better long-term operating model when product quality, smoothness, and repeated cross-chain usage matter more than launch simplicity.

For most cases that do not depend on a native output at the end of the flow, voucher-based integration is the recommended model because it lets you benefit more fully from Euclid's UX and performance advantages.
