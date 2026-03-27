import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
// import { CustomSearch } from "./src/components/CustomSearch";

const config: Config = {
  title: "Euclid Protocol",
  tagline: "Modular, Accessible, Unified Liquidity Layer",
  favicon: "img/star.png",

  // Set the production url of your site here
  url: "https://docs.euclidprotocol.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "EuclidProtocol", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },

        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  themeConfig: {
    metadata: [
      { name: "image", content: "/img/EuclidLogo.svg" },
      { property: "og:image", content: "/img/EuclidLogo.svg" },
      // Image for social preview
    ],
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
    },
    // Replace with your project's social card
    image: "img/EuclidLogo.svg",
    navbar: {
      title: "",
      logo: {
        alt: "My Site Logo",
        src: "img/logo_black.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "architectureSidebar",
          position: "left",
          label: "Learn",
        },
        {
          type: "docSidebar",
          sidebarId: "orderbookSidebar",
          position: "left",
          label: "Orderbook",
        },
        {
          type: "dropdown",
          sidebarId: "contractsSidebar",
          position: "left",
          label: "Smart Contracts",
          items: [
            {
              label: "Cosmwasm",
              to: "/docs/Euclid%20Smart%20Contracts/CosmWasm/overview",
            },
            {
              label: "Solidity",
              to: "/docs/Euclid%20Solidity%20Contracts/Solidity/overview",
            },
          ],
        },

        {
          type: "docSidebar",
          sidebarId: "widgetsSidebar",
          position: "left",
          label: "Widgets",
        },

        {
          type: "docSidebar",
          sidebarId: "apiSidebar",
          position: "left",
          label: "API",
        },

        {
          href: "https://github.com/EuclidProtocol",
          label: "GitHub",
          position: "right",
          className: "navCta",
        },

        // {
        //   type: "custom",
        //   position: "right",
        //   component: CustomSearch, // Use your custom search component
        // },
      ],
    },
    footer: {
      style: "light",

      links: [
        {
          items: [
            {
              html: `
              <div style="display:flex; align-items:center; justify-content:flex-start;">
                <img src="/img/logo-last.png" alt="Euclid logo" style="width: 180px; height: auto;" />
              </div>
            `,
            },
          ],
        },
        {
          title: "Apps",
          items: [
            {
              label: "Euclid Swap",
              href: "https://testnet.euclidswap.io/",
            },
            {
              label: "Euclid Launch",
              href: "https://launch.euclidprotocol.io/",
            },
            {
              label: "Planet Euclid",
              href: "https://planet.euclidprotocol.io/",
            },
            {
              label: "Euclid Scan",
              href: "https://scan.euclidprotocol.io/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Telegram",
              href: "https://t.me/Euclid_Protocol",
            },
            {
              label: "Twitter",
              href: "https://x.com/EuclidProtocol",
            },
            {
              label: "Blog",
              href: "https://blog.euclidprotocol.io/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Website",
              href: "https://www.euclidprotocol.io/",
            },
            {
              label: "GitHub",
              href: "https://github.com/EuclidProtocol",
            },
            {
              label: "Contact Us",
              href: "mailto:general@euclidswap.io",
            },
            {
              label: "LLM Guide",
              to: "/docs/llms",
            },
            {
              label: "LLMs.txt",
              href: "/llms.txt",
              target: "_blank",
              rel: "noopener noreferrer",
            },
            {
              label: "Terms of Service",
              to: "/docs/terms", 
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Euclid Development, Inc. All Rights Reserved.`,
    },
    prism: {
      theme: prismThemes.vsLight,
      darkTheme: prismThemes.vsLight,
    },
  } satisfies Preset.ThemeConfig,

  // Add the lunr search plugin configuration
  plugins: [
    [
      require.resolve("docusaurus-lunr-search"),
      {
        // Optional: Add additional Lunr.js options here
      },
    ],
  ],

  themes: [
    require.resolve("@docusaurus/theme-mermaid"),
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        // ```
      },
    ],
  ],
};

export default config;
