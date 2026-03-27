---
sidebar_position: 1
---

# Widgets Overview

Euclid Widgets are copy-paste React/TypeScript components you drop into your own app to add swap, payment, pricing, and quote functionality powered by the Euclid Protocol.

## Available Widgets

| Widget | Purpose | Wallet needed? |
|---|---|---|
| [Swap Widget](./swap-widget) | Cross-chain token swap | Yes — for signing the tx |
| [Payment Widget](./payment-widget) | Fixed-recipient payment flow | Yes — for signing the tx |
| [Pricing Widget](./pricing-widget) | Live token price ticker | No |
| [Quote Widget](./quote-widget) | Read-only price quote for a pair | No |

## Setup

Each widget depends on four shared files. Copy all of them into your project once — every widget uses them.

**Folder structure in your project:**
```
src/
  components/
    widgets/
      shared/
        types.ts       ← TypeScript types
        api.ts         ← All Euclid API calls
        theme.ts       ← CSS variable theme system
        utils.ts       ← Decimal conversion helpers
      Widget.module.css  ← Shared CSS (copy alongside each widget)
      SwapWidget.tsx     ← copy whichever widgets you need
      PricingWidget.tsx
      ...
```

### `shared/types.ts`

```ts
export type WidgetTheme = {
  accent: string;
  surface: string;
  panel: string;
  border: string;
  text: string;
  muted: string;
};

export type TokenMeta = {
  tokenId: string;
  displayName?: string;
  image?: string;
  coinDecimal?: number;
  is_verified?: boolean;
  chain_uids?: string[];
  price?: string;
  price_change_24h?: number | string;
  price_change_7d?: number | string;
  total_volume?: string;
  total_volume_24h?: string;
};

export type ChainMeta = {
  chain_uid: string;
  chain_id?: string;
  factory_address?: string;
};

export type SwapHop = {
  route: string[];
  dex: string;
  chain_uid: string;
  amount_in: string;
  amount_out: string;
  amount_out_for_hops?: string[];
};

export type SwapPath = {
  path: SwapHop[];
  total_price_impact: string;
};

export type RoutesResponse = {
  paths: SwapPath[];
};

export type EvmMsg = {
  chainId: string;
  to: string;
  data: string;
  value: string;
};

// Returned by executeSwap — pass this to wagmi or CosmJS to sign
export type SwapPayload = {
  chain_id: string;
  contract?: string;
  msgs: EvmMsg[];
  meta?: string;
  [key: string]: unknown;
};
```

### `shared/api.ts`

```ts
import type { TokenMeta, ChainMeta, RoutesResponse, SwapPayload } from "./types";

const DEFAULT_BASE = "https://api.euclidprotocol.com";

async function gql<T>(base: string, query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${base}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`GQL ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data as T;
}

async function rest<T>(base: string, path: string, body: unknown): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`REST ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

const TOKEN_METADATA_QUERY = `
  query Tokens($limit: Int, $offset: Int, $verified: Boolean, $dex: [String!], $showVolume: Boolean, $search: String) {
    token {
      token_metadatas(limit: $limit, offset: $offset, verified: $verified, dex: $dex, show_volume: $showVolume, search: $search) {
        tokenId displayName image coinDecimal is_verified chain_uids
        price price_change_24h price_change_7d total_volume total_volume_24h
      }
    }
  }
`;

export async function fetchTokens(opts: {
  base?: string;
  limit?: number;
  offset?: number;
  verified?: boolean;
  dex?: string[];
  showVolume?: boolean;
  search?: string;
} = {}): Promise<TokenMeta[]> {
  const { base = DEFAULT_BASE, ...variables } = opts;
  const data = await gql<{ token: { token_metadatas: TokenMeta[] } }>(
    base,
    TOKEN_METADATA_QUERY,
    { limit: variables.limit ?? 100, ...variables }
  );
  return data.token.token_metadatas;
}

const CHAINS_QUERY = `
  query Chains {
    router {
      all_chains { chain_uid chain_id factory_address }
    }
  }
`;

export async function fetchChains(base = DEFAULT_BASE): Promise<ChainMeta[]> {
  const data = await gql<{ router: { all_chains: ChainMeta[] } }>(base, CHAINS_QUERY, {});
  return data.router.all_chains;
}

export async function fetchRoutes(params: {
  token_in: string;
  token_out: string;
  amount_in: string;
  chain_uids?: string[];
  external?: boolean;
  base?: string;
}): Promise<RoutesResponse> {
  const { base = DEFAULT_BASE, ...body } = params;
  return rest<RoutesResponse>(base, "/api/v1/routes", {
    external: true,
    chain_uids: [],
    ...body,
  });
}

export async function executeSwap(params: {
  base?: string;
  amount_in: string;
  asset_in: unknown;
  slippage: string;
  recipients: unknown[];
  sender: { address: string; chain_uid: string };
  swap_path: unknown;
  partner_fee?: { partner_fee_bps: number; recipient: string };
}): Promise<SwapPayload> {
  const { base = DEFAULT_BASE, ...body } = params;
  return rest<SwapPayload>(base, "/api/v1/execute/swap", body);
}
```

### `shared/theme.ts`

```ts
import type { WidgetTheme } from "./types";

export const DEFAULT_THEME: WidgetTheme = {
  accent: "#092322",
  surface: "#ffffff",
  panel: "#f2f4f6",
  border: "rgba(17,24,28,0.12)",
  text: "#11181c",
  muted: "#4b5563",
};

export function hexToRgba(hex: string, alpha: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(9,35,34,${alpha})`;
  return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},${alpha})`;
}

export function applyTheme(el: HTMLElement, theme: Partial<WidgetTheme>): void {
  const merged = { ...DEFAULT_THEME, ...theme };
  el.style.setProperty("--w-accent", merged.accent);
  el.style.setProperty("--w-accent-soft", hexToRgba(merged.accent, 0.08));
  el.style.setProperty("--w-surface", merged.surface);
  el.style.setProperty("--w-panel", merged.panel);
  el.style.setProperty("--w-border", merged.border);
  el.style.setProperty("--w-text", merged.text);
  el.style.setProperty("--w-muted", merged.muted);
}
```

### `shared/utils.ts`

```ts
export function toBaseUnits(humanAmount: string, decimals: number): string {
  const [whole, frac = ""] = humanAmount.split(".");
  const fracPadded = frac.padEnd(decimals, "0").slice(0, decimals);
  const combined = BigInt(whole || "0") * (BigInt(10) ** BigInt(decimals)) + BigInt(fracPadded || "0");
  return combined.toString();
}

export function fromBaseUnits(baseAmount: string, decimals: number): string {
  if (!baseAmount || baseAmount === "0") return "0";
  const padded = baseAmount.padStart(decimals + 1, "0");
  const whole = padded.slice(0, padded.length - decimals) || "0";
  const frac = padded.slice(padded.length - decimals).replace(/0+$/, "");
  return frac ? `${whole}.${frac}` : whole;
}

export function formatChange(val: number | string | undefined): string {
  if (val == null || val === "") return "—";
  const n = Number(val);
  if (isNaN(n)) return "—";
  return (n >= 0 ? "+" : "") + n.toFixed(2) + "%";
}

export function shortAddress(addr: string): string {
  if (!addr || addr.length < 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}
```

### `Widget.module.css`

Copy this file from the [source on GitHub](https://github.com/EuclidProtocol/docs/blob/widgets/src/components/widgets/Widget.module.css) or grab it from the widget doc pages — each one notes which CSS classes it uses.
