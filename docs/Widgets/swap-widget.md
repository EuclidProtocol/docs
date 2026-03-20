---
sidebar_position: 2
---

import BrowserOnly from '@docusaurus/BrowserOnly';

# Swap Widget

A full cross-chain swap UI. User selects input token, output token, amount, and chain. The widget fetches the best route and builds a signed-ready transaction payload.

## Live Preview

<BrowserOnly>
  {() => {
    const { SwapWidget } = require('@site/src/components/widgets/SwapWidget');
    return (
      <SwapWidget
        defaultTokenIn="euclid"
        defaultTokenOut="usdc"
        onSwapReady={(payload) => console.log("Swap payload:", payload)}
      />
    );
  }}
</BrowserOnly>

## Quick Start

Copy these files into your project:
- `src/components/widgets/SwapWidget.tsx`
- `src/components/widgets/Widget.module.css`
- `src/components/widgets/shared/api.ts`
- `src/components/widgets/shared/types.ts`
- `src/components/widgets/shared/theme.ts`
- `src/components/widgets/shared/utils.ts`

```tsx
import { SwapWidget } from "./components/widgets/SwapWidget";

// Minimal usage
<SwapWidget
  defaultTokenIn="euclid"
  defaultTokenOut="usdc"
  onSwapReady={(payload) => {
    // payload is typed as SwapPayload
    // Pass to wagmi's sendTransaction (EVM) or CosmJS (Cosmos)
    console.log(payload);
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultTokenIn` | `string` | `"euclid"` | Initial input token ID |
| `defaultTokenOut` | `string` | `"usdc"` | Initial output token ID |
| `defaultChainUid` | `string` | first chain | Sender chain UID |
| `senderAddress` | `string` | `""` | Pre-fill sender wallet address |
| `slippageBps` | `number` | `500` | Slippage tolerance in basis points (500 = 5%) |
| `partnerFeeBps` | `number` | — | Partner fee in basis points |
| `partnerFeeRecipient` | `string` | — | Partner fee recipient address |
| `theme` | `Partial<WidgetTheme>` | — | Custom colors |
| `apiBase` | `string` | testnet URL | Override API base URL |
| `onSwapReady` | `(payload: SwapPayload) => void` | — | Called with tx payload when ready to sign |
| `onError` | `(error: string) => void` | — | Called on any error |

## Theming

```tsx
<SwapWidget
  theme={{
    accent: "#6c47ff",   // primary color
    surface: "#1a1a2e",  // widget background
    panel: "#16213e",    // inner panel background
    text: "#eaeaea",     // text color
    muted: "#888",       // secondary text
    border: "rgba(255,255,255,0.1)",
  }}
/>
```

## API Calls Used

- [`token_metadatas` GQL query](/docs/API/API%20Reference/GQL/Token/Token%20Metadata) — fetch token list
- [`router.all_chains` GQL query](/docs/API/API%20Reference/GQL/Router/All%20Chains) — fetch chain list
- [`POST /api/v1/routes`](/docs/API/API%20Reference/REST/Routes/Get%20Routes) — get swap routes
- [`POST /api/v1/execute/swap`](/docs/API/API%20Reference/REST/Transactions/Swap) — build tx payload
