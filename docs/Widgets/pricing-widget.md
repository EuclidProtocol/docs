---
sidebar_position: 4
---

import BrowserOnly from '@docusaurus/BrowserOnly';

# Pricing Widget

A live token price ticker. Shows price, 24h change, and 7d change for all Euclid-supported tokens. Auto-refreshes. No wallet required.

## Live Preview

<BrowserOnly>
  {() => {
    const { PricingWidget } = require('@site/src/components/widgets/PricingWidget');
    return <PricingWidget pageSize={6} />;
  }}
</BrowserOnly>

## Quick Start

```tsx
import { PricingWidget } from "./components/widgets/PricingWidget";

// Show all tokens
<PricingWidget />

// Filter to specific tokens
<PricingWidget tokens={["euclid", "usdc", "bnb"]} pageSize={5} />
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tokens` | `string[]` | all | Filter to specific token IDs |
| `pageSize` | `number` | `8` | Tokens per page |
| `refreshIntervalMs` | `number` | `15000` | Auto-refresh interval in ms |
| `showVolume` | `boolean` | `false` | Show 24h volume column |
| `theme` | `Partial<WidgetTheme>` | — | Custom colors |
| `apiBase` | `string` | testnet URL | Override API base URL |

## API Calls Used

- [`token_metadatas` GQL query](/docs/API/API%20Reference/GQL/Token/Token%20Metadata) — polled on interval
