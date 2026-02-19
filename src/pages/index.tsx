import { useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import InteractiveCodeBlock from "@site/src/components/InteractiveCodeBlock";

import styles from "./index.module.css";

function HomepageHeader() {
  const quickLinks = [
    {
      title: "Payments & Swaps",
      links: [
        { label: "Get Routes", to: "/docs/API/API%20Reference/REST/Routes/Get%20Routes" },
        { label: "Perform a Swap", to: "/docs/API/Getting%20Started/Perform%20A%20Swap" },
        { label: "Track Transactions", to: "/docs/API/API%20Reference/REST/Transactions/Tracking/Track%20Transactions" },
      ],
    },
    {
      title: "Architecture",
      links: [
        { label: "Architecture Overview", to: "/docs/Architecture%20Overview/intro" },
        { label: "Liquidity Consensus", to: "/docs/Architecture%20Overview/Concepts/Liquidity%20Consensus%20Layer" },
        { label: "Virtual Settlement Layer", to: "/docs/Architecture%20Overview/Architecture/Virtual%20Settlement%20Layer/virtual-settlement-layer" },
      ],
    },
    {
      title: "Smart Contracts",
      links: [
        { label: "CosmWasm Overview", to: "/docs/Euclid%20Smart%20Contracts/CosmWasm/overview" },
        { label: "Solidity Overview", to: "/docs/Euclid%20Solidity%20Contracts/Solidity/overview" },
        { label: "Escrow Contract", to: "/docs/Euclid%20Smart%20Contracts/CosmWasm/Escrow" },
      ],
    },
  ];

  const highlights = [
    {
      title: "Easy to integrate",
      description:
        "Euclid APIs are designed to plug into production apps with minimal overhead.",
      imgSrc: "/img/integrate_dark.png",
    },
    {
      title: "Permissionless by default",
      description:
        "Integrate instantly on-chain or in an interface without access gating.",
      imgSrc: "/img/permissionless_dark.png",
    },
    {
      title: "Modular architecture",
      description:
        "Compose liquidity, routing, and settlement across chains and protocols.",
      imgSrc: "/img/modular_dark.png",
    },
  ];

  const tryActions = [
    {
      label: "Get Routes",
      to: "/docs/API/API%20Reference/REST/Routes/Get%20Routes",
      kind: "REST",
      language: "bash",
      code: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/routes' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "external": true,
    "token_in": "euclid",
    "token_out": "0g",
    "amount_in": "1000000",
    "chain_uids": []
  }'`,
    },
    {
      label: "Simulate Swap",
      to: "/docs/API/API%20Reference/REST/Transactions/Simulate%20Swap",
      kind: "REST",
      language: "bash",
      code: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/simulate-swap' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
  "amount_in": "10",
  "asset_in": "fundenom",
  "asset_out": "nibi",
  "contract": "nibi1vndyr364cmexy3qq8zx4x2v757purq4flt9mj4qe3z2s2wn29v5sdfc830",
  "min_amount_out": "1",
  "swaps": ["fundenom","nibi"]
}'`,
    },
    {
      label: "Create Pool",
      to: "/docs/API/API%20Reference/REST/Transactions/Liquidity/Create%20Pool",
      kind: "REST",
      language: "bash",
      code: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/execute/pool/create' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "sender": {
      "chain_uid": "nibiru",
      "address": "nibi1l0wgje0y43007xpdqkuxaxluffuxj7fy7eccns"
    },
    "pair": {
      "token_1": {
        "token": "usdt",
        "token_type": {
          "native": {
            "denom": "uusdt"
          }
        },
        "amount": "1000000"
      },
      "token_2": {
        "token": "euclid",
        "token_type": {
          "smart": {
            "contract_address": "nibi17zymknww0ynlgtad22dzgy6kp6qzeg28gmvm5aq32avf9248rvasxtgxuv"
          }
        },
        "amount": "500000"
      }
    },
    "lp_token_name": "USDT.EUCLID",
    "lp_token_decimal": 6,
    "lp_token_symbol": "USDTEUCLID",
    "timeout": "3600",
    "slippage_tolerance_bps": 100
}'`,
    },
    {
      label: "Withdraw Voucher",
      to: "/docs/API/API%20Reference/REST/Transactions/Vouchers/Withdraw%20Virtual%20Balance",
      kind: "REST",
      language: "bash",
      code: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/execute/vcoin/withdraw' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "token": "euclid",
    "amount": "1000000",
    "sender": {
      "address": "inj1epptslyy5mlvr4m238v0z0954nf9m6lly7v7pu",
      "chain_uid": "injective"
    },
    "cross_chain_addresses": [
      {
        "user": {
          "address": "osmo1468tkm9zh0fl8ragatwjuwz0v065zssadrunml",
          "chain_uid": "osmosis"
        },
        "limit": {
          "less_than_or_equal": "1000000"
        }
      }
    ]
}'`,
    },
  ];

  const [activeAction, setActiveAction] = useState(tryActions[0]);

  return (
    <>
      <header className={clsx("hero", styles.heroBanner)}>
        <div className={clsx("container", styles.heroInner)}>
          <div className={styles.heroLeft}>
            <div className={styles.heroLabel}>Documentation</div>
            <Heading as="h1" className={styles.heroTitle}>
              Euclid Protocol Docs
            </Heading>
            <p className={styles.heroSubtitle}>
              Explore guides, API references, and architecture notes to integrate
              Euclid&apos;s unified liquidity layer into your product.
            </p>
            <div className={styles.heroActions}>
              <Link
                className={clsx("button button--primary button--lg btn-main")}
                to="/docs/Architecture%20Overview/intro"
              >
                Get started
              </Link>
              <Link className={styles.heroSecondaryLink} to="/docs/API/Getting%20Started/API%20Prerequisites%20and%20Chain%20Configuration">
                Explore the API
              </Link>
            </div>
          </div>
          <div className={styles.heroRight}>
            <img
              className={styles.heroRightImage}
              src="/img/euclid_lock.jpg"
              alt="Euclid lock illustration"
            />
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className="container">
          <Heading as="h2" className={styles.sectionTitle}>
            Start building with Euclid
          </Heading>
          <p className={styles.sectionSubtitle}>
            Navigate the docs by workflow, protocol layer, or smart contract
            integration.
          </p>
          <div className={styles.linkColumns}>
            {quickLinks.map((group) => (
              <div key={group.title} className={styles.linkColumn}>
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map((item) => (
                    <li key={item.label}>
                      <Link to={item.to}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.highlightRow}>
            <Heading as="h3" className={styles.highlightTitle}>
              Why teams choose Euclid
            </Heading>
            <div className={styles.highlightGrid}>
              {highlights.map((item) => (
                <div key={item.title} className={styles.highlightCard}>
                  <img
                    src={item.imgSrc}
                    alt=""
                    className={styles.highlightIcon}
                  />
                  <div>
                    <div className={styles.highlightHeading}>{item.title}</div>
                    <p className={styles.highlightText}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={styles.tryHeader}>
            <Heading as="h2" className={styles.sectionTitle}>
              Try it out
            </Heading>
            <p className={styles.sectionSubtitle}>
              Use the REST API to simulate swaps and build routing flows.
            </p>
          </div>
          <div className={styles.tryGrid}>
            <div className={styles.tryList}>
              <div className={styles.tryListTitle}>Quick actions</div>
              <ul>
                {tryActions.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      className={clsx(
                        styles.tryItemButton,
                        item.label === activeAction.label && styles.active
                      )}
                      onClick={() => setActiveAction(item)}
                      aria-pressed={item.label === activeAction.label}
                    >
                      <span>{item.label}</span>
                      <span className={styles.tryItemMeta}>{item.kind}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <Link className={styles.tryFooterLink} to={activeAction.to}>
                View docs for {activeAction.label}
              </Link>
            </div>
            <InteractiveCodeBlock
              code={activeAction.code}
              language={activeAction.language}
              label="Request"
              className={styles.tryRunner}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="The Official Docs For Euclid Protocol"
    >
      <HomepageHeader />
    </Layout>
  );
}
