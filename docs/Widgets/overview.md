---
sidebar_position: 1
---

# Widgets Overview

Euclid Widgets are ready-to-use React/TypeScript components that give your app Euclid-powered swap, payment, pricing, and quote functionality with a few lines of code.

## Available Widgets

| Widget | Purpose | Wallet required? |
|---|---|---|
| [Swap Widget](./swap-widget) | Cross-chain token swap | Yes (for signing) |
| [Payment Widget](./payment-widget) | Fixed-recipient payment | Yes (for signing) |
| [Pricing Widget](./pricing-widget) | Live token price ticker | No |
| [Quote Widget](./quote-widget) | Read-only price quote | No |

## Try it live

→ [Open the Widget Playground](/widget-playground)

## Requirements

React 18+ and TypeScript are required. No additional HTTP library is needed — widgets use native `fetch`.

## How it works

1. Copy the widget component source from the relevant doc page
2. Place it in your `src/components/` directory
3. Copy the shared files (`api.ts`, `types.ts`, `theme.ts`, `utils.ts`) into `src/components/widgets/shared/`
4. Import and use the widget in your app

Widgets build a typed `SwapPayload` object and pass it to your `onSwapReady` callback. You then pass this to your wallet library (wagmi for EVM, CosmJS for Cosmos) to sign and broadcast.
