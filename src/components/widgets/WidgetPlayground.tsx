// src/components/widgets/WidgetPlayground.tsx
import React, { useState } from "react";
import { SwapWidget } from "./SwapWidget";
import { PaymentWidget } from "./PaymentWidget";
import { PricingWidget } from "./PricingWidget";
import { QuoteWidget } from "./QuoteWidget";
import type { WidgetTheme } from "./shared/types";

type WidgetType = "swap" | "payment" | "pricing" | "quote";

const WIDGETS: { id: WidgetType; label: string; description: string }[] = [
  { id: "swap", label: "Swap Widget", description: "Full cross-chain swap with token picker and quote" },
  { id: "payment", label: "Payment Widget", description: "Fixed-recipient payment flow" },
  { id: "pricing", label: "Pricing Widget", description: "Live token price ticker with 24h/7d change" },
  { id: "quote", label: "Quote Widget", description: "Read-only price display for a token pair" },
];

export function WidgetPlayground() {
  const [active, setActive] = useState<WidgetType>("swap");
  const [accent, setAccent] = useState("#092322");
  const [surface, setSurface] = useState("#ffffff");
  const [panel, setPanel] = useState("#f2f4f6");

  const theme: Partial<WidgetTheme> = { accent, surface, panel };
  const docsLinks: Record<WidgetType, string> = {
    swap: "/docs/Widgets/swap-widget",
    payment: "/docs/Widgets/payment-widget",
    pricing: "/docs/Widgets/pricing-widget",
    quote: "/docs/Widgets/quote-widget",
  };

  return (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" as const }}>
      {/* Left: Controls */}
      <div style={{ flex: "0 0 280px", display: "flex", flexDirection: "column" as const, gap: "1.25rem" }}>
        {/* Widget selector */}
        <div>
          <div style={{ fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.9rem" }}>Widget</div>
          {WIDGETS.map((w) => (
            <button
              key={w.id}
              onClick={() => setActive(w.id)}
              style={{
                display: "block", width: "100%", textAlign: "left" as const,
                padding: "0.65rem 0.875rem", marginBottom: "0.35rem",
                borderRadius: "10px", border: "1px solid",
                borderColor: active === w.id ? accent : "rgba(17,24,28,0.12)",
                background: active === w.id ? `${accent}12` : "#fff",
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              <div style={{ fontWeight: 500, fontSize: "0.875rem" }}>{w.label}</div>
              <div style={{ fontSize: "0.75rem", color: "#4b5563", marginTop: "0.1rem" }}>{w.description}</div>
            </button>
          ))}
        </div>

        {/* Theme controls */}
        <div>
          <div style={{ fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.9rem" }}>Theme</div>
          {[
            { label: "Accent", value: accent, set: setAccent },
            { label: "Surface", value: surface, set: setSurface },
            { label: "Panel", value: panel, set: setPanel },
          ].map(({ label, value, set }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
              <input type="color" value={value} onChange={(e) => set(e.target.value)} style={{ width: "32px", height: "32px", border: "none", borderRadius: "6px", cursor: "pointer" }} />
              <span style={{ fontSize: "0.875rem" }}>{label}</span>
              <code style={{ fontSize: "0.75rem", color: "#4b5563", marginLeft: "auto" }}>{value}</code>
            </div>
          ))}
        </div>

        {/* Docs link */}
        <a
          href={docsLinks[active]}
          style={{ display: "block", textAlign: "center" as const, padding: "0.6rem 1rem", borderRadius: "999px", background: accent, color: "#fff", textDecoration: "none", fontWeight: 500, fontSize: "0.875rem" }}
        >
          View docs & copy code →
        </a>
      </div>

      {/* Right: Preview */}
      <div style={{ flex: 1, minWidth: "320px" }}>
        <div style={{ fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem", color: "#4b5563" }}>
          Preview
        </div>
        {active === "swap" && (
          <SwapWidget
            defaultTokenIn="euclid"
            defaultTokenOut="usdc"
            theme={theme}
            onSwapReady={(p) => console.log("Swap payload:", p)}
          />
        )}
        {active === "payment" && (
          <PaymentWidget
            recipientAddress="0x1234567890abcdef1234567890abcdef12345678"
            recipientChainUid="bsc"
            tokenOut="euclid"
            theme={theme}
            onPaymentReady={(p) => console.log("Payment payload:", p)}
          />
        )}
        {active === "pricing" && <PricingWidget theme={theme} pageSize={6} />}
        {active === "quote" && <QuoteWidget tokenIn="euclid" tokenOut="usdc" theme={theme} />}
      </div>
    </div>
  );
}
