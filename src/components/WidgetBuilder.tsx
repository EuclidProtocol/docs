import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "@site/src/pages/index.module.css";

type TokenMeta = {
  tokenId: string;
  displayName?: string;
  image?: string;
  coinDecimal?: number;
  is_verified?: boolean;
  chain_uids?: string[];
  dex?: string | string[];
  price?: string;
  price_change_24h?: number | string;
};

type ChainMeta = {
  chain_uid: string;
  display_name?: string;
  logo?: string;
  type?: string;
  chain_id?: string;
};

type TokenSelectProps = {
  value: string;
  options: TokenMeta[];
  disabled?: boolean;
  label: string;
  onChange: (value: string) => void;
  formatLabel: (token?: TokenMeta) => string;
};

type ChainSelectProps = {
  value: string;
  options: ChainMeta[];
  disabled?: boolean;
  label: string;
  onChange: (value: string) => void;
  formatLabel: (chain?: ChainMeta) => string;
};

type QuoteResult = {
  amountOut?: string;
  routes?: number;
  priceImpact?: string;
  swapPath?: Array<{
    route: string[];
    dex: string;
    chain_uid?: string;
    amount_in?: string;
    amount_out?: string;
  }>;
};

type TxResult = {
  type?: string;
  chainId?: string;
  messages?: number;
};

type TrackingPhase =
  | "idle"
  | "preparing"
  | "broadcasting"
  | "confirming"
  | "completed"
  | "failed";

const DEFAULT_TOKENS: TokenMeta[] = [
  {
    tokenId: "euclid",
    displayName: "Euclid",
    coinDecimal: 6,
    is_verified: true,
    dex: "euclid",
  },
  {
    tokenId: "nibi",
    displayName: "Nibi",
    coinDecimal: 6,
    is_verified: true,
    dex: "euclid",
  },
  { tokenId: "0g", displayName: "0g", coinDecimal: 6, is_verified: true, dex: "euclid" },
];

const DEFAULT_SENDER = {
  address: "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
  chain_uid: "neuron",
};

const DEX_FILTER = ["euclid"];

const TOKEN_QUERY = `query TokenList($limit: Int, $verified: Boolean, $dex: [String!]) {
  token {
    token_metadatas(limit: $limit, verified: $verified, dex: $dex) {
      tokenId
      displayName
      image
      coinDecimal
      is_verified
      chain_uids
      dex
      price
      price_change_24h
    }
  }
}`;

const CHAINS_QUERY = `query Chains($showAllChains: Boolean) {
  chains {
    all_chains(show_all_chains: $showAllChains) {
      chain_uid
      chain_id
      display_name
      logo
      type
    }
  }
}`;

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace("#", "").trim();
  if (normalized.length !== 3 && normalized.length !== 6) {
    return `rgba(9, 35, 34, ${alpha})`;
  }
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;
  const value = parseInt(full, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const normalizeAmountInput = (value: string, decimals: number) => {
  const cleaned = value.replace(/[^0-9.]/g, "");
  if (!cleaned) {
    return "";
  }
  const parts = cleaned.split(".");
  const integer = parts[0] ?? "";
  const fraction = parts[1] ?? "";
  if (decimals <= 0) {
    return integer;
  }
  const trimmedFraction = fraction.slice(0, decimals);
  return trimmedFraction ? `${integer}.${trimmedFraction}` : integer;
};

const toBaseUnits = (value: string, decimals: number) => {
  const cleaned = value.replace(/,/g, "").trim();
  if (!cleaned) {
    return "0";
  }
  const parts = cleaned.split(".");
  const integer = parts[0]?.replace(/\D/g, "") ?? "0";
  const fraction = parts[1]?.replace(/\D/g, "") ?? "";
  if (decimals <= 0) {
    return integer || "0";
  }
  const padded = fraction.padEnd(decimals, "0").slice(0, decimals);
  const combined = `${integer}${padded}`.replace(/^0+(?=\d)/, "");
  return combined || "0";
};

const fromBaseUnits = (value: string, decimals: number) => {
  const cleaned = value.replace(/\D/g, "");
  if (!cleaned) {
    return "";
  }
  if (decimals <= 0) {
    return cleaned;
  }
  const padded = cleaned.padStart(decimals + 1, "0");
  const integer = padded.slice(0, -decimals);
  const fraction = padded.slice(-decimals).replace(/0+$/, "");
  return fraction ? `${integer}.${fraction}` : integer;
};

const createDemoHash = () => {
  const bytes = Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
  return `0x${bytes}`;
};

export default function WidgetBuilder() {
  const widgetOptions = [
    {
      id: "swap",
      label: "Swap widget",
      description: "Build a swap transaction via the REST execute endpoint.",
    },
    {
      id: "payment",
      label: "Payment widget",
      description: "Accept payments to a fixed address with swap routing.",
    },
    {
      id: "pricing",
      label: "Pricing widget",
      description: "Show a live token price ticker powered by Euclid.",
    },
  ] as const;
  const [widgetType, setWidgetType] = useState<(typeof widgetOptions)[number]["id"]>(
    "swap"
  );
  const isPaymentWidget = widgetType === "payment";
  const isPricingWidget = widgetType === "pricing";
  const [tokens, setTokens] = useState<TokenMeta[]>(DEFAULT_TOKENS);
  const [tokensLoading, setTokensLoading] = useState(true);
  const [tokensError, setTokensError] = useState<string | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [chainTypeFilter, setChainTypeFilter] = useState<"any" | "evm" | "cosmos">(
    "any"
  );
  const [tokenIn, setTokenIn] = useState(DEFAULT_TOKENS[0].tokenId);
  const [tokenOut, setTokenOut] = useState(
    DEFAULT_TOKENS[1]?.tokenId ?? DEFAULT_TOKENS[0].tokenId
  );
  const [amountIn, setAmountIn] = useState("1000");
  const [chains, setChains] = useState<ChainMeta[]>([]);
  const [chainsLoading, setChainsLoading] = useState(true);
  const [chainsError, setChainsError] = useState<string | null>(null);
  const [fromChain, setFromChain] = useState("");
  const [toChain, setToChain] = useState("");
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [txResult, setTxResult] = useState<TxResult | null>(null);
  const [txLoading, setTxLoading] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState(DEFAULT_SENDER.address);
  const [paymentMode, setPaymentMode] = useState<"pay" | "receive">("pay");
  const [demoTrackingState, setDemoTrackingState] =
    useState<TrackingPhase>("idle");
  const [demoTrackingHash, setDemoTrackingHash] = useState("");
  const demoTrackingTimers = useRef<number[]>([]);
  const [pricingTokenFilter, setPricingTokenFilter] = useState<string[]>([]);
  const [pricingTokenSearch, setPricingTokenSearch] = useState("");
  const [pricingPage, setPricingPage] = useState(0);
  const pricingPageSize = 8;
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState({
    accent: "#092322",
    surface: "#ffffff",
    panel: "#f4f6f8",
    border: "#d7dde2",
    text: "#11181c",
    muted: "#5f6b72",
  });

  useEffect(() => {
    setWalletConnected(false);
  }, [widgetType]);

  const clearDemoTracking = () => {
    demoTrackingTimers.current.forEach((timer) => window.clearTimeout(timer));
    demoTrackingTimers.current = [];
  };

  const startDemoTracking = () => {
    clearDemoTracking();
    setDemoTrackingHash(createDemoHash());
    setDemoTrackingState("preparing");
    demoTrackingTimers.current.push(
      window.setTimeout(() => setDemoTrackingState("broadcasting"), 600)
    );
    demoTrackingTimers.current.push(
      window.setTimeout(() => setDemoTrackingState("confirming"), 1400)
    );
    demoTrackingTimers.current.push(
      window.setTimeout(() => setDemoTrackingState("completed"), 2400)
    );
  };

  useEffect(() => {
    return () => {
      clearDemoTracking();
    };
  }, []);

  const isReceiveFixed = isPaymentWidget && paymentMode === "receive";

  useEffect(() => {
    clearDemoTracking();
    setDemoTrackingState("idle");
    setDemoTrackingHash("");
  }, [widgetType, tokenIn, tokenOut, amountIn, fromChain, toChain, recipientAddress, paymentMode]);

  useEffect(() => {
    let active = true;
    const loadTokens = async () => {
      setTokensLoading(true);
      setTokensError(null);
      try {
        const variables: Record<string, unknown> = { limit: 150, dex: DEX_FILTER };
        if (verifiedOnly) {
          variables.verified = true;
        }
        const res = await fetch("https://testnet.api.euclidprotocol.com/graphql", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            query: TOKEN_QUERY,
            variables,
          }),
        });
        const json = await res.json();
        const entries = json?.data?.token?.token_metadatas ?? [];
        const unique = new Map<string, TokenMeta>();
        entries.forEach((token: TokenMeta) => {
          if (token?.tokenId && !unique.has(token.tokenId)) {
            const decimals = Number(token.coinDecimal);
            unique.set(token.tokenId, {
              ...token,
              coinDecimal: Number.isFinite(decimals) ? decimals : 0,
            });
          }
        });

        if (active && unique.size) {
          setTokens(Array.from(unique.values()));
          setTokensError(null);
        }
      } catch (err) {
        if (active) {
          setTokensError(
            err instanceof Error ? err.message : "Unable to load tokens."
          );
        }
      } finally {
        if (active) {
          setTokensLoading(false);
        }
      }
    };

    loadTokens();
    let poll: number | undefined;
    if (isPricingWidget) {
      poll = window.setInterval(loadTokens, 15000);
    }
    return () => {
      active = false;
      if (poll) {
        window.clearInterval(poll);
      }
    };
  }, [verifiedOnly, isPricingWidget]);

  useEffect(() => {
    let active = true;
    const loadChains = async () => {
      setChainsLoading(true);
      setChainsError(null);
      try {
        const res = await fetch("https://testnet.api.euclidprotocol.com/graphql", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            query: CHAINS_QUERY,
            variables: {
              showAllChains: true,
            },
          }),
        });
        const json = await res.json();
        const entries = json?.data?.chains?.all_chains ?? [];
        if (active) {
          setChains(entries);
          setChainsError(null);
        }
      } catch (err) {
        if (active) {
          setChainsError("Unable to load chain list.");
        }
      } finally {
        if (active) {
          setChainsLoading(false);
        }
      }
    };

    loadChains();
    return () => {
      active = false;
    };
  }, []);

  const chainTypeByUid = useMemo(() => {
    const map = new Map<string, string>();
    chains.forEach((chain) => {
      if (!chain?.chain_uid) {
        return;
      }
      const normalized = (chain.type ?? "").toLowerCase();
      if (normalized) {
        map.set(chain.chain_uid, normalized);
      }
    });
    return map;
  }, [chains]);

  const tokenOptions = useMemo(() => {
    const source = tokens.length ? tokens : DEFAULT_TOKENS;
    const verifiedFiltered = verifiedOnly
      ? source.filter((token) => token.is_verified !== false)
      : source;
    const dexFiltered = verifiedFiltered.filter((token) => {
      if (!token.dex) {
        return true;
      }
      const dexValues = Array.isArray(token.dex) ? token.dex : [token.dex];
      return dexValues.some((dex) =>
        DEX_FILTER.includes(String(dex).toLowerCase())
      );
    });
    const applyChainFilter =
      chainTypeFilter !== "any" && chainTypeByUid.size > 0;
    const chainFiltered = applyChainFilter
      ? dexFiltered.filter((token) => {
          const chainUids = token.chain_uids ?? [];
          if (!chainUids.length) {
            return true;
          }
          return chainUids.some((uid) => {
            const chainType = chainTypeByUid.get(uid);
            if (!chainType) {
              return false;
            }
            if (chainTypeFilter === "evm") {
              return chainType.includes("evm");
            }
            if (chainTypeFilter === "cosmos") {
              return chainType.includes("cosmos");
            }
            return true;
          });
        })
      : dexFiltered;
    if (chainFiltered.length) {
      return chainFiltered;
    }
    return dexFiltered.length ? dexFiltered : source;
  }, [tokens, verifiedOnly, chainTypeFilter, chainTypeByUid]);

  const pricingFilteredTokens = useMemo(() => {
    if (!pricingTokenFilter.length) {
      return tokenOptions;
    }
    const allowed = new Set(pricingTokenFilter);
    return tokenOptions.filter((token) => allowed.has(token.tokenId));
  }, [tokenOptions, pricingTokenFilter]);

  const pricingTotalPages = Math.max(
    1,
    Math.ceil(pricingFilteredTokens.length / pricingPageSize)
  );
  const pricingPageSafe = Math.min(pricingPage, pricingTotalPages - 1);
  const pricingTokens = useMemo(() => {
    const start = pricingPageSafe * pricingPageSize;
    return pricingFilteredTokens.slice(start, start + pricingPageSize);
  }, [pricingFilteredTokens, pricingPageSafe, pricingPageSize]);

  useEffect(() => {
    if (!tokenOptions.length) {
      return;
    }

    if (!tokenOptions.some((token) => token.tokenId === tokenIn)) {
      setTokenIn(tokenOptions[0].tokenId);
    }

    if (!tokenOptions.some((token) => token.tokenId === tokenOut)) {
      setTokenOut(tokenOptions[1]?.tokenId ?? tokenOptions[0].tokenId);
    }
  }, [tokenOptions, tokenIn, tokenOut]);

  useEffect(() => {
    setPricingTokenFilter((prev) =>
      prev.filter((tokenId) => tokenOptions.some((token) => token.tokenId === tokenId))
    );
  }, [tokenOptions]);

  useEffect(() => {
    setPricingPage(0);
  }, [pricingTokenFilter, tokenOptions]);

  useEffect(() => {
    if (pricingPage >= pricingTotalPages) {
      setPricingPage(Math.max(0, pricingTotalPages - 1));
    }
  }, [pricingPage, pricingTotalPages]);


  useEffect(() => {
    setQuoteResult(null);
    setQuoteError(null);
    setQuoteLoading(false);
    setTxResult(null);
    setTxError(null);
    setTxLoading(false);
  }, [
    tokenIn,
    tokenOut,
    amountIn,
    fromChain,
    toChain,
    widgetType,
    recipientAddress,
    paymentMode,
    pricingTokenFilter,
  ]);

  useEffect(() => {
    const amountTokenId = isReceiveFixed ? tokenOut : tokenIn;
    const tokenData = tokenOptions.find((token) => token.tokenId === amountTokenId);
    const decimals = tokenData?.coinDecimal ?? 0;
    const normalized = normalizeAmountInput(amountIn, decimals);
    if (normalized !== amountIn) {
      setAmountIn(normalized);
    }
  }, [tokenIn, tokenOut, tokenOptions, amountIn, isReceiveFixed]);

  const accentSoft = useMemo(() => hexToRgba(theme.accent, 0.12), [theme.accent]);
  const previewStyle = useMemo(
    () =>
      ({
        "--widget-accent": theme.accent,
        "--widget-accent-soft": accentSoft,
        "--widget-surface": theme.surface,
        "--widget-panel": theme.panel,
        "--widget-border": theme.border,
        "--widget-text": theme.text,
        "--widget-muted": theme.muted,
      }) as CSSProperties,
    [theme, accentSoft]
  );

  const swapTokenOptions = (nextToken: string, currentToken: string) => {
    const fallback = tokenOptions.find((token) => token.tokenId !== nextToken);
    if (currentToken === nextToken && fallback) {
      return fallback.tokenId;
    }
    return currentToken;
  };

  const handleTokenInChange = (value: string) => {
    setTokenIn(value);
    if (!isPaymentWidget) {
      setTokenOut((current) => swapTokenOptions(value, current));
    }
  };

  const handleTokenOutChange = (value: string) => {
    setTokenOut(value);
    if (!isPaymentWidget) {
      setTokenIn((current) => swapTokenOptions(value, current));
    }
  };

  const handleFlipTokens = () => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
  };

  const parseBestRoute = (data: any): QuoteResult => {
    const paths = data?.paths ?? [];
    let bestAmount: bigint | null = null;
    let bestMeta: QuoteResult = {};

    paths.forEach((path: any) => {
      const hops = path?.path ?? [];
      const last = hops[hops.length - 1];
      const amount = last?.amount_out;
      if (!amount) {
        return;
      }

      try {
        const numeric = BigInt(amount);
        if (bestAmount === null || numeric > bestAmount) {
          bestAmount = numeric;
          bestMeta = {
            amountOut: amount,
            priceImpact: path?.total_price_impact,
            swapPath: hops,
          };
        }
      } catch (err) {
        return;
      }
    });

    return {
      amountOut: bestMeta.amountOut,
      priceImpact: bestMeta.priceImpact,
      swapPath: bestMeta.swapPath,
      routes: paths.length,
    };
  };

 

  const snippet = useMemo(() => {
    const isPayment = widgetType === "payment";
    const componentName = isPayment ? "EuclidPaymentWidget" : "EuclidSwapWidget";
    const actionLabel = isPayment ? "Pay" : "Build swap tx";
    const loadingLabel = isPayment ? "Processing..." : "Building...";
    const resultLabel = isPayment ? "Recipient receives" : "Quoted amount out";

    const css = [
      `.euclid-widget {`,
      `  box-sizing: border-box;`,
      `  font-family: "Lexend", "Questrial", "Avenir Next", "Segoe UI", sans-serif;`,
      `  background: var(--widget-surface);`,
      `  color: var(--widget-text);`,
      `  border: 1px solid var(--widget-border);`,
      `  border-radius: 24px;`,
      `  padding: 1.5rem;`,
      `  width: 100%;`,
      `  max-width: 520px;`,
      `  box-shadow: 0 24px 48px rgba(9, 35, 34, 0.14);`,
      `  display: grid;`,
      `  gap: 16px;`,
      `}`,
      `.euclid-widget *,`,
      `.euclid-widget *::before,`,
      `.euclid-widget *::after {`,
      `  box-sizing: border-box;`,
      `}`,
      `.euclid-widget__header {`,
      `  display: flex;`,
      `  justify-content: space-between;`,
      `  align-items: center;`,
      `}`,
      `.euclid-widget__title {`,
      `  font-size: 1.15rem;`,
      `  font-weight: 600;`,
      `}`,
      `.euclid-widget__subtitle {`,
      `  font-size: 0.72rem;`,
      `  color: var(--widget-muted);`,
      `  text-transform: uppercase;`,
      `  letter-spacing: 0.12em;`,
      `  margin-top: 4px;`,
      `}`,
      `.euclid-widget__badge {`,
      `  padding: 4px 10px;`,
      `  font-size: 0.7rem;`,
      `  border-radius: 999px;`,
      `  background: var(--widget-accent-soft);`,
      `  border: 1px solid var(--widget-border);`,
      `  text-transform: uppercase;`,
      `  letter-spacing: 0.1em;`,
      `}`,
      `.euclid-widget__notice {`,
      `  font-size: 0.8rem;`,
      `  color: var(--widget-muted);`,
      `  background: var(--widget-panel);`,
      `  border: 1px dashed var(--widget-border);`,
      `  border-radius: 12px;`,
      `  padding: 8px 12px;`,
      `}`,
      `.euclid-widget__body {`,
      `  display: grid;`,
      `  gap: 12px;`,
      `}`,
      `.euclid-widget__card {`,
      `  background: var(--widget-panel);`,
      `  border: 1px solid var(--widget-border);`,
      `  border-radius: 18px;`,
      `  padding: 16px;`,
      `  display: grid;`,
      `  gap: 10px;`,
      `}`,
      `.euclid-widget__row {`,
      `  display: flex;`,
      `  align-items: center;`,
      `  justify-content: space-between;`,
      `  font-size: 0.72rem;`,
      `  text-transform: uppercase;`,
      `  letter-spacing: 0.1em;`,
      `  color: var(--widget-muted);`,
      `}`,
      `.euclid-widget__chainRow {`,
      `  display: flex;`,
      `  align-items: center;`,
      `  justify-content: space-between;`,
      `  gap: 10px;`,
      `}`,
      `.euclid-widget__chainLabel {`,
      `  font-size: 0.68rem;`,
      `  letter-spacing: 0.12em;`,
      `  text-transform: uppercase;`,
      `  color: var(--widget-muted);`,
      `}`,
      `.euclid-widget__field {`,
      `  display: flex;`,
      `  align-items: center;`,
      `  gap: 10px;`,
      `}`,
      `.euclid-widget__select {`,
      `  position: relative;`,
      `  width: clamp(140px, 36%, 220px);`,
      `  flex: 0 0 clamp(140px, 36%, 220px);`,
      `}`,
      `.euclid-widget__select--chain {`,
      `  width: clamp(170px, 48%, 260px);`,
      `  flex: 0 0 clamp(170px, 48%, 260px);`,
      `}`,
      `.euclid-widget__selectTrigger {`,
      `  width: 100%;`,
      `  display: flex;`,
      `  align-items: center;`,
      `  gap: 6px;`,
      `  background: var(--widget-surface);`,
      `  border: 1px solid var(--widget-border);`,
      `  border-radius: 999px;`,
      `  padding: 4px 12px 4px 8px;`,
      `  cursor: pointer;`,
      `  text-align: left;`,
      `  color: var(--widget-text);`,
      `  position: relative;`,
      `  transition: border-color 0.2s ease, box-shadow 0.2s ease;`,
      `}`,
      `.euclid-widget__selectTrigger:disabled {`,
      `  opacity: 0.6;`,
      `  cursor: not-allowed;`,
      `}`,
      `.euclid-widget__selectOpen,`,
      `.euclid-widget__selectTrigger:focus-visible {`,
      `  border-color: var(--widget-accent);`,
      `  box-shadow: 0 0 0 3px var(--widget-accent-soft);`,
      `}`,
      `.euclid-widget__selectIcon {`,
      `  width: 22px;`,
      `  height: 22px;`,
      `  border-radius: 999px;`,
      `  overflow: hidden;`,
      `  display: flex;`,
      `  align-items: center;`,
      `  justify-content: center;`,
      `  background: var(--widget-accent-soft);`,
      `  font-size: 0.65rem;`,
      `  font-weight: 600;`,
      `}`,
      `.euclid-widget__selectIcon img {`,
      `  width: 100%;`,
      `  height: 100%;`,
      `  object-fit: cover;`,
      `}`,
      `.euclid-widget__selectValue {`,
      `  font-size: 0.8rem;`,
      `  font-weight: 600;`,
      `  color: var(--widget-text);`,
      `  overflow: hidden;`,
      `  text-overflow: ellipsis;`,
      `  white-space: nowrap;`,
      `}`,
      `.euclid-widget__selectContent {`,
      `  position: absolute;`,
      `  top: calc(100% + 8px);`,
      `  left: 0;`,
      `  width: 100%;`,
      `  max-height: 280px;`,
      `  overflow: auto;`,
      `  background: #ffffff;`,
      `  border: 1px solid var(--widget-border);`,
      `  border-radius: 14px;`,
      `  box-shadow: 0 20px 40px rgba(9, 35, 34, 0.16);`,
      `  padding: 0.35rem;`,
      `  z-index: 40;`,
      `  display: grid;`,
      `  gap: 6px;`,
      `}`,
      `.euclid-widget__selectSearch {`,
      `  width: 100%;`,
      `  border: 1px solid var(--widget-border);`,
      `  border-radius: 10px;`,
      `  padding: 0.4rem 0.6rem;`,
      `  font-size: 0.8rem;`,
      `  color: var(--widget-text);`,
      `  background: #ffffff;`,
      `}`,
      `.euclid-widget__selectSearch:focus {`,
      `  outline: none;`,
      `  border-color: var(--widget-accent);`,
      `  box-shadow: 0 0 0 3px var(--widget-accent-soft);`,
      `}`,
      `.euclid-widget__selectEmpty {`,
      `  font-size: 0.75rem;`,
      `  color: var(--widget-muted);`,
      `  padding: 0.35rem 0.4rem;`,
      `}`,
      `.euclid-widget__selectItem {`,
      `  width: 100%;`,
      `  display: flex;`,
      `  align-items: center;`,
      `  gap: 8px;`,
      `  border-radius: 10px;`,
      `  padding: 0.45rem 0.6rem;`,
      `  border: none;`,
      `  background: transparent;`,
      `  text-align: left;`,
      `  font-size: 0.85rem;`,
      `  color: var(--widget-text);`,
      `  cursor: pointer;`,
      `}`,
      `.euclid-widget__selectItem:hover,`,
      `.euclid-widget__selectItemActive {`,
      `  background: var(--widget-accent-soft);`,
      `}`,
      `.euclid-widget__selectItemIcon {`,
      `  width: 24px;`,
      `  height: 24px;`,
      `  border-radius: 999px;`,
      `  overflow: hidden;`,
      `  background: var(--widget-accent-soft);`,
      `  display: flex;`,
      `  align-items: center;`,
      `  justify-content: center;`,
      `  font-size: 0.7rem;`,
      `  font-weight: 600;`,
      `}`,
      `.euclid-widget__selectItemIcon img {`,
      `  width: 100%;`,
      `  height: 100%;`,
      `  object-fit: cover;`,
      `}`,
      `.euclid-widget__selectItemLabel {`,
      `  flex: 1;`,
      `  overflow: hidden;`,
      `  text-overflow: ellipsis;`,
      `  white-space: nowrap;`,
      `}`,
      `.euclid-widget__selectItemCheck {`,
      `  font-size: 0.7rem;`,
      `  color: var(--widget-muted);`,
      `}`,
      `.euclid-widget__input {`,
      `  flex: 1;`,
      `  border: none;`,
      `  background: transparent;`,
      `  text-align: right;`,
      `  font-size: 1.25rem;`,
      `  font-weight: 500;`,
      `  color: var(--widget-text);`,
      `  font-variant-numeric: tabular-nums;`,
      `}`,
      `.euclid-widget__input:focus {`,
      `  outline: none;`,
      `}`,
      `.euclid-widget__input--readonly {`,
      `  color: var(--widget-muted);`,
      `}`,
      `.euclid-widget__flip {`,
      `  min-width: 72px;`,
      `  height: 38px;`,
      `  border-radius: 999px;`,
      `  border: 1px solid var(--widget-border);`,
      `  background: var(--widget-surface);`,
      `  margin: -4px auto;`,
      `  display: flex;`,
      `  align-items: center;`,
      `  justify-content: center;`,
      `  padding: 0 12px;`,
      `  font-size: 0.7rem;`,
      `  letter-spacing: 0.12em;`,
      `  text-transform: uppercase;`,
      `  cursor: pointer;`,
      `  box-shadow: 0 10px 18px rgba(9, 35, 34, 0.12);`,
      `}`,
      `.euclid-widget__action {`,
      `  width: 100%;`,
      `  border: none;`,
      `  border-radius: 14px;`,
      `  padding: 12px;`,
      `  background: var(--widget-accent);`,
      `  color: #ffffff;`,
      `  font-weight: 600;`,
      `  font-size: 0.95rem;`,
      `  cursor: pointer;`,
      `  transition: transform 0.2s ease, box-shadow 0.2s ease;`,
      `}`,
      `.euclid-widget__action:disabled {`,
      `  opacity: 0.6;`,
      `  cursor: not-allowed;`,
      `}`,
      `.euclid-widget__action:not(:disabled):hover {`,
      `  transform: translateY(-1px);`,
      `  box-shadow: 0 12px 26px rgba(9, 35, 34, 0.2);`,
      `}`,
      `.euclid-widget__meta {`,
      `  background: var(--widget-panel);`,
      `  border: 1px solid var(--widget-border);`,
      `  border-radius: 14px;`,
      `  padding: 12px;`,
      `  display: grid;`,
      `  gap: 6px;`,
      `  font-size: 0.85rem;`,
      `}`,
      `.euclid-widget__metaRow {`,
      `  display: flex;`,
      `  align-items: center;`,
      `  justify-content: space-between;`,
      `}`,
      `.euclid-widget__error {`,
      `  color: #b42318;`,
      `  font-size: 0.82rem;`,
      `}`,
      `.euclid-widget--payment {`,
      `  max-width: 420px;`,
      `  background: linear-gradient(135deg, var(--widget-surface) 0%, var(--widget-panel) 100%);`,
      `  box-shadow: 0 24px 60px rgba(9, 35, 34, 0.12);`,
      `  position: relative;`,
      `  min-width: 0;`,
      `  animation: paymentFade 480ms ease both;`,
      `}`,
      `.euclid-widget--payment::before {`,
      `  content: "";`,
      `  position: absolute;`,
      `  inset: 0;`,
      `  border-radius: inherit;`,
      `  background: radial-gradient(circle at 12% 10%, rgba(9, 35, 34, 0.08), transparent 55%);`,
      `  opacity: 0.6;`,
      `  pointer-events: none;`,
      `}`,
      `.euclid-payment {`,
      `  display: grid;`,
      `  gap: 16px;`,
      `}`,
      `.euclid-payment__header {`,
      `  display: flex;`,
      `  align-items: center;`,
      `  justify-content: space-between;`,
      `  flex-wrap: wrap;`,
      `  gap: 12px;`,
      `  position: relative;`,
      `  z-index: 1;`,
      `}`,
      `.euclid-payment__header > div {`,
      `  min-width: 0;`,
      `}`,
      `.euclid-payment__title {`,
      `  font-size: 1.1rem;`,
      `  font-weight: 600;`,
      `}`,
      `.euclid-payment__subtitle {`,
      `  font-size: 0.72rem;`,
      `  letter-spacing: 0.12em;`,
      `  text-transform: uppercase;`,
      `  color: var(--widget-muted);`,
      `  margin-top: 4px;`,
      `  max-width: 100%;`,
      `  overflow-wrap: anywhere;`,
      `}`,
      `.euclid-payment__badge {`,
      `  padding: 4px 10px;`,
      `  font-size: 0.68rem;`,
      `  border-radius: 999px;`,
      `  background: var(--widget-accent-soft);`,
      `  border: 1px solid var(--widget-border);`,
      `  text-transform: uppercase;`,
      `  letter-spacing: 0.1em;`,
      `}`,
      `.euclid-payment__notice {`,
      `  font-size: 0.8rem;`,
      `  color: var(--widget-muted);`,
      `  background: var(--widget-panel);`,
      `  border: 1px dashed var(--widget-border);`,
      `  border-radius: 12px;`,
      `  padding: 8px 12px;`,
      `  position: relative;`,
      `  z-index: 1;`,
      `}`,
      `.euclid-payment__card {`,
      `  background: var(--widget-surface);`,
      `  border: 1px solid var(--widget-border);`,
      `  border-radius: 18px;`,
      `  padding: 16px;`,
      `  display: grid;`,
      `  gap: 12px;`,
      `  position: relative;`,
      `  z-index: 2;`,
      `  animation: paymentRise 520ms ease both;`,
      `  min-width: 0;`,
      `}`,
      `.euclid-payment__labelRow {`,
      `  display: flex;`,
      `  align-items: center;`,
      `  justify-content: space-between;`,
      `  flex-wrap: wrap;`,
      `  gap: 6px 12px;`,
      `  font-size: 0.72rem;`,
      `  letter-spacing: 0.1em;`,
      `  text-transform: uppercase;`,
      `  color: var(--widget-muted);`,
      `}`,
      `.euclid-payment__amountRow {`,
      `  display: flex;`,
      `  align-items: center;`,
      `  gap: 12px;`,
      `  flex-wrap: wrap;`,
      `  min-width: 0;`,
      `}`,
      `.euclid-payment__chainRow {`,
      `  display: flex;`,
      `  align-items: center;`,
      `  justify-content: space-between;`,
      `  gap: 10px;`,
      `  flex-wrap: wrap;`,
      `}`,
      `.euclid-payment__chainLabel {`,
      `  font-size: 0.68rem;`,
      `  letter-spacing: 0.12em;`,
      `  text-transform: uppercase;`,
      `  color: var(--widget-muted);`,
      `}`,
      `.euclid-payment__amountInput {`,
      `  flex: 1 1 140px;`,
      `  min-width: 120px;`,
      `  border: none;`,
      `  background: transparent;`,
      `  font-size: 1.5rem;`,
      `  font-weight: 600;`,
      `  color: var(--widget-text);`,
      `  text-align: left;`,
      `  font-variant-numeric: tabular-nums;`,
      `}`,
      `.euclid-payment__amountInput:focus {`,
      `  outline: none;`,
      `}`,
      `.euclid-payment__hint {`,
      `  font-size: 0.85rem;`,
      `  color: var(--widget-muted);`,
      `  line-height: 1.4;`,
      `}`,
      `.euclid-payment__action {`,
      `  width: 100%;`,
      `  border: none;`,
      `  border-radius: 14px;`,
      `  padding: 12px;`,
      `  background: var(--widget-accent);`,
      `  color: #ffffff;`,
      `  font-weight: 600;`,
      `  font-size: 0.95rem;`,
      `  cursor: pointer;`,
      `  transition: transform 0.2s ease, box-shadow 0.2s ease;`,
      `  position: relative;`,
      `  z-index: 1;`,
      `}`,
      `.euclid-payment__action:disabled {`,
      `  opacity: 0.6;`,
      `  cursor: not-allowed;`,
      `  transform: none;`,
      `  box-shadow: none;`,
      `}`,
      `.euclid-payment__action:not(:disabled):hover {`,
      `  transform: translateY(-1px);`,
      `  box-shadow: 0 12px 26px rgba(9, 35, 34, 0.2);`,
      `}`,
      `.euclid-payment__error {`,
      `  color: #b42318;`,
      `  font-size: 0.82rem;`,
      `  position: relative;`,
      `  z-index: 1;`,
      `}`,
      `.euclid-payment__tracker {`,
      `  background: var(--widget-panel);`,
      `  border: 1px solid var(--widget-border);`,
      `  border-radius: 16px;`,
      `  padding: 12px 14px;`,
      `  display: grid;`,
      `  gap: 8px;`,
      `  position: relative;`,
      `  overflow: hidden;`,
      `}`,
      `.euclid-payment__trackerHeader {`,
      `  display: flex;`,
      `  align-items: center;`,
      `  justify-content: space-between;`,
      `  font-size: 0.82rem;`,
      `  font-weight: 600;`,
      `  color: var(--widget-text);`,
      `}`,
      `.euclid-payment__trackerStatus {`,
      `  font-size: 0.64rem;`,
      `  letter-spacing: 0.12em;`,
      `  text-transform: uppercase;`,
      `  color: var(--widget-muted);`,
      `}`,
      `.euclid-payment__trackerBar {`,
      `  position: relative;`,
      `  height: 6px;`,
      `  border-radius: 999px;`,
      `  background: rgba(9, 35, 34, 0.08);`,
      `  overflow: hidden;`,
      `}`,
      `.euclid-payment__trackerFill {`,
      `  position: absolute;`,
      `  left: 0;`,
      `  top: 0;`,
      `  bottom: 0;`,
      `  border-radius: 999px;`,
      `  background: var(--widget-accent);`,
      `  transition: width 0.4s ease;`,
      `}`,
      `.euclid-payment__trackerGlow {`,
      `  position: absolute;`,
      `  inset: 0;`,
      `  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.65), transparent);`,
      `  transform: translateX(-60%);`,
      `  animation: paymentStripe 1.1s ease-in-out infinite;`,
      `  pointer-events: none;`,
      `}`,
      `.euclid-payment__trackerMeta {`,
      `  font-size: 0.75rem;`,
      `  color: var(--widget-muted);`,
      `}`,
      `.euclid-payment__tracker[data-status="completed"] .euclid-payment__trackerBar {`,
      `  background: rgba(18, 183, 106, 0.18);`,
      `}`,
      `.euclid-payment__tracker[data-status="completed"] .euclid-payment__trackerFill {`,
      `  background: #12b76a;`,
      `}`,
      `.euclid-payment__tracker[data-status="completed"] .euclid-payment__trackerGlow,`,
      `.euclid-payment__tracker[data-status="failed"] .euclid-payment__trackerGlow {`,
      `  display: none;`,
      `}`,
      `.euclid-payment__tracker[data-status="failed"] .euclid-payment__trackerBar {`,
      `  background: rgba(239, 68, 68, 0.2);`,
      `}`,
      `.euclid-payment__tracker[data-status="failed"] .euclid-payment__trackerFill {`,
      `  background: #ef4444;`,
      `}`,
      `.euclid-payment__tracker[data-status="failed"] .euclid-payment__trackerStatus {`,
      `  color: #ef4444;`,
      `}`,
      `.euclid-payment .euclid-widget__select {`,
      `  width: 100%;`,
      `  flex: 1 1 160px;`,
      `  min-width: 140px;`,
      `  max-width: 200px;`,
      `}`,
      `.euclid-payment .euclid-widget__selectTrigger {`,
      `  background: var(--widget-surface);`,
      `}`,
      `.euclid-pricing {`,
      `  width: 100%;`,
      `  max-width: 460px;`,
      `  background: var(--widget-surface);`,
      `  color: var(--widget-text);`,
      `  border: 1px solid var(--widget-border);`,
      `  border-radius: 22px;`,
      `  padding: 22px;`,
      `  box-shadow: 0 24px 48px rgba(9, 35, 34, 0.12);`,
      `  display: grid;`,
      `  gap: 16px;`,
      `}`,
      `.euclid-pricing__header {`,
      `  display: flex;`,
      `  align-items: flex-start;`,
      `  justify-content: space-between;`,
      `  gap: 16px;`,
      `}`,
      `.euclid-pricing__title {`,
      `  font-size: 1.05rem;`,
      `  font-weight: 600;`,
      `}`,
      `.euclid-pricing__subtitle {`,
      `  font-size: 0.7rem;`,
      `  letter-spacing: 0.12em;`,
      `  text-transform: uppercase;`,
      `  color: var(--widget-muted);`,
      `  margin-top: 4px;`,
      `}`,
      `.euclid-pricing__badge {`,
      `  padding: 4px 10px;`,
      `  border-radius: 999px;`,
      `  font-size: 0.68rem;`,
      `  letter-spacing: 0.1em;`,
      `  text-transform: uppercase;`,
      `  background: var(--widget-accent-soft);`,
      `  border: 1px solid var(--widget-border);`,
      `  color: var(--widget-text);`,
      `}`,
      `.euclid-pricing__notice {`,
      `  font-size: 0.8rem;`,
      `  color: var(--widget-muted);`,
      `  background: var(--widget-panel);`,
      `  border: 1px dashed var(--widget-border);`,
      `  border-radius: 12px;`,
      `  padding: 8px 12px;`,
      `}`,
      `.euclid-pricing__columns {`,
      `  display: grid;`,
      `  grid-template-columns: 1.4fr 0.9fr 0.7fr;`,
      `  gap: 12px;`,
      `  font-size: 0.65rem;`,
      `  letter-spacing: 0.14em;`,
      `  text-transform: uppercase;`,
      `  color: var(--widget-muted);`,
      `}`,
      `.euclid-pricing__list {`,
      `  display: grid;`,
      `  gap: 8px;`,
      `}`,
      `.euclid-pricing__pagination {`,
      `  display: flex;`,
      `  align-items: center;`,
      `  justify-content: space-between;`,
      `  gap: 12px;`,
      `  margin-top: 6px;`,
      `}`,
      `.euclid-pricing__pageButton {`,
      `  border: 1px solid var(--widget-border);`,
      `  background: var(--widget-surface);`,
      `  color: var(--widget-text);`,
      `  border-radius: 999px;`,
      `  padding: 4px 12px;`,
      `  font-size: 0.75rem;`,
      `  cursor: pointer;`,
      `  transition: transform 0.2s ease, box-shadow 0.2s ease;`,
      `}`,
      `.euclid-pricing__pageButton:hover:not(:disabled) {`,
      `  transform: translateY(-1px);`,
      `  box-shadow: 0 8px 16px rgba(9, 35, 34, 0.12);`,
      `}`,
      `.euclid-pricing__pageButton:disabled {`,
      `  opacity: 0.5;`,
      `  cursor: not-allowed;`,
      `  box-shadow: none;`,
      `  transform: none;`,
      `}`,
      `.euclid-pricing__pageIndicator {`,
      `  font-size: 0.75rem;`,
      `  color: var(--widget-muted);`,
      `}`,
      `.euclid-pricing__row {`,
      `  display: grid;`,
      `  grid-template-columns: 1.4fr 0.9fr 0.7fr;`,
      `  gap: 12px;`,
      `  align-items: center;`,
      `  padding: 8px 12px;`,
      `  border-radius: 14px;`,
      `  background: var(--widget-panel);`,
      `  border: 1px solid transparent;`,
      `  transition: border-color 0.2s ease, transform 0.2s ease;`,
      `}`,
      `.euclid-pricing__row:hover {`,
      `  border-color: var(--widget-border);`,
      `  transform: translateY(-1px);`,
      `}`,
      `.euclid-pricing__token {`,
      `  display: flex;`,
      `  align-items: center;`,
      `  gap: 10px;`,
      `  min-width: 0;`,
      `}`,
      `.euclid-pricing__tokenIcon {`,
      `  width: 28px;`,
      `  height: 28px;`,
      `  border-radius: 999px;`,
      `  background: var(--widget-accent-soft);`,
      `  display: flex;`,
      `  align-items: center;`,
      `  justify-content: center;`,
      `  font-size: 0.7rem;`,
      `  font-weight: 600;`,
      `  color: var(--widget-text);`,
      `  overflow: hidden;`,
      `}`,
      `.euclid-pricing__tokenIcon img {`,
      `  width: 100%;`,
      `  height: 100%;`,
      `  object-fit: cover;`,
      `}`,
      `.euclid-pricing__tokenInfo {`,
      `  min-width: 0;`,
      `}`,
      `.euclid-pricing__tokenName {`,
      `  font-size: 0.85rem;`,
      `  font-weight: 600;`,
      `  color: var(--widget-text);`,
      `  overflow: hidden;`,
      `  text-overflow: ellipsis;`,
      `  white-space: nowrap;`,
      `}`,
      `.euclid-pricing__tokenSymbol {`,
      `  font-size: 0.7rem;`,
      `  color: var(--widget-muted);`,
      `  text-transform: uppercase;`,
      `}`,
      `.euclid-pricing__price {`,
      `  justify-self: end;`,
      `  font-weight: 600;`,
      `  font-variant-numeric: tabular-nums;`,
      `}`,
      `.euclid-pricing__change {`,
      `  justify-self: end;`,
      `  font-weight: 600;`,
      `  font-size: 0.75rem;`,
      `  padding: 4px 10px;`,
      `  border-radius: 999px;`,
      `  font-variant-numeric: tabular-nums;`,
      `}`,
      `.euclid-pricing__change--up {`,
      `  background: rgba(18, 183, 106, 0.16);`,
      `  color: #027a48;`,
      `}`,
      `.euclid-pricing__change--down {`,
      `  background: rgba(217, 45, 32, 0.16);`,
      `  color: #b42318;`,
      `}`,
      `.euclid-pricing__change--neutral {`,
      `  background: rgba(148, 163, 184, 0.2);`,
      `  color: var(--widget-muted);`,
      `}`,
      `@keyframes paymentFade {`,
      `  from {`,
      `    opacity: 0;`,
      `    transform: translateY(10px);`,
      `  }`,
      `  to {`,
      `    opacity: 1;`,
      `    transform: translateY(0);`,
      `  }`,
      `}`,
      `@keyframes paymentRise {`,
      `  from {`,
      `    opacity: 0;`,
      `    transform: translateY(8px);`,
      `  }`,
      `  to {`,
      `    opacity: 1;`,
      `    transform: translateY(0);`,
      `  }`,
      `}`,
      `@keyframes paymentStripe {`,
      `  0% {`,
      `    transform: translateX(-60%);`,
      `  }`,
      `  100% {`,
      `    transform: translateX(60%);`,
      `  }`,
      `}`,
      `@media (prefers-reduced-motion: reduce) {`,
      `  .euclid-widget--payment,`,
      `  .euclid-payment__card,`,
      `  .euclid-payment__trackerGlow {`,
      `    animation: none;`,
      `  }`,
      `}`,
      `@media (max-width: 640px) {`,
      `  .euclid-widget__field,`,
      `  .euclid-widget__chainRow {`,
      `    flex-direction: column;`,
      `    align-items: stretch;`,
      `  }`,
      `  .euclid-widget__select,`,
      `  .euclid-widget__select--chain {`,
      `    width: 100%;`,
      `    flex: 1 1 auto;`,
      `  }`,
      `  .euclid-payment__labelRow {`,
      `    flex-direction: column;`,
      `    align-items: flex-start;`,
      `    gap: 6px;`,
      `  }`,
      `  .euclid-payment__amountRow {`,
      `    flex-direction: column;`,
      `    align-items: stretch;`,
      `  }`,
      `  .euclid-payment__chainRow {`,
      `    flex-direction: column;`,
      `    align-items: stretch;`,
      `  }`,
      `  .euclid-payment .euclid-widget__select {`,
      `    width: 100%;`,
      `    flex: 1 1 auto;`,
      `  }`,
      `}`,
    ].join("\\n");

    return `import React, { useEffect, useMemo, useRef, useState } from "react";

const TOKEN_QUERY = \`query TokenList($limit: Int, $verified: Boolean, $dex: [String!]) {
  token {
    token_metadatas(limit: $limit, verified: $verified, dex: $dex) {
      tokenId
      displayName
      image
      coinDecimal
      is_verified
      chain_uids
      dex
      price
      price_change_24h
    }
  }
}\`;

const CHAINS_QUERY = \`query Chains($showAllChains: Boolean) {
  chains {
    all_chains(show_all_chains: $showAllChains) {
      chain_uid
      chain_id
      display_name
      logo
      type
    }
  }
}\`;

const DEFAULT_TOKENS = ${JSON.stringify(DEFAULT_TOKENS, null, 2)};

const DEFAULT_SENDER = {
  address: "${DEFAULT_SENDER.address}",
  chain_uid: "${DEFAULT_SENDER.chain_uid}"
};

const DEX_FILTER = ${JSON.stringify(DEX_FILTER)};

const hexToRgba = (hex, alpha) => {
  const normalized = hex.replace("#", "").trim();
  if (normalized.length !== 3 && normalized.length !== 6) {
    return \`rgba(9, 35, 34, \${alpha})\`;
  }
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;
  const value = parseInt(full, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return \`rgba(\${red}, \${green}, \${blue}, \${alpha})\`;
};

const normalizeAmountInput = (value, decimals) => {
  const cleaned = value.replace(/[^0-9.]/g, "");
  if (!cleaned) {
    return "";
  }
  const parts = cleaned.split(".");
  const integer = parts[0] ?? "";
  const fraction = parts[1] ?? "";
  if (decimals <= 0) {
    return integer;
  }
  const trimmedFraction = fraction.slice(0, decimals);
  return trimmedFraction ? integer + "." + trimmedFraction : integer;
};

const toBaseUnits = (value, decimals) => {
  const cleaned = value.replace(/,/g, "").trim();
  if (!cleaned) {
    return "0";
  }
  const parts = cleaned.split(".");
  const integer = (parts[0] ?? "0").replace(/\\D/g, "") || "0";
  const fraction = (parts[1] ?? "").replace(/\\D/g, "");
  if (decimals <= 0) {
    return integer || "0";
  }
  const padded = fraction.padEnd(decimals, "0").slice(0, decimals);
  const combined = (integer + padded).replace(/^0+(?=\\d)/, "");
  return combined || "0";
};

const fromBaseUnits = (value, decimals) => {
  const cleaned = String(value || "").replace(/\\D/g, "");
  if (!cleaned) {
    return "";
  }
  if (decimals <= 0) {
    return cleaned;
  }
  const padded = cleaned.padStart(decimals + 1, "0");
  const integer = padded.slice(0, -decimals);
  const fraction = padded.slice(-decimals).replace(/0+$/, "");
  return fraction ? integer + "." + fraction : integer;
};

const getTokenLabel = (token) => {
  if (!token) {
    return "";
  }
  return token.displayName
    ? token.displayName + " (" + token.tokenId + ")"
    : token.tokenId;
};

const formatPrice = (value) => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "--";
  }
  const decimals = value >= 1 ? 2 : 4;
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

const ensureDifferentToken = (tokens, nextToken, currentToken) => {
  const fallback = tokens.find((token) => token.tokenId !== nextToken);
  if (currentToken === nextToken && fallback) {
    return fallback.tokenId;
  }
  return currentToken;
};

export function ${componentName}() {
  const [tokens, setTokens] = useState(DEFAULT_TOKENS);
  const [tokensLoading, setTokensLoading] = useState(true);
  const [tokensError, setTokensError] = useState(null);
  const verifiedOnly = ${verifiedOnly ? "true" : "false"};
  const chainTypeFilter = "${chainTypeFilter}";
  const [tokenIn, setTokenIn] = useState("${tokenIn}");
  const [tokenOut, setTokenOut] = useState("${tokenOut}");
  const [amountIn, setAmountIn] = useState("${amountIn}");
  const [chains, setChains] = useState([]);
  const [chainsLoading, setChainsLoading] = useState(true);
  const [chainsError, setChainsError] = useState(null);
  const [fromChain, setFromChain] = useState("${fromChain}");
  const [toChain, setToChain] = useState("${toChain}");
  const [quoteResult, setQuoteResult] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState(null);
  const [txResult, setTxResult] = useState(null);
  const [txLoading, setTxLoading] = useState(false);
  const [txError, setTxError] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [trackingState, setTrackingState] = useState("idle");
  const [trackingLabel, setTrackingLabel] = useState("");
  const [trackingProgress, setTrackingProgress] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const isPaymentWidget = ${isPayment ? "true" : "false"};
  const isPricingWidget = ${widgetType === "pricing" ? "true" : "false"};
  const paymentMode = "${paymentMode}";
  const pricingTokenFilter = ${JSON.stringify(pricingTokenFilter)};
  const [pricingPage, setPricingPage] = useState(0);
  const pricingPageSize = 8;
  const isReceiveFixed = isPaymentWidget && paymentMode === "receive";
  const recipientAddress = "${recipientAddress}";

  const theme = {
    accent: "${theme.accent}",
    surface: "${theme.surface}",
    panel: "${theme.panel}",
    border: "${theme.border}",
    text: "${theme.text}",
    muted: "${theme.muted}"
  };

  const styles = useMemo(() => ${JSON.stringify(css)}, []);

  const styleVars = {
    "--widget-accent": theme.accent,
    "--widget-accent-soft": hexToRgba(theme.accent, 0.12),
    "--widget-surface": theme.surface,
    "--widget-panel": theme.panel,
    "--widget-border": theme.border,
    "--widget-text": theme.text,
    "--widget-muted": theme.muted
  };

  useEffect(() => {
    let active = true;

    async function loadTokens() {
      try {
        setTokensLoading(true);
        setTokensError(null);
        const variables = { limit: 150, dex: DEX_FILTER };
        if (verifiedOnly) {
          variables.verified = true;
        }
        const res = await fetch("https://testnet.api.euclidprotocol.com/graphql", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            query: TOKEN_QUERY,
            variables
          })
        });
        const json = await res.json();
        const entries = json?.data?.token?.token_metadatas ?? [];
        const unique = new Map();
        entries.forEach((token) => {
          if (token?.tokenId && !unique.has(token.tokenId)) {
            const decimals = Number(token.coinDecimal);
            const normalized = {
              ...token,
              coinDecimal: Number.isFinite(decimals) ? decimals : 0
            };
            unique.set(token.tokenId, normalized);
          }
        });
        if (active && unique.size) {
          setTokens(Array.from(unique.values()));
          setTokensError(null);
        }
      } catch (err) {
        if (active) {
          setTokensError("Unable to load token list.");
        }
      } finally {
        if (active) {
          setTokensLoading(false);
        }
      }
    }

    loadTokens();
    let poll;
    if (isPricingWidget) {
      poll = window.setInterval(loadTokens, 15000);
    }
    return () => {
      active = false;
      if (poll) {
        window.clearInterval(poll);
      }
    };
  }, [verifiedOnly, isPricingWidget]);

  const baseTokens = tokens.length ? tokens : DEFAULT_TOKENS;
  const verifiedTokens = verifiedOnly
    ? baseTokens.filter((token) => token.is_verified !== false)
    : baseTokens;
  const dexFiltered = verifiedTokens.filter((token) => {
    if (!token.dex) {
      return true;
    }
    const dexValues = Array.isArray(token.dex) ? token.dex : [token.dex];
    return dexValues.some((dex) =>
      DEX_FILTER.includes(String(dex).toLowerCase())
    );
  });
  const chainTypeByUid = useMemo(() => {
    const map = new Map();
    chains.forEach((chain) => {
      if (!chain?.chain_uid) {
        return;
      }
      const normalized = (chain.type ?? "").toLowerCase();
      if (normalized) {
        map.set(chain.chain_uid, normalized);
      }
    });
    return map;
  }, [chains]);
  const applyChainFilter = chainTypeFilter !== "any" && chainTypeByUid.size > 0;
  const chainFiltered = applyChainFilter
    ? dexFiltered.filter((token) => {
        const chainUids = token.chain_uids ?? [];
        if (!chainUids.length) {
          return true;
        }
        return chainUids.some((uid) => {
          const chainType = chainTypeByUid.get(uid);
          if (!chainType) {
            return false;
          }
          if (chainTypeFilter === "evm") {
            return chainType.includes("evm");
          }
          if (chainTypeFilter === "cosmos") {
            return chainType.includes("cosmos");
          }
          return true;
        });
      })
    : dexFiltered;
  const tokenOptions = chainFiltered.length
    ? chainFiltered
    : dexFiltered.length
      ? dexFiltered
      : baseTokens;

  const pricingFilteredTokens = useMemo(() => {
    if (!pricingTokenFilter.length) {
      return tokenOptions;
    }
    const allowed = new Set(pricingTokenFilter);
    return tokenOptions.filter((token) => allowed.has(token.tokenId));
  }, [tokenOptions, pricingTokenFilter]);

  const pricingTotalPages = Math.max(
    1,
    Math.ceil(pricingFilteredTokens.length / pricingPageSize)
  );
  const pricingPageSafe = Math.min(pricingPage, pricingTotalPages - 1);
  const pricingTokens = useMemo(() => {
    const start = pricingPageSafe * pricingPageSize;
    return pricingFilteredTokens.slice(start, start + pricingPageSize);
  }, [pricingFilteredTokens, pricingPageSafe, pricingPageSize]);

  useEffect(() => {
    if (!tokenOptions.length) {
      return;
    }
    if (!tokenOptions.some((token) => token.tokenId === tokenIn)) {
      setTokenIn(tokenOptions[0].tokenId);
    }
    if (!tokenOptions.some((token) => token.tokenId === tokenOut)) {
      setTokenOut(tokenOptions[1]?.tokenId ?? tokenOptions[0].tokenId);
    }
  }, [tokenOptions, tokenIn, tokenOut]);

  useEffect(() => {
    setPricingPage(0);
  }, [pricingTokenFilter, tokenOptions]);

  useEffect(() => {
    if (pricingPage >= pricingTotalPages) {
      setPricingPage(Math.max(0, pricingTotalPages - 1));
    }
  }, [pricingPage, pricingTotalPages]);

  useEffect(() => {
    setQuoteResult(null);
    setQuoteError(null);
    setQuoteLoading(false);
    setTxResult(null);
    setTxError(null);
    setTxLoading(false);
  }, [tokenIn, tokenOut, amountIn, fromChain, toChain, recipientAddress, paymentMode]);

  const tokenInMeta = tokenOptions.find((token) => token.tokenId === tokenIn);
  const tokenOutMeta = tokenOptions.find((token) => token.tokenId === tokenOut);
  const chainOptions = chains.length ? chains : [];
  const fromChainFallback =
    tokenInMeta?.chain_uids?.map((uid) => ({ chain_uid: uid })) ?? [];
  const toChainFallback =
    tokenOutMeta?.chain_uids?.map((uid) => ({ chain_uid: uid })) ?? [];
  const fromChainOptions =
    chainOptions.length
      ? tokenInMeta?.chain_uids?.length
        ? chainOptions.filter((chain) => tokenInMeta.chain_uids.includes(chain.chain_uid))
        : chainOptions
      : fromChainFallback;
  const toChainOptions =
    chainOptions.length
      ? tokenOutMeta?.chain_uids?.length
        ? chainOptions.filter((chain) => tokenOutMeta.chain_uids.includes(chain.chain_uid))
        : chainOptions
      : toChainFallback;
  const formatChainLabel = (chain) =>
    chain?.display_name
      ? chain.display_name + " (" + chain.chain_uid + ")"
      : chain?.chain_uid || "";

  useEffect(() => {
    if (!fromChainOptions.length) {
      return;
    }
    if (!fromChainOptions.some((chain) => chain.chain_uid === fromChain)) {
      setFromChain(fromChainOptions[0].chain_uid);
    }
  }, [fromChainOptions, fromChain]);

  useEffect(() => {
    if (!toChainOptions.length) {
      return;
    }
    if (!toChainOptions.some((chain) => chain.chain_uid === toChain)) {
      setToChain(toChainOptions[0].chain_uid);
    }
  }, [toChainOptions, toChain]);
  const tokenInDecimals = tokenInMeta?.coinDecimal ?? 0;
  const tokenOutDecimals = tokenOutMeta?.coinDecimal ?? 0;
  const recipientAddressValue = recipientAddress.trim();
  const widgetTitle = isPricingWidget
    ? "Euclid Prices"
    : isPaymentWidget
      ? "Euclid Pay"
      : "Euclid Swap";
  const widgetSubtitle = isPricingWidget
    ? "Live token prices"
    : isPaymentWidget
      ? "Payment widget (REST)"
      : "Swap transaction (REST)";
  const recipientLabel = isPaymentWidget ? "Recipient" : "You receive";
  const toChainLabel = isPaymentWidget ? "Recipient chain" : "To chain";
  const tokenOutLabel = isPaymentWidget ? "Recipient asset" : "Token out";
  const amountLabel = "Amount to pay";
  const inputDecimals = isReceiveFixed ? tokenOutDecimals : tokenInDecimals;
  const inputAmountBase = toBaseUnits(amountIn, inputDecimals);
  const probeAmountBase = useMemo(() => toBaseUnits("1", tokenInDecimals), [tokenInDecimals]);
  const quoteAmountBase = isReceiveFixed ? probeAmountBase : inputAmountBase;
  const estimatedPayBase = useMemo(() => {
    if (!isReceiveFixed) {
      return inputAmountBase;
    }
    try {
      const desiredOut = BigInt(inputAmountBase || "0");
      const quoteOut = BigInt(quoteResult?.amountOut ?? "0");
      const probe = BigInt(probeAmountBase || "0");
      if (
        desiredOut === BigInt("0") ||
        quoteOut === BigInt("0") ||
        probe === BigInt("0")
      ) {
        return "0";
      }
      const numerator = desiredOut * probe;
      const rounded = (numerator + quoteOut - BigInt("1")) / quoteOut;
      return rounded.toString();
    } catch (err) {
      return "0";
    }
  }, [isReceiveFixed, inputAmountBase, quoteResult?.amountOut, probeAmountBase]);
  const payAmountBase = isReceiveFixed ? estimatedPayBase : inputAmountBase;
  const payAmountDisplay =
    payAmountBase && payAmountBase !== "0"
      ? fromBaseUnits(payAmountBase, tokenInDecimals)
      : "";
  const payTokenLabel = tokenInMeta?.displayName ?? tokenInMeta?.tokenId ?? tokenIn;
  const receiveTokenLabel =
    tokenOutMeta?.displayName ?? tokenOutMeta?.tokenId ?? tokenOut;
  const amountOutDisplay = isReceiveFixed
    ? amountIn
    : quoteResult?.amountOut
      ? fromBaseUnits(quoteResult.amountOut, tokenOutDecimals)
      : "";
  const paymentHint =
    inputAmountBase === "0"
      ? isReceiveFixed
        ? "Set the receive amount in recipient details."
        : "Enter an amount to continue."
      : quoteLoading
        ? "Checking rates..."
        : isReceiveFixed
          ? payAmountDisplay
            ? "Recipient receives " +
              amountIn +
              " " +
              receiveTokenLabel +
              ". Estimated pay: " +
              payAmountDisplay +
              " " +
              payTokenLabel
            : "Estimating pay amount..."
          : "Best rate applied at payment.";
  const showSwapAction = true;

  useEffect(() => {
    if (isPricingWidget) {
      setQuoteResult(null);
      setQuoteError(null);
      setQuoteLoading(false);
      return;
    }
    if (!inputAmountBase || inputAmountBase === "0" || tokenIn === tokenOut) {
      setQuoteResult(null);
      setQuoteError(null);
      setQuoteLoading(false);
      return;
    }

    let active = true;
    const timer = setTimeout(async () => {
      setQuoteLoading(true);
      setQuoteError(null);
      try {
        const chainUids = [fromChain, toChain].filter(Boolean).filter((value, index, self) => self.indexOf(value) === index);
        const res = await fetch(
          "https://testnet.api.euclidprotocol.com/api/v1/routes",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "content-type": "application/json"
            },
            body: JSON.stringify({
              external: true,
              token_in: tokenIn,
              token_out: tokenOut,
              amount_in: quoteAmountBase,
              chain_uids: chainUids
            })
          }
        );
        const json = await res.json();
        if (active) {
          setQuoteResult(getBestRoute(json));
        }
      } catch (err) {
        if (active) {
          setQuoteError(err instanceof Error ? err.message : "Quote failed.");
          setQuoteResult(null);
        }
      } finally {
        if (active) {
          setQuoteLoading(false);
        }
      }
    }, 350);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [
    inputAmountBase,
    quoteAmountBase,
    tokenIn,
    tokenOut,
    fromChain,
    toChain,
    isPricingWidget,
  ]);

  const handleTokenIn = (value) => {
    setTokenIn(value);
    if (!isPaymentWidget) {
      setTokenOut((current) => ensureDifferentToken(tokenOptions, value, current));
    }
  };

  const handleTokenOut = (value) => {
    setTokenOut(value);
    if (!isPaymentWidget) {
      setTokenIn((current) => ensureDifferentToken(tokenOptions, value, current));
    }
  };

  const handleFlip = () => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
  };

  const TokenSelect = ({ value, options, disabled, label, onChange }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const rootRef = useRef(null);
    const searchRef = useRef(null);
    const selected = options.find((token) => token.tokenId === value);
    const initial = (selected?.displayName ?? selected?.tokenId ?? value ?? "")
      .slice(0, 1)
      .toUpperCase();
    const filteredOptions = useMemo(() => {
      const normalized = search.trim().toLowerCase();
      if (!normalized) {
        return options;
      }
      return options.filter((token) => {
        const haystack = (token.displayName ?? "") + " " + (token.tokenId ?? "");
        return haystack.toLowerCase().includes(normalized);
      });
    }, [options, search]);

    useEffect(() => {
      if (open) {
        setSearch("");
        window.setTimeout(() => {
          if (searchRef.current) {
            searchRef.current.focus();
          }
        }, 0);
      }
    }, [open]);

    useEffect(() => {
      if (!open) {
        return;
      }

      const handleClick = (event) => {
        if (rootRef.current && !rootRef.current.contains(event.target)) {
          setOpen(false);
        }
      };

      const handleKey = (event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKey);

      return () => {
        document.removeEventListener("mousedown", handleClick);
        document.removeEventListener("keydown", handleKey);
      };
    }, [open]);

    return (
      <div className="euclid-widget__select" ref={rootRef}>
        <button
          type="button"
          className={
            "euclid-widget__selectTrigger" + (open ? " euclid-widget__selectOpen" : "")
          }
          onClick={() => {
            if (!disabled) {
              setOpen((prev) => !prev);
            }
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={label}
          disabled={disabled}
        >
          <span className="euclid-widget__selectIcon">
            {selected?.image ? (
              <img src={selected.image} alt="" />
            ) : (
              <span>{initial}</span>
            )}
          </span>
          <span className="euclid-widget__selectValue">
            {getTokenLabel(selected)}
          </span>
        </button>
        {open ? (
          <div className="euclid-widget__selectContent" role="listbox">
            <input
              ref={searchRef}
              className="euclid-widget__selectSearch"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tokens"
              aria-label="Search tokens"
            />
            {filteredOptions.length ? (
              filteredOptions.map((token) => {
                const isActive = token.tokenId === value;
                const tokenInitial = (token.displayName ?? token.tokenId ?? "")
                  .slice(0, 1)
                  .toUpperCase();
                return (
                  <button
                    key={token.tokenId}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={
                      "euclid-widget__selectItem" +
                      (isActive ? " euclid-widget__selectItemActive" : "")
                    }
                    onClick={() => {
                      onChange(token.tokenId);
                      setOpen(false);
                    }}
                  >
                    <span className="euclid-widget__selectItemIcon">
                      {token.image ? (
                        <img src={token.image} alt="" />
                      ) : (
                        <span>{tokenInitial}</span>
                      )}
                    </span>
                    <span className="euclid-widget__selectItemLabel">
                      {getTokenLabel(token)}
                    </span>
                    {isActive ? (
                      <span className="euclid-widget__selectItemCheck">✓</span>
                    ) : null}
                  </button>
                );
              })
            ) : (
              <div className="euclid-widget__selectEmpty">No matches found.</div>
            )}
          </div>
        ) : null}
      </div>
    );
  };

  const ChainSelect = ({ value, options, disabled, label, onChange }) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);
    const selected = options.find((chain) => chain.chain_uid === value);
    const initial = (selected?.display_name ?? selected?.chain_uid ?? value ?? "")
      .slice(0, 1)
      .toUpperCase();

    useEffect(() => {
      if (!open) {
        return;
      }

      const handleClick = (event) => {
        if (rootRef.current && !rootRef.current.contains(event.target)) {
          setOpen(false);
        }
      };

      const handleKey = (event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKey);

      return () => {
        document.removeEventListener("mousedown", handleClick);
        document.removeEventListener("keydown", handleKey);
      };
    }, [open]);

    return (
      <div className="euclid-widget__select euclid-widget__select--chain" ref={rootRef}>
        <button
          type="button"
          className={
            "euclid-widget__selectTrigger" + (open ? " euclid-widget__selectOpen" : "")
          }
          onClick={() => {
            if (!disabled) {
              setOpen((prev) => !prev);
            }
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={label}
          disabled={disabled}
        >
          <span className="euclid-widget__selectIcon">
            {selected?.logo ? (
              <img src={selected.logo} alt="" />
            ) : (
              <span>{initial}</span>
            )}
          </span>
          <span className="euclid-widget__selectValue">
            {formatChainLabel(selected)}
          </span>
        </button>
        {open ? (
          <div className="euclid-widget__selectContent" role="listbox">
            {options.map((chain) => {
              const isActive = chain.chain_uid === value;
              const chainInitial = (chain.display_name ?? chain.chain_uid ?? "")
                .slice(0, 1)
                .toUpperCase();
              return (
                <button
                  key={chain.chain_uid}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={
                    "euclid-widget__selectItem" +
                    (isActive ? " euclid-widget__selectItemActive" : "")
                  }
                  onClick={() => {
                    onChange(chain.chain_uid);
                    setOpen(false);
                  }}
                >
                  <span className="euclid-widget__selectItemIcon">
                    {chain.logo ? (
                      <img src={chain.logo} alt="" />
                    ) : (
                      <span>{chainInitial}</span>
                    )}
                  </span>
                  <span className="euclid-widget__selectItemLabel">
                    {formatChainLabel(chain)}
                  </span>
                  {isActive ? (
                    <span className="euclid-widget__selectItemCheck">✓</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  };

  const buildSwapTx = async () => {
    setTxLoading(true);
    setTxError(null);
    setTxResult(null);

    if (isPaymentWidget) {
      startDemoTracking();
    }

    if (isReceiveFixed && (!inputAmountBase || inputAmountBase === "0")) {
      setTxError("Enter a receive amount.");
      setTxLoading(false);
      return;
    }

    const baseAmount = payAmountBase;
    if (!baseAmount || baseAmount === "0") {
      setTxError("Enter a valid amount.");
      setTxLoading(false);
      return;
    }

    const swapPath = quoteResult?.swapPath ?? [];
    if (!swapPath.length) {
      setTxError("Quote a route before building the swap.");
      setTxLoading(false);
      return;
    }

    const senderChainUid = fromChain || swapPath[0]?.chain_uid || DEFAULT_SENDER.chain_uid;
    const receiverChainUid = toChain || senderChainUid;
    const receiverAddress = isPaymentWidget ? recipientAddressValue : DEFAULT_SENDER.address;
    if (isPaymentWidget && !receiverAddress) {
      setTxError("Add a recipient address.");
      setTxLoading(false);
      return;
    }
    const recipientAmountBase = isReceiveFixed
      ? inputAmountBase
      : quoteResult?.amountOut;
    const crossChainAddresses =
      receiverChainUid && receiverAddress
        ? [
            {
              user: {
                address: receiverAddress,
                chain_uid: receiverChainUid,
                amount: recipientAmountBase,
              },
              ...(recipientAmountBase
                ? { limit: { less_than_or_equal: recipientAmountBase } }
                : {}),
            },
          ]
        : undefined;
    const payload = {
      amount_in: baseAmount,
      asset_in: {
        token: tokenIn,
        amount: baseAmount,
        token_type: {
          native: {
            denom: tokenIn
          }
        }
      },
      slippage: "500",
      sender: {
        address: DEFAULT_SENDER.address,
        chain_uid: senderChainUid
      },
      swap_path: {
        path: swapPath
      },
      ...(crossChainAddresses ? { cross_chain_addresses: crossChainAddresses } : {})
    };

    try {
      const res = await fetch(
        "https://testnet.api.euclidprotocol.com/api/v1/execute/swap",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.message || "Swap request failed.");
      }
      setTxResult({
        type: json?.type,
        chainId: json?.chain_id ?? json?.chainId ?? json?.sender?.chain_uid,
        messages: Array.isArray(json?.msgs) ? json.msgs.length : undefined
      });
    } catch (err) {
      setTxError(err instanceof Error ? err.message : "Swap request failed.");
    } finally {
      setTxLoading(false);
    }
  };

  const handleSwapAction = () => {
    if (isPaymentWidget) {
      buildSwapTx();
      return;
    }
    if (!walletConnected) {
      setWalletConnected(true);
      return;
    }
    buildSwapTx();
  };

  const canBuildTx =
    payAmountBase !== "0" &&
    tokenIn !== tokenOut &&
    Boolean(quoteResult?.swapPath?.length) &&
    Boolean(fromChain) &&
    Boolean(toChain) &&
    (!isPaymentWidget || recipientAddressValue !== "") &&
    !quoteLoading &&
    !txLoading;

  const buttonLabel = isPaymentWidget
    ? actionLabel
    : walletConnected
      ? actionLabel
      : "Connect wallet";

  const actionDisabled = isPaymentWidget
    ? !canBuildTx
    : walletConnected
      ? !canBuildTx
      : false;

  const metaRows = [
    {
      label: "Routes",
      value: quoteResult?.routes ? String(quoteResult.routes) : "--"
    },
    {
      label: "Price impact",
      value: quoteResult?.priceImpact ? quoteResult.priceImpact + "%" : "--"
    },
    {
      label: "Tx type",
      value: txResult?.type ?? "--"
    },
    {
      label: "Messages",
      value:
        typeof txResult?.messages === "number"
          ? String(txResult.messages)
          : "--"
    }
  ];

  return (
    <div
      className={
        "euclid-widget" + (isPaymentWidget ? " euclid-widget--payment" : "")
      }
      style={styleVars}
    >
      <style>{styles}</style>
      {isPricingWidget ? (
        <div className="euclid-pricing">
          <div className="euclid-pricing__header">
            <div>
              <div className="euclid-pricing__title">{widgetTitle}</div>
              <div className="euclid-pricing__subtitle">Live token prices</div>
            </div>
            <div className="euclid-pricing__badge">Live</div>
          </div>
          {tokensError ? (
            <div className="euclid-pricing__notice">
              Token list unavailable. Showing defaults.
            </div>
          ) : null}
          <div className="euclid-pricing__columns">
            <span>Token</span>
            <span>Price</span>
            <span>24h</span>
          </div>
          <div className="euclid-pricing__list">
            {pricingTokens.map((token) => {
              const priceValue = Number(token.price ?? "");
              const rawChange = token.price_change_24h;
              const changeValue =
                typeof rawChange === "number" ? rawChange : Number(rawChange ?? "");
              const hasChange = Number.isFinite(changeValue);
              const isUp = hasChange ? changeValue >= 0 : true;
              const initial = (token.displayName ?? token.tokenId ?? "")
                .slice(0, 1)
                .toUpperCase();
              return (
                <div key={token.tokenId} className="euclid-pricing__row">
                  <div className="euclid-pricing__token">
                    <span className="euclid-pricing__tokenIcon">
                      {token.image ? <img src={token.image} alt="" /> : <span>{initial}</span>}
                    </span>
                    <div className="euclid-pricing__tokenInfo">
                      <div className="euclid-pricing__tokenName">
                        {token.displayName ?? token.tokenId}
                      </div>
                      <div className="euclid-pricing__tokenSymbol">
                        {token.tokenId.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="euclid-pricing__price">{formatPrice(priceValue)}</div>
                  <div
                    className={
                      "euclid-pricing__change " +
                      (hasChange
                        ? isUp
                          ? "euclid-pricing__change--up"
                          : "euclid-pricing__change--down"
                        : "euclid-pricing__change--neutral")
                    }
                  >
                    {hasChange ? (isUp ? "+" : "") + changeValue.toFixed(2) + "%" : "--"}
                  </div>
                </div>
              );
            })}
          </div>
          {pricingTotalPages > 1 ? (
            <div className="euclid-pricing__pagination">
              <button
                className="euclid-pricing__pageButton"
                type="button"
                onClick={() => setPricingPage((prev) => Math.max(0, prev - 1))}
                disabled={pricingPageSafe === 0}
              >
                Prev
              </button>
              <div className="euclid-pricing__pageIndicator">
                {pricingPageSafe + 1} / {pricingTotalPages}
              </div>
              <button
                className="euclid-pricing__pageButton"
                type="button"
                onClick={() =>
                  setPricingPage((prev) => Math.min(pricingTotalPages - 1, prev + 1))
                }
                disabled={pricingPageSafe + 1 >= pricingTotalPages}
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      ) : isPaymentWidget ? (
        <div className="euclid-payment">
          <div className="euclid-payment__header">
            <div>
              <div className="euclid-payment__title">{widgetTitle}</div>
              <div className="euclid-payment__subtitle">
                Stripe-like checkout powered by Euclid
              </div>
            </div>
            <div className="euclid-payment__badge">Testnet</div>
          </div>
          {tokensError ? (
            <div className="euclid-payment__notice">
              Token list unavailable. Showing defaults.
            </div>
          ) : null}
          {chainsError ? (
            <div className="euclid-payment__notice">
              Chain list unavailable. Showing chain IDs only.
            </div>
          ) : null}
          <div className="euclid-payment__card">
            <div className="euclid-payment__labelRow">
              <span>{amountLabel}</span>
            </div>
            {isReceiveFixed ? (
              <div className="euclid-payment__amountRow">
                <input
                  className="euclid-payment__amountInput"
                  value={payAmountDisplay}
                  placeholder={quoteLoading ? "Estimating..." : "Estimated"}
                  readOnly
                />
                <TokenSelect
                  value={tokenIn}
                  options={tokenOptions}
                  disabled={tokensLoading}
                  label="Pay token"
                  onChange={handleTokenIn}
                />
              </div>
            ) : (
              <div className="euclid-payment__amountRow">
                <input
                  className="euclid-payment__amountInput"
                  value={amountIn}
                  onChange={(event) =>
                    setAmountIn(
                      normalizeAmountInput(event.target.value, inputDecimals)
                    )
                  }
                  placeholder="0.0"
                  inputMode="decimal"
                />
                <TokenSelect
                  value={tokenIn}
                  options={tokenOptions}
                  disabled={tokensLoading}
                  label="Pay token"
                  onChange={handleTokenIn}
                />
              </div>
            )}
            <div className="euclid-payment__chainRow">
              <span className="euclid-payment__chainLabel">Pay from chain</span>
              <ChainSelect
                value={fromChain}
                options={fromChainOptions}
                disabled={chainsLoading || !fromChainOptions.length}
                label="Pay from chain"
                onChange={setFromChain}
              />
            </div>
            <div className="euclid-payment__hint">{paymentHint}</div>
          </div>
          <button
            className="euclid-payment__action"
            type="button"
            onClick={handleSwapAction}
            disabled={actionDisabled}
          >
            {txLoading ? loadingLabel : buttonLabel}
          </button>
          {shouldShowTracking ? (
            <div className="euclid-payment__tracker" data-status={trackingTone}>
              <div className="euclid-payment__trackerHeader">
                <span>{trackingLabelText}</span>
                <span className="euclid-payment__trackerStatus">
                  {trackingStatus}
                </span>
              </div>
              <div className="euclid-payment__trackerBar">
                <span
                  className="euclid-payment__trackerFill"
                  style={{ width: trackingProgress + "%" }}
                />
                {trackingActive ? (
                  <span className="euclid-payment__trackerGlow" />
                ) : null}
              </div>
              <div className="euclid-payment__trackerMeta">
                {trackingMetaText}
                {trackingHashDisplay ? " · " + trackingHashDisplay : ""}
              </div>
            </div>
          ) : null}
          {quoteError ? (
            <div className="euclid-payment__error">{quoteError}</div>
          ) : null}
          {txError ? (
            <div className="euclid-payment__error">{txError}</div>
          ) : null}
        </div>
      ) : (
        <>
          <div className="euclid-widget__header">
            <div>
              <div className="euclid-widget__title">{widgetTitle}</div>
              <div className="euclid-widget__subtitle">{widgetSubtitle}</div>
            </div>
            <div className="euclid-widget__badge">Testnet</div>
          </div>
          {tokensError ? (
            <div className="euclid-widget__notice">
              Token list unavailable. Showing defaults.
            </div>
          ) : null}
          {chainsError ? (
            <div className="euclid-widget__notice">
              Chain list unavailable. Showing chain IDs only.
            </div>
          ) : null}
          <div className="euclid-widget__body">
            <div className="euclid-widget__card">
              <div className="euclid-widget__row">
                <span>You pay</span>
              </div>
              <div className="euclid-widget__chainRow">
                <span className="euclid-widget__chainLabel">From chain</span>
                <ChainSelect
                  value={fromChain}
                  options={fromChainOptions}
                  disabled={chainsLoading || !fromChainOptions.length}
                  label="From chain"
                  onChange={setFromChain}
                />
              </div>
              <div className="euclid-widget__field">
                <TokenSelect
                  value={tokenIn}
                  options={tokenOptions}
                  disabled={tokensLoading}
                  label="Token in"
                  onChange={handleTokenIn}
                />
                <input
                  className="euclid-widget__input"
                  value={amountIn}
                  onChange={(event) =>
                    setAmountIn(
                      normalizeAmountInput(event.target.value, tokenInDecimals)
                    )
                  }
                  placeholder="0.0"
                  inputMode="decimal"
                />
              </div>
            </div>
            {!isPaymentWidget ? (
              <button
                className="euclid-widget__flip"
                type="button"
                onClick={handleFlip}
              >
                Swap
              </button>
            ) : null}
            <div className="euclid-widget__card">
              <div className="euclid-widget__row">
                <span>{recipientLabel}</span>
                <span>{tokenOutMeta ? getTokenLabel(tokenOutMeta) : tokenOut}</span>
              </div>
              <div className="euclid-widget__chainRow">
                <span className="euclid-widget__chainLabel">{toChainLabel}</span>
                <ChainSelect
                  value={toChain}
                  options={toChainOptions}
                  disabled={isPaymentWidget || chainsLoading || !toChainOptions.length}
                  label={toChainLabel}
                  onChange={setToChain}
                />
              </div>
              <div className="euclid-widget__field">
                <TokenSelect
                  value={tokenOut}
                  options={tokenOptions}
                  disabled={isPaymentWidget || tokensLoading}
                  label={tokenOutLabel}
                  onChange={handleTokenOut}
                />
                <input
                  className="euclid-widget__input euclid-widget__input--readonly"
                  value={amountOutDisplay}
                  placeholder={quoteLoading ? "Quoting..." : "Estimated"}
                  readOnly
                />
              </div>
            </div>
          </div>
          {showSwapAction ? (
            <button
              className="euclid-widget__action"
              type="button"
              onClick={handleSwapAction}
              disabled={actionDisabled}
            >
              {txLoading ? loadingLabel : buttonLabel}
            </button>
          ) : null}
          <div className="euclid-widget__meta">
            <div className="euclid-widget__metaRow">
              <span>${resultLabel}</span>
              <span>{amountOutDisplay || "--"}</span>
            </div>
            {metaRows.map((row) => (
              <div className="euclid-widget__metaRow" key={row.label}>
                <span>{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
            {quoteError ? (
              <div className="euclid-widget__error">{quoteError}</div>
            ) : null}
            {txError ? <div className="euclid-widget__error">{txError}</div> : null}
          </div>
        </>
      )}
    </div>
  );
}

function getBestRoute(data) {
  const paths = data?.paths ?? [];
  let bestAmount = null;
  let bestMeta = {};

  paths.forEach((path) => {
    const hops = path?.path ?? [];
    const last = hops[hops.length - 1];
    const amount = last?.amount_out;
    if (!amount) {
      return;
    }

    try {
      const numeric = BigInt(amount);
      if (bestAmount === null || numeric > bestAmount) {
        bestAmount = numeric;
        bestMeta = {
          amountOut: amount,
          routes: paths.length,
          priceImpact: path?.total_price_impact,
          swapPath: hops
        };
      }
    } catch (err) {
      return;
    }
  });

  return bestMeta;
}
`;
  }, [
    theme,
    tokenIn,
    tokenOut,
    amountIn,
    verifiedOnly,
    chainTypeFilter,
    fromChain,
    toChain,
    widgetType,
    recipientAddress,
    paymentMode,
  ]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setCopied(false);
    }
  };

  const formatTokenLabel = (token?: TokenMeta) =>
    token?.displayName ? `${token.displayName} (${token.tokenId})` : token?.tokenId ?? "";
  const formatPrice = (value?: number) => {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return "--";
    }
    const decimals = value >= 1 ? 2 : 4;
    return value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };
  const tokenInMeta = tokenOptions.find((token) => token.tokenId === tokenIn);
  const tokenOutMeta = tokenOptions.find((token) => token.tokenId === tokenOut);
  const chainOptions = useMemo(() => (chains.length ? chains : []), [chains]);
  const fromChainOptions = useMemo(() => {
    const fallback =
      tokenInMeta?.chain_uids?.map((uid) => ({ chain_uid: uid })) ?? [];
    if (!chainOptions.length) {
      return fallback;
    }
    const allowed = tokenInMeta?.chain_uids?.length ? tokenInMeta.chain_uids : null;
    return allowed ? chainOptions.filter((chain) => allowed.includes(chain.chain_uid)) : chainOptions;
  }, [chainOptions, tokenInMeta]);
  const toChainOptions = useMemo(() => {
    const fallback =
      tokenOutMeta?.chain_uids?.map((uid) => ({ chain_uid: uid })) ?? [];
    if (!chainOptions.length) {
      return fallback;
    }
    const allowed = tokenOutMeta?.chain_uids?.length ? tokenOutMeta.chain_uids : null;
    return allowed ? chainOptions.filter((chain) => allowed.includes(chain.chain_uid)) : chainOptions;
  }, [chainOptions, tokenOutMeta]);
  const formatChainLabel = (chain?: ChainMeta) =>
    chain?.display_name ? `${chain.display_name} (${chain.chain_uid})` : chain?.chain_uid ?? "";

  useEffect(() => {
    if (!fromChainOptions.length) {
      return;
    }
    if (!fromChainOptions.some((chain) => chain.chain_uid === fromChain)) {
      setFromChain(fromChainOptions[0].chain_uid);
    }
  }, [fromChainOptions, fromChain]);

  useEffect(() => {
    if (!toChainOptions.length) {
      return;
    }
    if (!toChainOptions.some((chain) => chain.chain_uid === toChain)) {
      setToChain(toChainOptions[0].chain_uid);
    }
  }, [toChainOptions, toChain]);
  const tokenInDecimals = tokenInMeta?.coinDecimal ?? 0;
  const tokenOutDecimals = tokenOutMeta?.coinDecimal ?? 0;
  const recipientAddressValue = recipientAddress.trim();
  const widgetTitle = isPricingWidget
    ? "Euclid Prices"
    : isPaymentWidget
      ? "Euclid Pay"
      : "Euclid Swap";
  const widgetSubtitle = isPricingWidget
    ? "Live token prices"
    : isPaymentWidget
      ? "Payment widget (REST)"
      : "Swap transaction (REST)";
  const recipientLabel = isPaymentWidget ? "Recipient" : "You receive";
  const toChainLabel = isPaymentWidget ? "Recipient chain" : "To chain";
  const tokenOutLabel = isPaymentWidget ? "Recipient asset" : "Token out";
  const actionLabel = isPaymentWidget ? "Pay" : "Build swap tx";
  const loadingLabel = isPaymentWidget ? "Processing..." : "Building...";
  const walletActionLabel = isPaymentWidget
    ? actionLabel
    : walletConnected
      ? actionLabel
      : "Connect wallet";
  const resultLabel = isPaymentWidget ? "Recipient receives" : "Quoted amount out";
  const amountLabel = "Amount to pay";
  const inputDecimals = isReceiveFixed ? tokenOutDecimals : tokenInDecimals;
  const inputAmountBase = toBaseUnits(amountIn, inputDecimals);
  const probeAmountBase = useMemo(
    () => toBaseUnits("1", tokenInDecimals),
    [tokenInDecimals]
  );
  const quoteAmountBase = isReceiveFixed ? probeAmountBase : inputAmountBase;
  const estimatedPayBase = useMemo(() => {
    if (!isReceiveFixed) {
      return inputAmountBase;
    }
    try {
      const desiredOut = BigInt(inputAmountBase || "0");
      const quoteOut = BigInt(quoteResult?.amountOut ?? "0");
      const probe = BigInt(probeAmountBase || "0");
      if (
        desiredOut === BigInt("0") ||
        quoteOut === BigInt("0") ||
        probe === BigInt("0")
      ) {
        return "0";
      }
      const numerator = desiredOut * probe;
      const rounded = (numerator + quoteOut - BigInt("1")) / quoteOut;
      return rounded.toString();
    } catch (err) {
      return "0";
    }
  }, [isReceiveFixed, inputAmountBase, quoteResult?.amountOut, probeAmountBase]);
  const payAmountBase = isReceiveFixed ? estimatedPayBase : inputAmountBase;
  const payAmountDisplay =
    payAmountBase && payAmountBase !== "0"
      ? fromBaseUnits(payAmountBase, tokenInDecimals)
      : "";
  const payTokenLabel = tokenInMeta?.displayName ?? tokenInMeta?.tokenId ?? tokenIn;
  const receiveTokenLabel =
    tokenOutMeta?.displayName ?? tokenOutMeta?.tokenId ?? tokenOut;
  const amountOutDisplay = isReceiveFixed
    ? amountIn
    : quoteResult?.amountOut
      ? fromBaseUnits(quoteResult.amountOut, tokenOutDecimals)
      : "";
  const canBuildTx =
    payAmountBase !== "0" &&
    tokenIn !== tokenOut &&
    Boolean(quoteResult?.swapPath?.length) &&
    Boolean(fromChain) &&
    Boolean(toChain) &&
    (!isPaymentWidget || recipientAddressValue !== "") &&
    !txLoading &&
    !quoteLoading;
  const actionDisabled = isPaymentWidget
    ? !canBuildTx
    : walletConnected
      ? !canBuildTx
      : false;
  const paymentHint =
    inputAmountBase === "0"
      ? isReceiveFixed
        ? "Set the receive amount in recipient details."
        : "Enter an amount to continue."
      : quoteLoading
        ? "Checking rates..."
        : isReceiveFixed
          ? payAmountDisplay
            ? `Recipient receives ${amountIn} ${receiveTokenLabel}. Estimated pay: ${payAmountDisplay} ${payTokenLabel}`
            : "Estimating pay amount..."
          : "Best rate applied at payment.";
  const demoTrackingVisible = isPaymentWidget && demoTrackingState !== "idle";
  const demoTrackingLabel =
    demoTrackingState === "preparing"
      ? "Preparing transaction"
      : demoTrackingState === "broadcasting"
        ? "Broadcasting to chain"
        : demoTrackingState === "confirming"
          ? "Confirming on Euclid"
          : demoTrackingState === "completed"
            ? "Payment confirmed"
            : demoTrackingState === "failed"
              ? "Payment failed"
              : "";
  const demoTrackingHashDisplay = demoTrackingHash
    ? `${demoTrackingHash.slice(0, 10)}...${demoTrackingHash.slice(-6)}`
    : "";
  const demoOverlayState =
    demoTrackingState === "completed"
      ? "success"
      : demoTrackingState === "failed"
        ? "failed"
        : "loading";
  const demoOverlayTitle =
    demoOverlayState === "success"
      ? "Payment confirmed"
      : demoOverlayState === "failed"
        ? "Payment failed"
        : "Processing payment";
  const demoOverlaySubtitle =
    demoOverlayState === "success"
      ? "Funds routed via Euclid"
      : demoOverlayState === "failed"
        ? "Please try again"
        : demoTrackingLabel || "Securing the best route";
  const metaRows = [
    {
      label: "Routes",
      value: quoteResult?.routes ? String(quoteResult.routes) : "--",
    },
    {
      label: "Price impact",
      value: quoteResult?.priceImpact ? `${quoteResult.priceImpact}%` : "--",
    },
    {
      label: "Tx type",
      value: txResult?.type ?? "--",
    },
    {
      label: "Messages",
      value:
        typeof txResult?.messages === "number"
          ? String(txResult.messages)
          : "--",
    },
  ];

  useEffect(() => {
    if (!inputAmountBase || inputAmountBase === "0" || tokenIn === tokenOut) {
      setQuoteResult(null);
      setQuoteError(null);
      setQuoteLoading(false);
      return;
    }

    let active = true;
    const timer = window.setTimeout(async () => {
      setQuoteLoading(true);
      setQuoteError(null);
      try {
        const chainUids = [fromChain, toChain]
          .filter(Boolean)
          .filter((value, index, self) => self.indexOf(value) === index);
        const res = await fetch(
          "https://testnet.api.euclidprotocol.com/api/v1/routes",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "content-type": "application/json",
            },
            body: JSON.stringify({
              external: true,
              token_in: tokenIn,
              token_out: tokenOut,
              amount_in: quoteAmountBase,
              chain_uids: chainUids,
            }),
          }
        );
        const json = await res.json();
        if (active) {
          setQuoteResult(parseBestRoute(json));
        }
      } catch (err) {
        if (active) {
          setQuoteError(err instanceof Error ? err.message : "Quote failed.");
          setQuoteResult(null);
        }
      } finally {
        if (active) {
          setQuoteLoading(false);
        }
      }
    }, 350);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [inputAmountBase, quoteAmountBase, tokenIn, tokenOut, fromChain, toChain]);

  const TokenSelect = ({
    value,
    options,
    disabled,
    label,
    onChange,
    formatLabel,
  }: TokenSelectProps) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const rootRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const selected = options.find((token) => token.tokenId === value);
    const initial = (
      selected?.displayName ?? selected?.tokenId ?? value ?? ""
    )
      .slice(0, 1)
      .toUpperCase();
    const filteredOptions = useMemo(() => {
      const normalized = search.trim().toLowerCase();
      if (!normalized) {
        return options;
      }
      return options.filter((token) => {
        const haystack = `${token.displayName ?? ""} ${token.tokenId ?? ""}`.toLowerCase();
        return haystack.includes(normalized);
      });
    }, [options, search]);

    useEffect(() => {
      if (open) {
        setSearch("");
        window.setTimeout(() => searchRef.current?.focus(), 0);
      }
    }, [open]);

    useEffect(() => {
      if (!open) {
        return;
      }

      const handleClick = (event: MouseEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      };

      const handleKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKey);

      return () => {
        document.removeEventListener("mousedown", handleClick);
        document.removeEventListener("keydown", handleKey);
      };
    }, [open]);

    return (
      <div className={styles.swapSelect} ref={rootRef}>
        <button
          type="button"
          className={clsx(
            styles.swapSelectTrigger,
            open && styles.swapSelectOpen
          )}
          onClick={() => {
            if (!disabled) {
              setOpen((prev) => !prev);
            }
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={label}
          disabled={disabled}
        >
          <span className={styles.swapSelectIcon}>
            {selected?.image ? (
              <img src={selected.image} alt="" />
            ) : (
              <span>{initial}</span>
            )}
          </span>
          <span className={styles.swapSelectValue}>
            {formatLabel(selected)}
          </span>
        </button>
        {open ? (
          <div className={styles.swapSelectContent} role="listbox">
            <input
              ref={searchRef}
              className={styles.swapSelectSearch}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tokens"
              aria-label="Search tokens"
            />
            {filteredOptions.length ? (
              filteredOptions.map((token) => {
                const isActive = token.tokenId === value;
                const tokenInitial = (
                  token.displayName ?? token.tokenId ?? ""
                )
                  .slice(0, 1)
                  .toUpperCase();
                return (
                  <button
                    key={token.tokenId}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={clsx(
                      styles.swapSelectItem,
                      isActive && styles.swapSelectItemActive
                    )}
                    onClick={() => {
                      onChange(token.tokenId);
                      setOpen(false);
                    }}
                  >
                    <span className={styles.swapSelectItemIcon}>
                      {token.image ? (
                        <img src={token.image} alt="" />
                      ) : (
                        <span>{tokenInitial}</span>
                      )}
                    </span>
                    <span className={styles.swapSelectItemLabel}>
                      {formatLabel(token)}
                    </span>
                    {isActive ? (
                      <span className={styles.swapSelectItemCheck}>✓</span>
                    ) : null}
                  </button>
                );
              })
            ) : (
              <div className={styles.swapSelectEmpty}>No matches found.</div>
            )}
          </div>
        ) : null}
      </div>
    );
  };

  const ChainSelect = ({
    value,
    options,
    disabled,
    label,
    onChange,
    formatLabel,
  }: ChainSelectProps) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const selected = options.find((chain) => chain.chain_uid === value);
    const initial = (
      selected?.display_name ?? selected?.chain_uid ?? value ?? ""
    )
      .slice(0, 1)
      .toUpperCase();

    useEffect(() => {
      if (!open) {
        return;
      }

      const handleClick = (event: MouseEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      };

      const handleKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKey);

      return () => {
        document.removeEventListener("mousedown", handleClick);
        document.removeEventListener("keydown", handleKey);
      };
    }, [open]);

    return (
      <div className={clsx(styles.swapSelect, styles.swapChainSelect)} ref={rootRef}>
        <button
          type="button"
          className={clsx(
            styles.swapSelectTrigger,
            open && styles.swapSelectOpen
          )}
          onClick={() => {
            if (!disabled) {
              setOpen((prev) => !prev);
            }
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={label}
          disabled={disabled}
        >
          <span className={styles.swapSelectIcon}>
            {selected?.logo ? (
              <img src={selected.logo} alt="" />
            ) : (
              <span>{initial}</span>
            )}
          </span>
          <span className={styles.swapSelectValue}>
            {formatLabel(selected)}
          </span>
        </button>
        {open ? (
          <div className={styles.swapSelectContent} role="listbox">
            {options.map((chain) => {
              const isActive = chain.chain_uid === value;
              const chainInitial = (
                chain.display_name ?? chain.chain_uid ?? ""
              )
                .slice(0, 1)
                .toUpperCase();
              return (
                <button
                  key={chain.chain_uid}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={clsx(
                    styles.swapSelectItem,
                    isActive && styles.swapSelectItemActive
                  )}
                  onClick={() => {
                    onChange(chain.chain_uid);
                    setOpen(false);
                  }}
                >
                  <span className={styles.swapSelectItemIcon}>
                    {chain.logo ? (
                      <img src={chain.logo} alt="" />
                    ) : (
                      <span>{chainInitial}</span>
                    )}
                  </span>
                  <span className={styles.swapSelectItemLabel}>
                    {formatLabel(chain)}
                  </span>
                  {isActive ? (
                    <span className={styles.swapSelectItemCheck}>✓</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  };

  const buildSwapTx = async () => {
    setTxLoading(true);
    setTxError(null);
    setTxResult(null);
    if (isPaymentWidget) {
      startDemoTracking();
    }

    if (isReceiveFixed && (!inputAmountBase || inputAmountBase === "0")) {
      setTxError("Enter a receive amount.");
      setTxLoading(false);
      return;
    }

    const baseAmount = payAmountBase;
    if (!baseAmount || baseAmount === "0") {
      setTxError("Enter a valid amount.");
      setTxLoading(false);
      return;
    }

    const swapPath = quoteResult?.swapPath ?? [];
    if (!swapPath.length) {
      setTxError("Quote a route before building the swap.");
      setTxLoading(false);
      return;
    }

    const senderChainUid =
      fromChain || swapPath[0]?.chain_uid || DEFAULT_SENDER.chain_uid;
    const receiverChainUid = toChain || senderChainUid;
    const receiverAddress = isPaymentWidget ? recipientAddressValue : DEFAULT_SENDER.address;
    if (isPaymentWidget && !receiverAddress) {
      setTxError("Add a recipient address.");
      setTxLoading(false);
      return;
    }
    const recipientAmountBase = isReceiveFixed ? inputAmountBase : quoteResult?.amountOut;
    const crossChainAddresses =
      receiverChainUid && receiverAddress
        ? [
            {
              user: {
                address: receiverAddress,
                chain_uid: receiverChainUid,
                amount: recipientAmountBase,
              },
              ...(recipientAmountBase
                ? { limit: { less_than_or_equal: recipientAmountBase } }
                : {}),
            },
          ]
        : undefined;
    const payload = {
      amount_in: baseAmount,
      asset_in: {
        token: tokenIn,
        amount: baseAmount,
        token_type: {
          native: {
            denom: tokenIn,
          },
        },
      },
      slippage: "500",
      sender: {
        address: DEFAULT_SENDER.address,
        chain_uid: senderChainUid,
      },
      swap_path: {
        path: swapPath,
      },
      ...(crossChainAddresses ? { cross_chain_addresses: crossChainAddresses } : {}),
    };

    try {
      const res = await fetch(
        "https://testnet.api.euclidprotocol.com/api/v1/execute/swap",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.message || "Swap request failed.");
      }
      setTxResult({
        type: json?.type,
        chainId: json?.chain_id ?? json?.chainId ?? json?.sender?.chain_uid,
        messages: Array.isArray(json?.msgs) ? json.msgs.length : undefined,
      });
    } catch (err) {
      setTxError(err instanceof Error ? err.message : "Swap request failed.");
    } finally {
      setTxLoading(false);
    }
  };

  const handleSwapAction = () => {
    if (isPaymentWidget) {
      buildSwapTx();
      return;
    }
    if (!walletConnected) {
      setWalletConnected(true);
      return;
    }
    buildSwapTx();
  };

  return (
      <section className={styles.builderSection}>
        <div className="container">
          <div className={styles.builderHeader}>
            <Heading as="h2" className={styles.sectionTitle}>
              No-code widget builder
            </Heading>
            <p className={styles.sectionSubtitle}>
              Generate a drop-in React widget powered by Euclid testnet endpoints.
            </p>
          </div>
          <div className={styles.builderGrid}>
            <div className={styles.builderConfig}>
              <div className={styles.builderList}>
                {widgetOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={clsx(
                      styles.builderOption,
                      widgetType === option.id && styles.builderOptionActive
                    )}
                    onClick={() => setWidgetType(option.id)}
                  >
                    <div className={styles.builderOptionTitle}>
                      {option.label}
                    </div>
                    <div className={styles.builderOptionText}>
                      {option.description}
                    </div>
                  </button>
                ))}
              </div>

              {isPaymentWidget ? (
                <div className={styles.builderFilter}>
                  <div className={styles.builderThemeHeader}>
                    <div>
                      <div className={styles.builderThemeTitle}>
                        Recipient details
                      </div>
                      <div className={styles.builderMeta}>
                        Fixed address, chain, and asset for payments.
                      </div>
                    </div>
                  </div>
                  <div className={styles.builderField}>
                    <label className={styles.builderLabel}>Payment amount</label>
                    <select
                      className={styles.builderInput}
                      value={paymentMode}
                      onChange={(event) =>
                        setPaymentMode(event.target.value as "pay" | "receive")
                      }
                    >
                      <option value="pay">Pay Fixed Amount</option>
                      <option value="receive">Receive Fixed Amount</option>
                    </select>
                    <div className={styles.builderHelper}>
                      Choose whether the payer or recipient amount is fixed.
                    </div>
                  </div>
                  <div className={styles.builderField}>
                    <label className={styles.builderLabel}>
                      Recipient address
                    </label>
                    <input
                      className={styles.builderInput}
                      value={recipientAddress}
                      onChange={(event) => setRecipientAddress(event.target.value)}
                      placeholder="0x..."
                    />
                  </div>
                  <div className={styles.builderField}>
                    <label className={styles.builderLabel}>
                      Recipient chain
                    </label>
                    <select
                      className={styles.builderInput}
                      value={toChain}
                      onChange={(event) => setToChain(event.target.value)}
                    >
                      {toChainOptions.map((chain) => (
                        <option key={chain.chain_uid} value={chain.chain_uid}>
                          {formatChainLabel(chain)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.builderField}>
                    <label className={styles.builderLabel}>
                      Recipient asset
                    </label>
                    <select
                      className={styles.builderInput}
                      value={tokenOut}
                      onChange={(event) => setTokenOut(event.target.value)}
                    >
                      {tokenOptions.map((token) => (
                        <option key={token.tokenId} value={token.tokenId}>
                          {formatTokenLabel(token)}
                        </option>
                      ))}
                    </select>
                  </div>
                  {paymentMode === "receive" ? (
                    <div className={styles.builderField}>
                      <label className={styles.builderLabel}>
                        Amount to receive
                      </label>
                      <input
                        className={styles.builderInput}
                        value={amountIn}
                        onChange={(event) =>
                          setAmountIn(
                            normalizeAmountInput(event.target.value, tokenOutDecimals)
                          )
                        }
                        placeholder="0.0"
                        inputMode="decimal"
                      />
                      <div className={styles.builderHelper}>
                        Fixed amount the recipient will receive.
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className={styles.builderFilter}>
                <div className={styles.builderThemeHeader}>
                  <div>
                    <div className={styles.builderThemeTitle}>Token filters</div>
                    <div className={styles.builderMeta}>
                      Limit the token list used by the widget.
                    </div>
                  </div>
                </div>
                <div className={styles.builderToggleRow}>
                  <div>
                    <div className={styles.builderToggleLabel}>
                      Verified tokens only
                    </div>
                    <div className={styles.builderHelper}>
                      Only show assets flagged as verified.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className={styles.builderSwitch}
                    checked={verifiedOnly}
                    onChange={(event) => setVerifiedOnly(event.target.checked)}
                    aria-label="Verified tokens only"
                  />
                </div>
                <div className={styles.builderField}>
                  <label className={styles.builderLabel}>Allowed chain type</label>
                  <select
                    className={styles.builderInput}
                    value={chainTypeFilter}
                    onChange={(event) =>
                      setChainTypeFilter(
                        event.target.value as "any" | "evm" | "cosmos"
                      )
                    }
                  >
                    <option value="any">Any chain type</option>
                    <option value="evm">EVM tokens only</option>
                    <option value="cosmos">Cosmos tokens only</option>
                  </select>
                  <div className={styles.builderHelper}>
                    Filter tokens by the chain type they belong to.
                  </div>
                </div>
              </div>
              {isPricingWidget ? (
                <div className={styles.builderFilter}>
                  <div className={styles.builderThemeHeader}>
                    <div>
                      <div className={styles.builderThemeTitle}>
                        Ticker settings
                      </div>
                      <div className={styles.builderMeta}>
                        Choose which tokens appear in the price list.
                      </div>
                    </div>
                  </div>
                  <details className={styles.builderDropdown}>
                    <summary className={styles.builderDropdownSummary}>
                      {pricingTokenFilter.length
                        ? `${pricingTokenFilter.length} selected`
                        : "All tokens"}
                    </summary>
                    <div className={styles.builderDropdownPanel}>
                      <input
                        className={styles.builderInput}
                        placeholder="Search tokens"
                        value={pricingTokenSearch}
                        onChange={(event) => setPricingTokenSearch(event.target.value)}
                      />
                      <label className={styles.builderCheckboxRow}>
                        <input
                          type="checkbox"
                          checked={pricingTokenFilter.length === 0}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setPricingTokenFilter([]);
                            }
                          }}
                        />
                        <span>All tokens</span>
                      </label>
                      <div className={styles.builderCheckboxList}>
                        {tokenOptions
                          .filter((token) => {
                            const query = pricingTokenSearch.trim().toLowerCase();
                            if (!query) {
                              return true;
                            }
                            const label = `${token.displayName ?? ""} ${token.tokenId ?? ""}`.toLowerCase();
                            return label.includes(query);
                          })
                          .map((token) => {
                            const checked = pricingTokenFilter.includes(token.tokenId);
                            return (
                              <label key={token.tokenId} className={styles.builderCheckboxRow}>
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() =>
                                    setPricingTokenFilter((prev) =>
                                      checked
                                        ? prev.filter((id) => id !== token.tokenId)
                                        : [...prev, token.tokenId]
                                    )
                                  }
                                />
                                <span>{formatTokenLabel(token)}</span>
                              </label>
                            );
                          })}
                      </div>
                    </div>
                  </details>
                  <div className={styles.builderHelper}>
                    Leave empty to show all tokens.
                  </div>
                </div>
              ) : null}

              <div className={styles.builderForm}>
                <div className={styles.builderThemeHeader}>
                  <div>
                    <div className={styles.builderThemeTitle}>Theme controls</div>
                    <div className={styles.builderMeta}>
                      Adjust colors for the widget preview and snippet.
                    </div>
                  </div>
                </div>
                <div className={styles.builderField}>
                  <label className={styles.builderLabel}>Accent</label>
                  <div className={styles.builderColorRow}>
                    <input
                      type="color"
                      className={styles.builderColorInput}
                      value={theme.accent}
                      onChange={(event) =>
                        setTheme((prev) => ({
                          ...prev,
                          accent: event.target.value,
                        }))
                      }
                    />
                    <input
                      className={styles.builderInput}
                      value={theme.accent}
                      onChange={(event) =>
                        setTheme((prev) => ({
                          ...prev,
                          accent: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className={styles.builderField}>
                  <label className={styles.builderLabel}>Surface</label>
                  <div className={styles.builderColorRow}>
                    <input
                      type="color"
                      className={styles.builderColorInput}
                      value={theme.surface}
                      onChange={(event) =>
                        setTheme((prev) => ({
                          ...prev,
                          surface: event.target.value,
                        }))
                      }
                    />
                    <input
                      className={styles.builderInput}
                      value={theme.surface}
                      onChange={(event) =>
                        setTheme((prev) => ({
                          ...prev,
                          surface: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className={styles.builderField}>
                  <label className={styles.builderLabel}>Panel</label>
                  <div className={styles.builderColorRow}>
                    <input
                      type="color"
                      className={styles.builderColorInput}
                      value={theme.panel}
                      onChange={(event) =>
                        setTheme((prev) => ({
                          ...prev,
                          panel: event.target.value,
                        }))
                      }
                    />
                    <input
                      className={styles.builderInput}
                      value={theme.panel}
                      onChange={(event) =>
                        setTheme((prev) => ({
                          ...prev,
                          panel: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className={styles.builderField}>
                  <label className={styles.builderLabel}>Text</label>
                  <div className={styles.builderColorRow}>
                    <input
                      type="color"
                      className={styles.builderColorInput}
                      value={theme.text}
                      onChange={(event) =>
                        setTheme((prev) => ({
                          ...prev,
                          text: event.target.value,
                        }))
                      }
                    />
                    <input
                      className={styles.builderInput}
                      value={theme.text}
                      onChange={(event) =>
                        setTheme((prev) => ({
                          ...prev,
                          text: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className={styles.builderField}>
                  <label className={styles.builderLabel}>Muted</label>
                  <div className={styles.builderColorRow}>
                    <input
                      type="color"
                      className={styles.builderColorInput}
                      value={theme.muted}
                      onChange={(event) =>
                        setTheme((prev) => ({
                          ...prev,
                          muted: event.target.value,
                        }))
                      }
                    />
                    <input
                      className={styles.builderInput}
                      value={theme.muted}
                      onChange={(event) =>
                        setTheme((prev) => ({
                          ...prev,
                          muted: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className={styles.builderField}>
                  <label className={styles.builderLabel}>Border</label>
                  <div className={styles.builderColorRow}>
                    <input
                      type="color"
                      className={styles.builderColorInput}
                      value={theme.border}
                      onChange={(event) =>
                        setTheme((prev) => ({
                          ...prev,
                          border: event.target.value,
                        }))
                      }
                    />
                    <input
                      className={styles.builderInput}
                      value={theme.border}
                      onChange={(event) =>
                        setTheme((prev) => ({
                          ...prev,
                          border: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.builderPanel}>
              <div className={styles.builderPreview}>
                {isPricingWidget ? (
                  <div className={styles.pricingWidget} style={previewStyle}>
                    <div className={styles.pricingHeader}>
                      <div>
                        <div className={styles.pricingTitle}>{widgetTitle}</div>
                        <div className={styles.pricingSubtitle}>
                          Live token prices
                        </div>
                      </div>
                      <div className={styles.pricingBadge}>Live</div>
                    </div>
                    {tokensError ? (
                      <div className={styles.pricingNotice}>
                        Token list unavailable. Showing defaults.
                      </div>
                    ) : null}
                    <div className={styles.pricingColumns}>
                      <span>Token</span>
                      <span>Price</span>
                      <span>24h</span>
                    </div>
                    <div className={styles.pricingList}>
                      {pricingTokens.map((token) => {
                        const priceValue = Number(token.price ?? "");
                        const rawChange = token.price_change_24h;
                        const changeValue =
                          typeof rawChange === "number"
                            ? rawChange
                            : Number(rawChange ?? "");
                        const hasChange = Number.isFinite(changeValue);
                        const isUp = hasChange ? changeValue >= 0 : true;
                        const initial = (
                          token.displayName ?? token.tokenId ?? ""
                        )
                          .slice(0, 1)
                          .toUpperCase();
                        return (
                          <div
                            key={token.tokenId}
                            className={styles.pricingRow}
                          >
                            <div className={styles.pricingToken}>
                              <span className={styles.pricingTokenIcon}>
                                {token.image ? (
                                  <img src={token.image} alt="" />
                                ) : (
                                  <span>{initial}</span>
                                )}
                              </span>
                              <div className={styles.pricingTokenInfo}>
                                <div className={styles.pricingTokenName}>
                                  {token.displayName ?? token.tokenId}
                                </div>
                                <div className={styles.pricingTokenSymbol}>
                                  {token.tokenId.toUpperCase()}
                                </div>
                              </div>
                            </div>
                            <div className={styles.pricingPrice}>
                              {formatPrice(priceValue)}
                            </div>
                            <div
                              className={clsx(
                                styles.pricingChange,
                                hasChange
                                  ? isUp
                                    ? styles.pricingChangeUp
                                    : styles.pricingChangeDown
                                  : styles.pricingChangeNeutral
                              )}
                            >
                              {hasChange
                                ? `${isUp ? "+" : ""}${changeValue.toFixed(2)}%`
                                : "--"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {pricingTotalPages > 1 ? (
                      <div className={styles.pricingPagination}>
                        <button
                          type="button"
                          className={styles.pricingPageButton}
                          onClick={() =>
                            setPricingPage((prev) => Math.max(0, prev - 1))
                          }
                          disabled={pricingPageSafe === 0}
                        >
                          Prev
                        </button>
                        <div className={styles.pricingPageIndicator}>
                          {pricingPageSafe + 1} / {pricingTotalPages}
                        </div>
                        <button
                          type="button"
                          className={styles.pricingPageButton}
                          onClick={() =>
                            setPricingPage((prev) =>
                              Math.min(pricingTotalPages - 1, prev + 1)
                            )
                          }
                          disabled={pricingPageSafe + 1 >= pricingTotalPages}
                        >
                          Next
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : isPaymentWidget ? (
                  <div className={styles.paymentWidget} style={previewStyle}>
                    <div className={styles.paymentHeader}>
                      <div>
                        <div className={styles.paymentTitle}>{widgetTitle}</div>
                        <div className={styles.paymentSubtitle}>
                          Stripe-like checkout powered by Euclid
                        </div>
                      </div>
                      <div className={styles.paymentBadge}>Testnet</div>
                    </div>
                    {tokensError ? (
                      <div className={styles.paymentNotice}>
                        Token list unavailable. Showing defaults.
                      </div>
                    ) : null}
                    {chainsError ? (
                      <div className={styles.paymentNotice}>
                        Chain list unavailable. Showing chain IDs only.
                      </div>
                    ) : null}
                    <div className={styles.paymentCard}>
                      <div className={styles.paymentLabelRow}>
                        <span>{amountLabel}</span>
                      </div>
                      {isReceiveFixed ? (
                        <div className={styles.paymentAmountRow}>
                          <input
                            className={styles.paymentAmountInput}
                            value={payAmountDisplay}
                            placeholder={quoteLoading ? "Estimating..." : "Estimated"}
                            readOnly
                          />
                          <TokenSelect
                            value={tokenIn}
                            options={tokenOptions}
                            disabled={tokensLoading}
                            label="Pay token"
                            onChange={handleTokenInChange}
                            formatLabel={formatTokenLabel}
                          />
                        </div>
                      ) : (
                        <div className={styles.paymentAmountRow}>
                          <input
                            className={styles.paymentAmountInput}
                            value={amountIn}
                            onChange={(event) =>
                              setAmountIn(
                                normalizeAmountInput(
                                  event.target.value,
                                  inputDecimals
                                )
                              )
                            }
                            placeholder="0.0"
                            inputMode="decimal"
                          />
                          <TokenSelect
                            value={tokenIn}
                            options={tokenOptions}
                            disabled={tokensLoading}
                            label="Pay token"
                            onChange={handleTokenInChange}
                            formatLabel={formatTokenLabel}
                          />
                        </div>
                      )}
                      <div className={styles.paymentChainRow}>
                        <span className={styles.paymentChainLabel}>
                          Pay from chain
                        </span>
                        <ChainSelect
                          value={fromChain}
                          options={fromChainOptions}
                          disabled={chainsLoading || !fromChainOptions.length}
                          label="Pay from chain"
                          onChange={setFromChain}
                          formatLabel={formatChainLabel}
                        />
                      </div>
                      <div className={styles.paymentHint}>{paymentHint}</div>
                    </div>
                    <button
                      type="button"
                      className={styles.paymentActionButton}
                      onClick={handleSwapAction}
                      disabled={actionDisabled}
                    >
                      {txLoading ? loadingLabel : actionLabel}
                    </button>
                    {quoteError ? (
                      <div className={styles.paymentError}>{quoteError}</div>
                    ) : null}
                    {txError ? (
                      <div className={styles.paymentError}>{txError}</div>
                    ) : null}
                    {demoTrackingVisible ? (
                      <div
                        className={styles.paymentOverlay}
                        data-status={demoOverlayState}
                      >
                        <div className={styles.paymentOverlayCard}>
                          {demoOverlayState === "success" ? (
                            <svg
                              className={styles.paymentSuccessIcon}
                              viewBox="0 0 52 52"
                              aria-hidden="true"
                            >
                              <circle
                                className={styles.paymentSuccessCircle}
                                cx="26"
                                cy="26"
                                r="25"
                              />
                              <path
                                className={styles.paymentSuccessCheck}
                                d="M14 27 L22 34 L38 18"
                              />
                            </svg>
                          ) : demoOverlayState === "failed" ? (
                            <svg
                              className={styles.paymentFailIcon}
                              viewBox="0 0 52 52"
                              aria-hidden="true"
                            >
                              <circle
                                className={styles.paymentFailCircle}
                                cx="26"
                                cy="26"
                                r="25"
                              />
                              <path
                                className={styles.paymentFailCross}
                                d="M17 17 L35 35 M35 17 L17 35"
                              />
                            </svg>
                          ) : (
                            <div className={styles.paymentSpinner} />
                          )}
                          <div className={styles.paymentOverlayTitle}>
                            {demoOverlayTitle}
                          </div>
                          <div className={styles.paymentOverlaySubtitle}>
                            {demoOverlaySubtitle}
                          </div>
                          {demoOverlayState === "loading" ? (
                            <div className={styles.paymentProgress}>
                              <span className={styles.paymentProgressFill} />
                            </div>
                          ) : null}
                          <div className={styles.paymentOverlayMeta}>
                            Demo tracking
                            {demoTrackingHashDisplay
                              ? ` · ${demoTrackingHashDisplay}`
                              : ""}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className={styles.swapWidget} style={previewStyle}>
                    <div className={styles.swapHeader}>
                      <div>
                        <div className={styles.swapTitle}>{widgetTitle}</div>
                        <div className={styles.swapSubtitle}>{widgetSubtitle}</div>
                      </div>
                      <div className={styles.swapBadge}>Testnet</div>
                    </div>
                    {tokensError ? (
                      <div className={styles.swapNotice}>
                        Token list unavailable. Showing defaults.
                      </div>
                    ) : null}
                    {chainsError ? (
                      <div className={styles.swapNotice}>
                        Chain list unavailable. Showing chain IDs only.
                      </div>
                    ) : null}
                    <div className={styles.swapBody}>
                      <div className={styles.swapCard}>
                        <div className={styles.swapRowHeader}>
                          <span>You pay</span>
                        </div>
                        <div className={styles.swapChainRow}>
                          <span className={styles.swapChainLabel}>From chain</span>
                          <ChainSelect
                            value={fromChain}
                            options={fromChainOptions}
                            disabled={chainsLoading || !fromChainOptions.length}
                            label="From chain"
                            onChange={setFromChain}
                            formatLabel={formatChainLabel}
                          />
                        </div>
                        <div className={styles.swapField}>
                          <TokenSelect
                            value={tokenIn}
                            options={tokenOptions}
                            disabled={tokensLoading}
                            label="Token in"
                            onChange={handleTokenInChange}
                            formatLabel={formatTokenLabel}
                          />
                          <input
                            className={styles.swapAmountInput}
                            value={amountIn}
                            onChange={(event) =>
                              setAmountIn(
                                normalizeAmountInput(event.target.value, tokenInDecimals)
                              )
                            }
                            placeholder="0.0"
                            inputMode="decimal"
                          />
                        </div>
                      </div>
                      {!isPaymentWidget ? (
                        <button
                          type="button"
                          className={styles.swapFlipButton}
                          onClick={handleFlipTokens}
                          aria-label="Flip tokens"
                        >
                          Swap
                        </button>
                      ) : null}
                      <div className={styles.swapCard}>
                        <div className={styles.swapRowHeader}>
                          <span>{recipientLabel}</span>
                          <span>
                            {tokenOutMeta ? formatTokenLabel(tokenOutMeta) : tokenOut}
                          </span>
                        </div>
                        <div className={styles.swapChainRow}>
                          <span className={styles.swapChainLabel}>
                            {toChainLabel}
                          </span>
                          <ChainSelect
                            value={toChain}
                            options={toChainOptions}
                            disabled={isPaymentWidget || chainsLoading || !toChainOptions.length}
                            label={toChainLabel}
                            onChange={setToChain}
                            formatLabel={formatChainLabel}
                          />
                        </div>
                        <div className={styles.swapField}>
                          <TokenSelect
                            value={tokenOut}
                            options={tokenOptions}
                            disabled={isPaymentWidget || tokensLoading}
                            label={tokenOutLabel}
                            onChange={handleTokenOutChange}
                            formatLabel={formatTokenLabel}
                          />
                          <input
                            className={clsx(
                              styles.swapAmountInput,
                              styles.swapAmountOutput
                            )}
                            value={amountOutDisplay}
                            placeholder={quoteLoading ? "Quoting..." : "Estimated"}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.swapFooter}>
                      <button
                        type="button"
                        className={styles.swapActionButton}
                        onClick={handleSwapAction}
                        disabled={actionDisabled}
                      >
                        {txLoading ? loadingLabel : walletActionLabel}
                      </button>
                      <div className={styles.swapMeta} aria-live="polite">
                        <div className={styles.swapMetaRow}>
                          <span>{resultLabel}</span>
                          <span>{amountOutDisplay || "--"}</span>
                        </div>
                        {metaRows.map((row) => (
                          <div key={row.label} className={styles.swapMetaRow}>
                            <span>{row.label}</span>
                            <span>{row.value}</span>
                          </div>
                        ))}
                        {quoteError ? (
                          <div className={styles.swapError}>{quoteError}</div>
                        ) : null}
                        {txError ? (
                          <div className={styles.swapError}>{txError}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.builderSnippet}>
                <div className={styles.builderSnippetHeader}>
                  <div>
                    <div className={styles.builderSnippetTitle}>
                      React snippet
                    </div>
                    <div className={styles.builderMeta}>
                      Testnet endpoints only. No API key required.
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.builderCopyButton}
                    onClick={handleCopy}
                  >
                    {copied ? "Copied" : "Copy Snippet"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
