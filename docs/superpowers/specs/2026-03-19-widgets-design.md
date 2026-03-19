# Euclid Widgets — Design Spec

**Date**: 2026-03-19
**Branch**: `widgets`
**Status**: Approved

---

## Overview

Add a **Widgets** section to the Euclid docs that gives developers four ready-to-use, copy-paste React/TypeScript components powered by the Euclid API. A companion **Widget Playground** interactive page lets users configure and preview widgets live before copying the code.

---

## Goals

- Developers can copy a self-contained React/TS component, drop it into their project, and have a working Euclid-powered UI with minimal setup.
- Each widget is configurable via props, not hardcoded to a specific token pair or chain.
- The playground serves as a live demo so developers can see the widget before embedding it.
- All widgets use the current (updated) Euclid API — not the old GQL-only approach from `gc/modals`.

---

## Architecture

### Approach

**Hybrid (A)**: An interactive Widget Playground page (not in the docs sidebar — accessible via navbar) + a `Widgets` docs section with one static page per widget. The playground is for exploration; the doc pages are the reference.

### New Docs Structure

```
docs/Widgets/
  overview.md
  swap-widget.md
  payment-widget.md
  pricing-widget.md
  quote-widget.md
```

### New Source Files

```
src/
  pages/
    widget-playground.tsx         ← interactive hub page (navbar link)
  components/
    widgets/
      shared/
        api.ts                    ← all Euclid API calls
        types.ts                  ← shared TypeScript types
        theme.ts                  ← CSS variable + theme helpers
      SwapWidget.tsx
      PaymentWidget.tsx
      PricingWidget.tsx
      QuoteWidget.tsx
      WidgetPlayground.tsx        ← the interactive builder component
```

### Navigation Changes

- `sidebars.ts`: Add `widgetsSidebar` pointing to `docs/Widgets/` (exact casing must match folder name)
- `docusaurus.config.ts`: Add "Widgets" navbar item with dropdown — "Playground" → `/widget-playground`, "Docs" → sidebar entry

---

## Shared Infrastructure

### `types.ts`

```ts
export type WidgetTheme = {
  accent: string      // primary action color, default "#092322" (Euclid dark teal)
  surface: string     // widget background, default "#ffffff"
  panel: string       // inner card background, default "#f4f6f8"
  border: string      // border color, default "#d7dde2"
  text: string        // primary text, default "#11181c"
  muted: string       // secondary/label text, default "#5f6b72"
}

export type TokenMeta = {
  tokenId: string
  displayName?: string
  image?: string
  coinDecimal?: number
  is_verified?: boolean
  chain_uids?: string[]
  price?: string
  price_change_24h?: number | string
  price_change_7d?: number | string
  total_volume?: string
  total_volume_24h?: string
}

export type ChainMeta = {
  chain_uid: string
  display_name?: string
  logo?: string
  type?: string
  chain_id?: string
  factory_address?: string
}

export type SwapHop = {
  route: string[]
  dex: string
  chain_uid: string
  amount_in: string
  amount_out: string
  amount_out_for_hops?: string[]
}

export type SwapPath = {
  path: SwapHop[]
  total_price_impact: string
}

export type RoutesResponse = {
  paths: SwapPath[]
}

// Payload returned by /api/v1/execute/swap
// Consumed app feeds this to wagmi (EVM) or CosmJS (Cosmos) for signing
export type SwapPayload = {
  type: "evm" | "cosmos"
  chain_id: string
  contract?: string
  sender: { chain_uid: string; address: string }
  msgs: unknown[]         // EVM: [{chainId, to, data, value}] / Cosmos: CosmWasm msgs
  rpc_url?: string
  rest_url?: string
  meta?: string
}
```

### `api.ts`

All API calls. Token and chain data is fetched via GQL (`/graphql`); swap execution via REST.

| Function | Transport | Endpoint / Query |
|---|---|---|
| `fetchTokens(opts?)` | GQL POST `/graphql` | `token_metadatas` query |
| `fetchChains(opts?)` | GQL POST `/graphql` | `router { all_chains }` query |
| `fetchRoutes(params)` | REST POST `/api/v1/routes` | Route discovery |
| `executeSwap(params)` | REST POST `/api/v1/execute/swap` | Build tx payload |
| `trackSwap(params)` | REST POST `/api/v1/txn/track/swap` | Track status |

Default base URL: `https://testnet.api.euclidprotocol.com`

`fetchTokens` accepts `{ verified?: boolean, dex?: string[], limit?: number, showVolume?: boolean }`.
`fetchChains` returns all chains including chain type (evm/cosmos).

### `theme.ts`

- `applyTheme(el: HTMLElement, theme: WidgetTheme)`: injects CSS custom properties on a widget root element
- `hexToRgba(hex: string, alpha: number)`: generates soft/translucent accent variants
- `DEFAULT_THEME`: the default `WidgetTheme` object

---

## Widget Designs

### 1. Swap Widget (`SwapWidget.tsx`)

**Purpose**: Full swap flow — select tokens and chains, get a quote, build a swap transaction payload ready for wallet signing.

**Props**:
```ts
{
  defaultTokenIn?: string          // token ID, e.g. "euclid"
  defaultTokenOut?: string         // token ID, e.g. "usdc"
  defaultChainUid?: string         // sender's chain, e.g. "bsc"
  senderAddress?: string           // pre-fill sender wallet address
  slippageBps?: number             // default 500 (5%)
  partnerFeeBps?: number
  partnerFeeRecipient?: string
  theme?: Partial<WidgetTheme>
  apiBase?: string                 // override API base URL
  onSwapReady?: (payload: SwapPayload) => void  // called with tx payload for wallet signing
  onError?: (error: string) => void
}
```

**API flow**:
1. On mount: `fetchTokens()` + `fetchChains()` in parallel (GQL)
2. On token/amount/chain change: `POST /api/v1/routes` → display best route + price impact
3. On "Build Swap Tx": `POST /api/v1/execute/swap` → call `onSwapReady(payload)`
4. Tracking: `POST /api/v1/txn/track/swap` (optional, can be wired up by consumer via `onSwapReady`)

**UI states**: loading → idle → fetching quote → quote ready → building tx → tx ready → error

**Amount handling**: Input is in human-readable units (e.g. "1.5"). Widget converts to base units using `coinDecimal` from token metadata before passing to API. `amount_out` from routes response is formatted back to human-readable for display.

**Note**: The widget builds the transaction payload but does NOT sign or broadcast — that is left to the consuming app's wallet integration (e.g. wagmi, CosmJS). `onSwapReady` receives the typed `SwapPayload`.

---

### 2. Payment Widget (`PaymentWidget.tsx`)

**Purpose**: Fixed-recipient payment flow. The merchant/app specifies who receives what token; the payer picks any supported token to pay with. Euclid handles the cross-chain swap routing.

**Props**:
```ts
{
  recipientAddress: string         // required — fixed recipient wallet address
  recipientChainUid: string        // required — chain they receive on
  tokenOut: string                 // required — token recipient receives
  senderAddress?: string           // payer's wallet address (pre-fill or injected by app)
  senderChainUid?: string          // payer's chain (pre-fill or let user select)
  defaultTokenIn?: string          // payer's preferred input token
  defaultAmount?: string           // pre-fill amount in human-readable units
  slippageBps?: number             // default 500
  theme?: Partial<WidgetTheme>
  apiBase?: string
  onPaymentReady?: (payload: SwapPayload) => void
  onError?: (error: string) => void
}
```

**API flow**: Same as Swap Widget. `tokenOut`, `recipientAddress`, and `recipientChainUid` are locked — the API's `recipients` field is pre-populated from these props. User only selects `tokenIn` and `amount`.

**Amount handling**: Same decimal conversion as SwapWidget.

---

### 3. Pricing Widget (`PricingWidget.tsx`)

**Purpose**: Live token price ticker. Shows a paginated table of tokens with current price, 24h and 7d change. Auto-refreshes.

**Props**:
```ts
{
  tokens?: string[]                // filter to specific token IDs; default = all verified
  pageSize?: number                // default 8
  refreshIntervalMs?: number       // default 15000
  showVolume?: boolean             // default false — gates both the query param AND the UI column
  theme?: Partial<WidgetTheme>
  apiBase?: string
}
```

**API flow**: GQL `token_metadatas` query on mount, then polled at `refreshIntervalMs`. When `showVolume` is `false`, `show_volume: false` is passed to the query (avoids fetching unused data). Filters: `verified: true`, `dex: ["euclid"]`.

**UI**: Table with token logo, name, price, 24h %, 7d % (and optionally volume). Pagination controls. Change values are color-coded (green = positive, red = negative).

---

### 4. Quote Widget (`QuoteWidget.tsx`)

**Purpose**: Lightweight read-only price display for a fixed token pair. Shows the current output amount and price impact for a given input. No wallet required — purely informational.

**Props**:
```ts
{
  tokenIn: string                  // required — token ID
  tokenOut: string                 // required — token ID
  amountIn?: string                // human-readable input amount, default "1"
  chainUid?: string                // optional chain hint for routing
  refreshIntervalMs?: number       // default 30000
  theme?: Partial<WidgetTheme>
  apiBase?: string
}
```

**Amount handling**: `amountIn` is human-readable (e.g. `"1"`). Widget fetches token metadata first to get `coinDecimal`, converts to base units before calling `/api/v1/routes`, then formats `amount_out` back to human-readable for display.

**API flow**: `fetchTokens()` on mount to get decimals for both tokens, then `POST /api/v1/routes` on mount + refresh interval. Displays best path's formatted `amount_out` and `total_price_impact`.

**UI**: Compact card — token pair header, amount in → amount out (formatted), price impact badge, "last updated" timestamp.

---

## Widget Playground (`WidgetPlayground.tsx` + `widget-playground.tsx`)

**Purpose**: Interactive hub where developers configure any widget and see a live preview. Linked from the navbar, not the docs sidebar.

**Layout**: Two-panel — left = config controls (widget selector, token/chain pickers, theme color inputs), right = live preview of the selected widget.

**Affordance**: Prominent "View docs →" link above the preview panel pointing to the relevant widget doc page, so developers know where to find the copy-paste code.

**Replaces**: `WidgetBuilder.tsx` from `gc/modals` — same concept, rebuilt with updated API calls, split into the four widget components.

**No code snippet generation**: The playground does NOT generate a copy-paste snippet. The doc pages are the authoritative source of copy-paste code.

---

## Doc Pages (per widget)

Each doc page (`swap-widget.md`, etc.) follows this structure:

1. **Overview** — what it does, use case
2. **Live preview** — embedded React component (same component users copy, rendered inline). Shows a loading skeleton if the API is unavailable rather than an error state breaking the page.
3. **Quick start** — required npm deps + minimal copy-paste usage example with `senderAddress` and `onSwapReady` wired up
4. **Props reference** — table of all props with types, defaults, descriptions
5. **API calls used** — links to the relevant API reference pages
6. **Theming** — how to customize colors via the `theme` prop, with a theme color table

---

## Out of Scope

- Wallet connection logic (left to consuming app)
- Transaction signing/broadcasting (widget outputs `SwapPayload` only)
- Liquidity/pool widgets (future)
- npm package distribution (future)
- Vanilla JS / iframe embed versions (future)
- Mainnet support in playground (testnet only for now)
