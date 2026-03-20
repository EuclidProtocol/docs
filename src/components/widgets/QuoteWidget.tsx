// src/components/widgets/QuoteWidget.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import type { WidgetTheme, TokenMeta, SwapPath } from "./shared/types";
import { fetchTokens, fetchRoutes } from "./shared/api";
import { applyTheme, DEFAULT_THEME } from "./shared/theme";
import { toBaseUnits, fromBaseUnits } from "./shared/utils";
import styles from "./Widget.module.css";

export type QuoteWidgetProps = {
  tokenIn: string;
  tokenOut: string;
  amountIn?: string;
  // chainUid is passed to fetchRoutes as chain_uids filter when provided
  chainUid?: string;
  refreshIntervalMs?: number;
  theme?: Partial<WidgetTheme>;
  apiBase?: string;
};

export function QuoteWidget({
  tokenIn,
  tokenOut,
  amountIn = "1",
  chainUid,
  refreshIntervalMs = 30_000,
  theme,
  apiBase,
}: QuoteWidgetProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [tokenMap, setTokenMap] = useState<Record<string, TokenMeta>>({});
  const [path, setPath] = useState<SwapPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Apply theme CSS vars
  useEffect(() => {
    if (rootRef.current) applyTheme(rootRef.current, { ...DEFAULT_THEME, ...theme });
  }, [theme]);

  // Load token metadata for decimal info
  useEffect(() => {
    fetchTokens({ base: apiBase, limit: 200 })
      .then((tokens) => {
        const map: Record<string, TokenMeta> = {};
        tokens.forEach((t) => (map[t.tokenId] = t));
        setTokenMap(map);
      })
      .catch(() => {}); // non-fatal
  }, [apiBase]);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const inMeta = tokenMap[tokenIn];
      const decimals = inMeta?.coinDecimal ?? 6;
      const amount_in = toBaseUnits(amountIn, decimals);
      const result = await fetchRoutes({
        token_in: tokenIn,
        token_out: tokenOut,
        amount_in,
        base: apiBase,
        ...(chainUid ? { chain_uids: [chainUid] } : {}),
      });
      if (result.paths.length > 0) {
        // Pick lowest price impact path
        const best = result.paths.reduce((a, b) =>
          parseFloat(a.total_price_impact) <= parseFloat(b.total_price_impact) ? a : b
        );
        setPath(best);
        setLastUpdated(new Date());
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to fetch quote");
    } finally {
      setLoading(false);
    }
  }, [tokenIn, tokenOut, amountIn, apiBase, tokenMap, chainUid]);

  // Only fire once token metadata is loaded (needed for correct decimal conversion)
  useEffect(() => {
    if (Object.keys(tokenMap).length > 0) refresh();
  }, [tokenMap, refresh]);

  useEffect(() => {
    const id = setInterval(refresh, refreshIntervalMs);
    return () => clearInterval(id);
  }, [refresh, refreshIntervalMs]);

  const inMeta = tokenMap[tokenIn];
  const outMeta = tokenMap[tokenOut];
  const outDecimals = outMeta?.coinDecimal ?? 6;
  const bestAmountOut = path?.path[path.path.length - 1]?.amount_out;
  const formattedOut = bestAmountOut ? fromBaseUnits(bestAmountOut, outDecimals) : null;
  const impact = path ? parseFloat(path.total_price_impact) : null;

  return (
    <div ref={rootRef} className={styles.widget}>
      <div className={styles.row} style={{ marginBottom: "0.75rem" }}>
        <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>Live Quote</span>
        {lastUpdated && (
          <span style={{ fontSize: "0.75rem", color: "var(--w-muted)" }}>
            Updated {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>

      <div className={styles.panel}>
        <div className={styles.row}>
          <div>
            <div className={styles.label}>You send</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
              {inMeta?.image && <img src={inMeta.image} className={styles.tokenImg} alt={inMeta.displayName} />}
              <span style={{ fontWeight: 600, fontSize: "1.2rem" }}>{amountIn}</span>
              <span style={{ color: "var(--w-muted)" }}>{inMeta?.displayName ?? tokenIn}</span>
            </div>
          </div>

          <span style={{ color: "var(--w-muted)", fontSize: "1.2rem" }}>→</span>

          <div style={{ textAlign: "right" }}>
            <div className={styles.label}>You receive</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem", justifyContent: "flex-end" }}>
              {loading ? (
                <div className={styles.skeleton} style={{ width: "80px" }} />
              ) : formattedOut ? (
                <>
                  {outMeta?.image && <img src={outMeta.image} className={styles.tokenImg} alt={outMeta.displayName} />}
                  <span style={{ fontWeight: 600, fontSize: "1.2rem" }}>{formattedOut}</span>
                  <span style={{ color: "var(--w-muted)" }}>{outMeta?.displayName ?? tokenOut}</span>
                </>
              ) : (
                <span style={{ color: "var(--w-muted)" }}>—</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {impact !== null && (
        <div className={styles.infoRow} style={{ marginTop: "0.6rem" }}>
          <span>Price impact</span>
          <span className={`${styles.impactBadge} ${impact > 2 ? styles.impactHigh : ""}`}>
            {impact.toFixed(2)}%
          </span>
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
