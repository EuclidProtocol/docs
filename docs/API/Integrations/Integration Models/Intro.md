---
sidebar_label: Overview
---

# Integration Models Overview

Euclid supports two primary integration models for moving assets, executing swaps and transfers, and building cross-chain user experiences:

- **Standard API Integration**: the traditional wallet-sign-and-broadcast transaction path.
- **Voucher-Based Integration**: an abstracted model built around voucher balances, optionally combined with meta-transactions for gasless execution.

Both models expose the same core protocol capabilities, but they differ in how value is represented, how users authorize actions, how many cross-chain cycles are required, who pays gas, and how much orchestration the integrator needs to operate.

## The Two Models

### Standard API Integration

This is the most familiar blockchain execution path.

A partner application:
- calls a Euclid execution endpoint such as `swap`, `deposit`, `withdraw`, or `transfer`
- receives a transaction payload
- asks the user to sign with their wallet
- broadcasts the transaction on the relevant chain

From the user perspective, this feels like a normal on-chain transaction:
- connect wallet
- sign transaction
- pay gas on the origin chain
- wait for confirmation and relay progress

This is the easiest model to understand for Web3-native users because it preserves the standard wallet and gas mental model.

### Voucher-Based Integration

Voucher-based integration abstracts value into vouchers inside Euclid's settlement system.

Instead of moving real tokens across chains for every action:
- users operate on voucher balances
- routing, swaps, and transfers can happen within Euclid's internal settlement layer
- the underlying assets remain escrowed and only need to move physically when entering or exiting the system

This model can be used in two ways:
- voucher execution with normal transactions
- voucher execution with meta-transactions, where users sign an intent and a relayer submits the execution

That makes repeated actions and cross-chain flows materially smoother.

## Core Difference

### Standard API: Execute Directly On Chain

In the standard path, each action is treated as a real blockchain transaction on the chain where it begins.

That means:
- each step is visible as a normal chain transaction
- the user must hold the correct gas token
- wallet prompting is required for each action
- the action timeline depends on actual chain finality and relay steps

This is conceptually simple, but operationally heavier for the user.

### Voucher-Based: Move Value Internally First

In the voucher path, Euclid separates economic movement from physical token movement.

That means:
- user value is represented as vouchers inside Euclid
- internal actions can settle on Euclid's settlement layer
- assets only move on-chain at the boundaries: deposit and withdrawal/redemption
- with meta-transactions, the user signs a message rather than paying gas directly

This is the main reason voucher-based integrations can feel faster and cleaner.

## Why Vouchers Matter

Vouchers are the core accounting primitive behind the abstracted model.

They are:
- a virtual representation of user value inside Euclid
- fully backed 1:1 by escrowed on-chain assets
- on-chain and auditable
- controlled through protocol-level mint and burn logic

Practically, vouchers matter because they let the protocol avoid moving real tokens across chains for every intermediate step. Real assets move at the boundaries. Everything in between can stay inside the voucher layer.

That enables:
- faster internal routing
- smoother repeated actions
- less gas complexity for the user
- product patterns such as a single abstracted balance across chains

## Benefits And Tradeoffs

| Model | Strengths | Tradeoffs |
| --- | --- | --- |
| Standard API | Fast launch, familiar UX | More wallet prompts, more gas friction, and slower multi-step cross-chain flows |
| Voucher-Based | Better UX, gas abstraction | More orchestration, heavier signature/relayer lifecycle management, and higher backend responsibility |

## Best Fit By Product Shape

| Product type | Strong default fit | Why |
| --- | --- | --- |
| Aggregators | Standard API | Matches direct token-routing expectations and keeps backend simpler |
| DEXs / trading apps | Voucher-based, especially with meta-transactions | Better for repeated actions, faster perceived UX, and abstracted balances |
| Consumer apps | Depends on UX goals | Standard API is simpler to launch; voucher-based is better when reducing friction matters most |
