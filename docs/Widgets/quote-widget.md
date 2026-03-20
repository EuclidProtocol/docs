---
sidebar_position: 5
---

import BrowserOnly from '@docusaurus/BrowserOnly';

# Quote Widget

A compact, read-only price display for a fixed token pair. Shows how much of `tokenOut` you'd receive for a given `amountIn`. Refreshes automatically. No wallet required.

## Live Preview

<BrowserOnly>
  {() => {
    const { QuoteWidget } = require('@site/src/components/widgets/QuoteWidget');
    return <QuoteWidget tokenIn="euclid" tokenOut="usdc" amountIn="1" />;
  }}
</BrowserOnly>

## Quick Start

```tsx
import { QuoteWidget } from "./components/widgets/QuoteWidget";

<QuoteWidget
  tokenIn="euclid"
  tokenOut="usdc"
  amountIn="1"
  refreshIntervalMs={30000}
/>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tokenIn` | `string` | **required** | Input token ID |
| `tokenOut` | `string` | **required** | Output token ID |
| `amountIn` | `string` | `"1"` | Human-readable input amount |
| `chainUid` | `string` | — | Optional chain hint for routing |
| `refreshIntervalMs` | `number` | `30000` | Auto-refresh interval in ms |
| `theme` | `Partial<WidgetTheme>` | — | Custom colors |
| `apiBase` | `string` | testnet URL | Override API base URL |

## API Calls Used

- [`token_metadatas` GQL](/docs/API/API%20Reference/GQL/Token/Token%20Metadata) — for decimal info
- [`POST /api/v1/routes`](/docs/API/API%20Reference/REST/Routes/Get%20Routes) — polled on interval
