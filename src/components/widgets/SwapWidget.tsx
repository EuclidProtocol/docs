// src/components/widgets/SwapWidget.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { WidgetTheme, TokenMeta, ChainMeta, SwapPath, SwapPayload } from "./shared/types";
import { fetchTokens, fetchChains, fetchRoutes, executeSwap } from "./shared/api";
import { applyTheme, DEFAULT_THEME } from "./shared/theme";
import { toBaseUnits, fromBaseUnits } from "./shared/utils";
import styles from "./Widget.module.css";

export type SwapWidgetProps = {
  defaultTokenIn?: string;
  defaultTokenOut?: string;
  defaultRecipientChainUid?: string;
  senderAddress: string;
  senderChainUid: string;
  slippageBps?: number;
  partnerFeeBps?: number;
  partnerFeeRecipient?: string;
  theme?: Partial<WidgetTheme>;
  apiBase?: string;
  onSwapReady?: (payload: SwapPayload) => void;
  onError?: (error: string) => void;
};

type UIState = "idle" | "fetching-quote" | "quote-ready" | "building" | "ready" | "error";

// Defined at module scope to avoid remounting on every render (preserves input focus)
function TokenPicker({
  tokens,
  tokenSearch,
  setTokenSearch,
  onSelect,
  onClose,
  styles: s,
}: {
  tokens: TokenMeta[];
  tokenSearch: string;
  setTokenSearch: (v: string) => void;
  onSelect: (id: string) => void;
  onClose: () => void;
  styles: Record<string, string>;
}) {
  const filtered = tokens.filter(
    (t) =>
      !tokenSearch ||
      t.tokenId.toLowerCase().includes(tokenSearch.toLowerCase()) ||
      t.displayName?.toLowerCase().includes(tokenSearch.toLowerCase())
  );
  return (
    <div className={s.dropdown}>
      <input
        className={s.dropdownSearch}
        placeholder="Search token..."
        value={tokenSearch}
        onChange={(e) => setTokenSearch(e.target.value)}
        autoFocus
      />
      {filtered.map((t) => (
        <div
          key={t.tokenId}
          className={s.dropdownItem}
          onClick={() => { onSelect(t.tokenId); onClose(); setTokenSearch(""); }}
        >
          {t.image ? (
            <img src={t.image} className={s.tokenImg} alt={t.displayName} />
          ) : (
            <div className={s.tokenImgPlaceholder}>{t.tokenId.slice(0, 2).toUpperCase()}</div>
          )}
          <div>
            <div className={s.dropdownItemName}>{t.displayName ?? t.tokenId}</div>
            <div className={s.dropdownItemId}>{t.tokenId}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SwapWidget({
  defaultTokenIn = "eth",
  defaultTokenOut = "usdt",
  defaultRecipientChainUid,
  senderAddress,
  senderChainUid,
  slippageBps = 500,
  partnerFeeBps,
  partnerFeeRecipient,
  theme,
  apiBase,
  onSwapReady,
  onError,
}: SwapWidgetProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const [tokens, setTokens] = useState<TokenMeta[]>([]);
  const [chains, setChains] = useState<ChainMeta[]>([]);
  const [tokenIn, setTokenIn] = useState(defaultTokenIn);
  const [tokenOut, setTokenOut] = useState(defaultTokenOut);
  const [recipientChainUid, setRecipientChainUid] = useState(defaultRecipientChainUid ?? "");
  const [amountIn, setAmountIn] = useState("");
  const [recipientAddr, setRecipientAddr] = useState("");
  const [bestPath, setBestPath] = useState<SwapPath | null>(null);
  const [uiState, setUiState] = useState<UIState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showTokenInPicker, setShowTokenInPicker] = useState(false);
  const [showTokenOutPicker, setShowTokenOutPicker] = useState(false);
  const [tokenSearch, setTokenSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rootRef.current) applyTheme(rootRef.current, { ...DEFAULT_THEME, ...theme });
  }, [theme]);

  // Load tokens + chains on mount
  useEffect(() => {
    Promise.all([
      fetchTokens({ base: apiBase, verified: true, dex: ["euclid"], limit: 200 }),
      fetchChains(apiBase),
    ]).then(([t, c]) => {
      setTokens(t);
      setChains(c);
      if (!defaultRecipientChainUid && c.length > 0) setRecipientChainUid(c[0].chain_uid);
    }).catch(() => {
      setErrorMsg("Failed to load tokens/chains");
    }).finally(() => setLoading(false));
  }, [apiBase, defaultRecipientChainUid]);

  const tokenMap = Object.fromEntries(tokens.map((t) => [t.tokenId, t]));
  const inMeta = tokenMap[tokenIn];
  const outMeta = tokenMap[tokenOut];

  // Fetch quote when inputs change
  const fetchQuote = useCallback(async () => {
    if (!amountIn || parseFloat(amountIn) <= 0 || !tokenIn || !tokenOut) return;
    setUiState("fetching-quote");
    setBestPath(null);
    try {
      const decimals = inMeta?.coinDecimal ?? 6;
      const amount_in = toBaseUnits(amountIn, decimals);
      const result = await fetchRoutes({ token_in: tokenIn, token_out: tokenOut, amount_in, base: apiBase });
      if (result.paths.length === 0) throw new Error("No routes found");
      const best = result.paths.reduce((a, b) =>
        parseFloat(a.total_price_impact) <= parseFloat(b.total_price_impact) ? a : b
      );
      setBestPath(best);
      setUiState("quote-ready");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to get quote";
      setErrorMsg(msg);
      setUiState("error");
      onError?.(msg);
    }
  }, [amountIn, tokenIn, tokenOut, inMeta, apiBase, onError]);

  // Debounce quote fetch
  useEffect(() => {
    const t = setTimeout(() => { if (amountIn) fetchQuote(); }, 600);
    return () => clearTimeout(t);
  }, [amountIn, tokenIn, tokenOut, fetchQuote]);

  const handleBuildSwap = async () => {
    if (!bestPath || !recipientAddr) return;
    setUiState("building");
    try {
      const inDecimals = inMeta?.coinDecimal ?? 6;
      const lastHop = bestPath.path[bestPath.path.length - 1];
      const payload = await executeSwap({
        base: apiBase,
        amount_in: toBaseUnits(amountIn, inDecimals),
        asset_in: {
          token: tokenIn,
          token_type: { native: { denom: tokenIn } },
        },
        slippage: String(slippageBps),
        recipients: [
          {
            user: { address: recipientAddr, chain_uid: recipientChainUid },
            amount: { less_than_or_equal: lastHop.amount_out },
            denom: { native: { denom: tokenOut } },
            forwarding_message: "",
            unsafe_refund_as_voucher: false,
          },
        ],
        sender: { address: senderAddress, chain_uid: senderChainUid },
        swap_path: bestPath,
        ...(partnerFeeBps && partnerFeeRecipient
          ? { partner_fee: { partner_fee_bps: partnerFeeBps, recipient: partnerFeeRecipient } }
          : {}),
      });
      setUiState("ready");
      onSwapReady?.(payload);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to build swap";
      setErrorMsg(msg);
      setUiState("error");
      onError?.(msg);
    }
  };

  const outAmountOut = bestPath?.path[bestPath.path.length - 1]?.amount_out;
  const formattedOut = outAmountOut ? fromBaseUnits(outAmountOut, outMeta?.coinDecimal ?? 6) : null;
  const impact = bestPath ? parseFloat(bestPath.total_price_impact) : null;

  return (
    <div ref={rootRef} className={styles.widget} style={{ position: "relative" }}>
      <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "1rem" }}>Swap</div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div className={styles.skeleton} style={{ height: "80px" }} />
          <div className={styles.skeleton} style={{ height: "80px" }} />
        </div>
      ) : (
        <>
          {/* Token In */}
          <div className={styles.panel} style={{ marginBottom: "0.5rem", position: "relative" }}>
            <div className={styles.label}>You pay</div>
            <div className={styles.row}>
              <input
                className={styles.input}
                type="number"
                placeholder="0.00"
                value={amountIn}
                onChange={(e) => { setAmountIn(e.target.value); setUiState("idle"); setBestPath(null); }}
                style={{ flex: 1 }}
              />
              <div style={{ position: "relative" }}>
                <button className={styles.tokenSelect} onClick={() => { setShowTokenInPicker(!showTokenInPicker); setShowTokenOutPicker(false); }}>
                  {inMeta?.image && <img src={inMeta.image} className={styles.tokenImg} alt={inMeta.displayName} />}
                  {inMeta?.displayName ?? tokenIn} ▾
                </button>
                {showTokenInPicker && (
                  <TokenPicker tokens={tokens} tokenSearch={tokenSearch} setTokenSearch={setTokenSearch} styles={styles}
                    onSelect={(id) => { setTokenIn(id); setShowTokenInPicker(false); }}
                    onClose={() => setShowTokenInPicker(false)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Swap arrow */}
          <div className={styles.divider}>
            <button className={styles.swapArrow} onClick={() => { setTokenIn(tokenOut); setTokenOut(tokenIn); setBestPath(null); setUiState("idle"); }}>
              ⇅
            </button>
          </div>

          {/* Token Out */}
          <div className={styles.panel} style={{ position: "relative" }}>
            <div className={styles.label}>You receive</div>
            <div className={styles.row}>
              <div style={{ flex: 1, fontSize: "1.4rem", fontWeight: 500, color: formattedOut ? "var(--w-text)" : "var(--w-muted)" }}>
                {uiState === "fetching-quote" ? (
                  <div className={styles.skeleton} style={{ width: "100px", height: "1.4rem" }} />
                ) : (
                  formattedOut ?? "0.00"
                )}
              </div>
              <div style={{ position: "relative" }}>
                <button className={styles.tokenSelect} onClick={() => { setShowTokenOutPicker(!showTokenOutPicker); setShowTokenInPicker(false); }}>
                  {outMeta?.image && <img src={outMeta.image} className={styles.tokenImg} alt={outMeta.displayName} />}
                  {outMeta?.displayName ?? tokenOut} ▾
                </button>
                {showTokenOutPicker && (
                  <TokenPicker tokens={tokens} tokenSearch={tokenSearch} setTokenSearch={setTokenSearch} styles={styles}
                    onSelect={(id) => { setTokenOut(id); setShowTokenOutPicker(false); }}
                    onClose={() => setShowTokenOutPicker(false)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Recipient chain */}
          <div style={{ marginTop: "0.75rem" }}>
            <div className={styles.label}>Recipient chain</div>
            <select
              style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: "8px", border: "1px solid var(--w-border)", background: "var(--w-panel)", color: "var(--w-text)", fontFamily: "inherit", fontSize: "0.9rem" }}
              value={recipientChainUid}
              onChange={(e) => setRecipientChainUid(e.target.value)}
            >
              {chains.map((c) => (
                <option key={c.chain_uid} value={c.chain_uid}>{c.chain_uid}</option>
              ))}
            </select>
          </div>

          {/* Recipient address */}
          <div style={{ marginTop: "0.75rem" }}>
            <div className={styles.label}>Recipient address</div>
            <input
              style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: "8px", border: "1px solid var(--w-border)", background: "var(--w-panel)", color: "var(--w-text)", fontFamily: "inherit", fontSize: "0.875rem", boxSizing: "border-box" as const }}
              placeholder="0x... or cosmos1..."
              value={recipientAddr}
              onChange={(e) => setRecipientAddr(e.target.value)}
            />
          </div>

          {/* Price impact */}
          {impact !== null && (
            <div className={styles.infoRow}>
              <span>Price impact</span>
              <span className={`${styles.impactBadge} ${impact > 2 ? styles.impactHigh : ""}`}>
                {impact.toFixed(2)}%
              </span>
            </div>
          )}

          {errorMsg && <div className={styles.error}>{errorMsg}</div>}

          {uiState === "ready" && (
            <div style={{ fontSize: "0.82rem", color: "#16a34a", marginTop: "0.5rem", textAlign: "center" as const }}>
              ✓ Swap payload ready — pass to your wallet to sign
            </div>
          )}

          {/* Action button */}
          <button
            className={styles.btn}
            style={{ marginTop: "1rem" }}
            disabled={uiState === "building" || uiState === "fetching-quote" || !amountIn || !recipientAddr || uiState === "idle"}
            onClick={handleBuildSwap}
          >
            {uiState === "fetching-quote" ? "Getting quote..." :
             uiState === "building" ? "Building transaction..." :
             uiState === "ready" ? "Swap payload ready ✓" :
             uiState === "quote-ready" ? "Build Swap Transaction" :
             "Enter amount to swap"}
          </button>
        </>
      )}
    </div>
  );
}
