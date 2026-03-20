// src/pages/widget-playground.tsx
import React from "react";
import Layout from "@theme/Layout";
import { WidgetPlayground } from "@site/src/components/widgets/WidgetPlayground";

export default function WidgetPlaygroundPage() {
  return (
    <Layout title="Widget Playground" description="Preview and configure Euclid widgets">
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <h1 style={{ fontWeight: 600, marginBottom: "0.35rem" }}>Widget Playground</h1>
        <p style={{ color: "#4b5563", marginBottom: "2.5rem" }}>
          Preview and configure any Euclid widget. When you're happy, head to the docs to copy the code.
        </p>
        <WidgetPlayground />
      </div>
    </Layout>
  );
}
