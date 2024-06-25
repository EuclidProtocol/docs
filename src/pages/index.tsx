import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero ", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx("text-white", styles.headingMain)}>
          {siteConfig.title}
        </Heading>
        <p className={clsx("text-white sub-heading", styles.headingSub)}>
          {siteConfig.tagline}
        </p>
        <div className={clsx("text-white", styles.buttons)}>
          <Link
            className={clsx("button btn-main button--secondary button--lg")}
            to="/docs/intro"
          >
            Explore Docs!
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title.toUpperCase()}`}
      description="The Official Docs for euclid protocol"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
