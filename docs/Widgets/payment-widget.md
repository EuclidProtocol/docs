---
sidebar_position: 3
---

import BrowserOnly from '@docusaurus/BrowserOnly';

# Payment Widget

A fixed-recipient payment flow. You (the developer) specify who receives what token. The payer selects any supported token to pay with — Euclid routes the swap cross-chain.

## Live Preview

<BrowserOnly>
  {() => {
    const { PaymentWidget } = require('@site/src/components/widgets/PaymentWidget');
    return (
      <PaymentWidget
        recipientAddress="0x1234567890abcdef1234567890abcdef12345678"
        recipientChainUid="bsc"
        tokenOut="euclid"
        onPaymentReady={(payload) => console.log("Payment payload:", payload)}
      />
    );
  }}
</BrowserOnly>

## Quick Start

```tsx
import { PaymentWidget } from "./components/widgets/PaymentWidget";

<PaymentWidget
  recipientAddress="0xYourMerchantAddress"
  recipientChainUid="bsc"
  tokenOut="euclid"
  onPaymentReady={(payload) => {
    // Pass to wallet to sign
    console.log(payload);
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `recipientAddress` | `string` | **required** | Fixed recipient wallet address |
| `recipientChainUid` | `string` | **required** | Chain the recipient receives on |
| `tokenOut` | `string` | **required** | Token the recipient receives |
| `senderAddress` | `string` | `""` | Pre-fill payer wallet address |
| `senderChainUid` | `string` | first chain | Payer's chain |
| `defaultTokenIn` | `string` | `"euclid"` | Default payment token |
| `defaultAmount` | `string` | `""` | Pre-fill amount |
| `slippageBps` | `number` | `500` | Slippage in basis points |
| `theme` | `Partial<WidgetTheme>` | — | Custom colors |
| `apiBase` | `string` | testnet URL | Override API base URL |
| `onPaymentReady` | `(payload: SwapPayload) => void` | — | Called with tx payload |
| `onError` | `(error: string) => void` | — | Called on error |

## API Calls Used

- [`token_metadatas` GQL](/docs/API/API%20Reference/GQL/Token/Token%20Metadata)
- [`router.all_chains` GQL](/docs/API/API%20Reference/GQL/Router/All%20Chains)
- [`POST /api/v1/routes`](/docs/API/API%20Reference/REST/Routes/Get%20Routes)
- [`POST /api/v1/execute/swap`](/docs/API/API%20Reference/REST/Transactions/Swap)
