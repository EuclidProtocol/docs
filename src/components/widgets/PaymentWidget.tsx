// src/components/widgets/PaymentWidget.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { WidgetTheme, TokenMeta, ChainMeta, SwapPath, SwapPayload } from "./shared/types";
import { fetchTokens, fetchChains, fetchRoutes, executeSwap } from "./shared/api";
import { applyTheme, DEFAULT_THEME } from "./shared/theme";
import { toBaseUnits, fromBaseUnits, shortAddress } from "./shared/utils";
import styles from "./Widget.module.css";

export type PaymentWidgetProps = {
  recipientAddress: string;
  recipientChainUid: string;
  tokenOut: string;
  senderAddress: string;
  senderChainUid: string;
  defaultTokenIn?: string;
  defaultAmount?: string;
  slippageBps?: number;
  theme?: Partial<WidgetTheme>;
  apiBase?: string;
  onPaymentReady?: (payload: SwapPayload) => void;
  onError?: (error: string) => void;
};

type UIState = "idle" | "fetching-quote" | "quote-ready" | "building" | "ready" | "error";

export function PaymentWidget({
  recipientAddress,
  recipientChainUid,
  tokenOut,
  senderAddress,
  senderChainUid,
  defaultTokenIn = "eth",
  defaultAmount = "",
  slippageBps = 500,
  theme,
  apiBase,
  onPaymentReady,
  onError,
}: PaymentWidgetProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const [tokens, setTokens] = useState<TokenMeta[]>([]);
  const [tokenIn, setTokenIn] = useState(defaultTokenIn);
  const [amountIn, setAmountIn] = useState(defaultAmount);
  const [bestPath, setBestPath] = useState<SwapPath | null>(null);
  const [uiState, setUiState] = useState<UIState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [tokenSearch, setTokenSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rootRef.current) applyTheme(rootRef.current, { ...DEFAULT_THEME, ...theme });
  }, [theme]);

  useEffect(() => {
    fetchTokens({ base: apiBase, verified: true, dex: ["euclid"], limit: 200 })
      .then((t) => setTokens(t))
      .catch(() => setErrorMsg("Failed to load tokens"))
      .finally(() => setLoading(false));
  }, [apiBase]);

  const tokenMap = Object.fromEntries(tokens.map((t) => [t.tokenId, t]));
  const inMeta = tokenMap[tokenIn];
  const outMeta = tokenMap[tokenOut];

  const fetchQuote = useCallback(async () => {
    if (!amountIn || parseFloat(amountIn) <= 0) return;
    setUiState("fetching-quote");
    setBestPath(null);
    try {
      const decimals = inMeta?.coinDecimal ?? 6;
      const result = await fetchRoutes({ token_in: tokenIn, token_out: tokenOut, amount_in: toBaseUnits(amountIn, decimals), base: apiBase });
      if (result.paths.length === 0) throw new Error("No routes found");
      const best = result.paths.reduce((a, b) =>
        parseFloat(a.total_price_impact) <= parseFloat(b.total_price_impact) ? a : b
      );
      setBestPath(best);
      setUiState("quote-ready");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to get quote";
      setErrorMsg(msg); setUiState("error"); onError?.(msg);
    }
  }, [amountIn, tokenIn, tokenOut, inMeta, apiBase, onError]);

  useEffect(() => {
    const t = setTimeout(() => { if (amountIn) fetchQuote(); }, 600);
    return () => clearTimeout(t);
  }, [amountIn, tokenIn, fetchQuote]);

  const handleBuildPayment = async () => {
    if (!bestPath) return;
    setUiState("building");
    try {
      const inDecimals = inMeta?.coinDecimal ?? 6;
      const lastHop = bestPath.path[bestPath.path.length - 1];
      const payload = await executeSwap({
        base: apiBase,
        amount_in: toBaseUnits(amountIn, inDecimals),
        asset_in: { token: tokenIn, token_type: { native: { denom: tokenIn } } },
        slippage: String(slippageBps),
        recipients: [
          {
            user: { address: recipientAddress, chain_uid: recipientChainUid },
            amount: { less_than_or_equal: lastHop.amount_out },
            denom: { native: { denom: tokenOut } },
            forwarding_message: "",
            unsafe_refund_as_voucher: false,
          },
        ],
        sender: { address: senderAddress, chain_uid: senderChainUid },
        swap_path: bestPath,
      });
      setUiState("ready");
      onPaymentReady?.(payload);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to build payment";
      setErrorMsg(msg); setUiState("error"); onError?.(msg);
    }
  };

  const outAmountOut = bestPath?.path[bestPath.path.length - 1]?.amount_out;
  const formattedOut = outAmountOut ? fromBaseUnits(outAmountOut, outMeta?.coinDecimal ?? 6) : null;
  const filteredTokens = tokens.filter((t) =>
    !tokenSearch || t.tokenId.toLowerCase().includes(tokenSearch.toLowerCase()) || t.displayName?.toLowerCase().includes(tokenSearch.toLowerCase())
  );

  return (
    <div ref={rootRef} className={styles.widget} style={{ position: "relative" }}>
      <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.25rem" }}>Payment</div>
      <div style={{ fontSize: "0.8rem", color: "var(--w-muted)", marginBottom: "1rem" }}>
        Paying to <strong>{shortAddress(recipientAddress)}</strong> on <strong>{recipientChainUid}</strong>
        {" "}· receives <strong>{outMeta?.displayName ?? tokenOut}</strong>
      </div>

      {loading ? (
        <div className={styles.skeleton} style={{ height: "80px" }} />
      ) : (
        <>
          <div className={styles.panel} style={{ position: "relative" }}>
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
                <button className={styles.tokenSelect} onClick={() => setShowPicker(!showPicker)}>
                  {inMeta?.image && <img src={inMeta.image} className={styles.tokenImg} alt={inMeta.displayName} />}
                  {inMeta?.displayName ?? tokenIn} ▾
                </button>
                {showPicker && (
                  <div className={styles.dropdown}>
                    <input className={styles.dropdownSearch} placeholder="Search..." value={tokenSearch} onChange={(e) => setTokenSearch(e.target.value)} autoFocus />
                    {filteredTokens.map((t) => (
                      <div key={t.tokenId} className={styles.dropdownItem} onClick={() => { setTokenIn(t.tokenId); setShowPicker(false); setTokenSearch(""); }}>
                        {t.image ? <img src={t.image} className={styles.tokenImg} alt={t.displayName} /> : <div className={styles.tokenImgPlaceholder}>{t.tokenId.slice(0, 2).toUpperCase()}</div>}
                        <div><div className={styles.dropdownItemName}>{t.displayName ?? t.tokenId}</div></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recipient receives preview */}
          <div className={styles.infoRow} style={{ marginTop: "0.75rem" }}>
            <span>Recipient receives</span>
            <span style={{ fontWeight: 600, color: "var(--w-text)" }}>
              {uiState === "fetching-quote" ? "..." : formattedOut ? `${formattedOut} ${outMeta?.displayName ?? tokenOut}` : "—"}
            </span>
          </div>

          {errorMsg && <div className={styles.error}>{errorMsg}</div>}
          {uiState === "ready" && <div style={{ fontSize: "0.82rem", color: "#16a34a", marginTop: "0.5rem", textAlign: "center" as const }}>✓ Payment payload ready</div>}

          <button
            className={styles.btn}
            style={{ marginTop: "1rem" }}
            disabled={["building", "fetching-quote", "idle"].includes(uiState) || !amountIn}
            onClick={handleBuildPayment}
          >
            {uiState === "fetching-quote" ? "Getting quote..." :
             uiState === "building" ? "Building payment..." :
             uiState === "ready" ? "Payment ready ✓" :
             uiState === "quote-ready" ? "Build Payment Transaction" :
             "Enter amount"}
          </button>
        </>
      )}
    </div>
  );
}
