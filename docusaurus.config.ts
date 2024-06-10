import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { CustomSearch } from "./src/components/CustomSearch";

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
    colorMode: {
      defaultMode: "dark", // Set dark mode as default
      disableSwitch: true, // Disable the option to switch between light and dark modes
    },
    // Replace with your project's social card
    image: "img/EuclidLogo.svg",
    navbar: {
      style: "dark",
      title: "",
      logo: {
        alt: "My Site Logo",
        src: "img/EuclidLogo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Introduction",
        },

        {
          href: "https://github.com/EuclidProtocol/docs",
          label: "GitHub",
          position: "right",
        },

        // {
        //   type: "custom",
        //   position: "right",
        //   component: CustomSearch, // Use your custom search component
        // },
      ],
    },
    footer: {
      style: "dark",

      links: [
        {
          items: [
            {
              html: `
              <img src="/img/EuclidLogo.svg" alt="Logo" style="width: 150px; height: auto;" />
            `,
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
              label: "Medium",
              href: "https://euclidprotocol.medium.com/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "App",
              href: "https://www.euclidprotocol.io/",
            },
            {
              label: "Website",
              href: "https://www.euclidprotocol.io/",
            },
            {
              label: "GitHub",
              href: "https://github.com/EuclidProtocol/docs",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Euclid Development, Inc. All Rights Reserved.`,
    },
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
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
};

export default config;
