---
sidebar_position: 4
---

import BrowserOnly from '@docusaurus/BrowserOnly';

# Pricing Widget

A live token price ticker. Displays price, 24h change, and 7d change for Euclid-supported tokens. Polls automatically. No wallet required.

## Live Preview

<BrowserOnly>
  {() => {
    const { PricingWidget } = require('@site/src/components/widgets/PricingWidget');
    return <PricingWidget pageSize={6} />;
  }}
</BrowserOnly>

## Component Code

Copy this file into your project at `src/components/widgets/PricingWidget.tsx`:

<details>
<summary>PricingWidget.tsx (click to expand)</summary>

```tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import type { WidgetTheme, TokenMeta } from "./shared/types";
import { fetchTokens } from "./shared/api";
import { applyTheme, DEFAULT_THEME } from "./shared/theme";
import { formatChange } from "./shared/utils";
import styles from "./Widget.module.css";

export type PricingWidgetProps = {
  tokens?: string[];
  pageSize?: number;
  refreshIntervalMs?: number;
  showVolume?: boolean;
  theme?: Partial<WidgetTheme>;
  apiBase?: string;
};

export function PricingWidget({
  tokens: filterTokens,
  pageSize = 8,
  refreshIntervalMs = 15_000,
  showVolume = false,
  theme,
  apiBase,
}: PricingWidgetProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [allTokens, setAllTokens] = useState<TokenMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (rootRef.current) applyTheme(rootRef.current, { ...DEFAULT_THEME, ...theme });
  }, [theme]);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchTokens({
        base: apiBase, verified: true, dex: ["euclid"], showVolume, limit: 200,
      });
      const filtered = filterTokens
        ? data.filter((t) => filterTokens.includes(t.tokenId))
        : data;
      setAllTokens(filtered);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load prices");
    } finally {
      setLoading(false);
    }
  }, [apiBase, filterTokens, showVolume]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    const id = setInterval(load, refreshIntervalMs);
    return () => clearInterval(id);
  }, [load, refreshIntervalMs]);

  const totalPages = Math.ceil(allTokens.length / pageSize);
  const pageTokens = allTokens.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div ref={rootRef} className={styles.widget} style={{ maxWidth: "100%" }}>
      <div className={styles.row} style={{ marginBottom: "0.75rem" }}>
        <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>Token Prices</span>
        {!loading && (
          <span style={{ fontSize: "0.75rem", color: "var(--w-muted)" }}>
            {allTokens.length} tokens · live
          </span>
        )}
      </div>
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {Array.from({ length: pageSize }).map((_, i) => (
            <div key={i} className={styles.skeleton} style={{ height: "36px" }} />
          ))}
        </div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Token</th>
                <th style={{ textAlign: "right" }}>Price</th>
                <th style={{ textAlign: "right" }}>24h</th>
                <th style={{ textAlign: "right" }}>7d</th>
                {showVolume && <th style={{ textAlign: "right" }}>Volume 24h</th>}
              </tr>
            </thead>
            <tbody>
              {pageTokens.map((token) => {
                const ch24 = Number(token.price_change_24h);
                const ch7d = Number(token.price_change_7d);
                return (
                  <tr key={token.tokenId}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {token.image
                          ? <img src={token.image} className={styles.tokenImg} alt={token.displayName} />
                          : <div className={styles.tokenImgPlaceholder}>{(token.displayName ?? token.tokenId).slice(0, 2).toUpperCase()}</div>}
                        <span style={{ fontWeight: 500 }}>{token.displayName ?? token.tokenId}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: "right", fontWeight: 500 }}>
                      {token.price ? `$${parseFloat(token.price).toFixed(4)}` : "—"}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span className={ch24 >= 0 ? styles.positive : styles.negative}>{formatChange(token.price_change_24h)}</span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span className={ch7d >= 0 ? styles.positive : styles.negative}>{formatChange(token.price_change_7d)}</span>
                    </td>
                    {showVolume && (
                      <td style={{ textAlign: "right", color: "var(--w-muted)" }}>
                        {token.total_volume_24h ? `$${Number(token.total_volume_24h).toLocaleString()}` : "—"}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button className={styles.pageBtn} onClick={() => setPage(0)} disabled={page === 0}>«</button>
              <button className={styles.pageBtn} onClick={() => setPage((p) => p - 1)} disabled={page === 0}>‹</button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i}
                  className={`${styles.pageBtn} ${i === page ? styles.pageBtnActive : ""}`}
                  onClick={() => setPage(i)}>{i + 1}</button>
              ))}
              <button className={styles.pageBtn} onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages - 1}>›</button>
              <button className={styles.pageBtn} onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1}>»</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
```

</details>

## Usage

```tsx
import { PricingWidget } from "./components/widgets/PricingWidget";

// Show all verified Euclid tokens
<PricingWidget />

// Filter to specific tokens, show volume
<PricingWidget
  tokens={["euclid", "usdc", "bnb"]}
  pageSize={5}
  showVolume={true}
/>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tokens` | `string[]` | all verified | Filter to specific token IDs |
| `pageSize` | `number` | `8` | Rows per page |
| `refreshIntervalMs` | `number` | `15000` | Poll interval in ms |
| `showVolume` | `boolean` | `false` | Show 24h volume column |
| `theme` | `Partial<WidgetTheme>` | — | Custom colors |
| `apiBase` | `string` | mainnet URL | Override API base URL |

## Theming

```tsx
<PricingWidget
  theme={{
    accent: "#0ea5e9",
    surface: "#0f172a",
    panel: "#1e293b",
    text: "#f1f5f9",
    muted: "#94a3b8",
    border: "rgba(241,245,249,0.08)",
  }}
/>
```
