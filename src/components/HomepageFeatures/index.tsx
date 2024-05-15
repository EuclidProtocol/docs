import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
  link?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Integrate",
    Svg: require("@site/static/img/integrate_dark.svg").default,
    description: (
      <>
        Euclid API was designed from the ground up to easily be integrated into
        your application and get it running up quickly.
      </>
    ),
  },
  {
    title: "Permissionless",
    Svg: require("@site/static/img/permissionless_dark.svg").default,
    description: (
      <>
        Euclid can be integrated instantly into smart contracts or an interface
        without requiring any payment or key.
      </>
    ),
  },
  {
    title: "Modular",
    Svg: require("@site/static/img/modular.svg").default,
    description: (
      <>
        Euclid can be integrated on a smart contract level on different
        blockchains, or using Euclid’s API on any interface.
      </>
    ),
  },
];

const FeatureList2: FeatureItem[] = [
  {
    title: "Learn The Basics",
    Svg: require("@site/static/img/learn.svg").default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
    link: "docs/category/basics",
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md ">
        <Heading as="h3" className="heading-main">
          {title}
        </Heading>
        <p className="text-white font-secondary">{description}</p>
      </div>
    </div>
  );
}

function Feature2({ title, Svg, description, link }: FeatureItem) {
  return (
    <div className={clsx("col col--4 card")}>
      <Link href={link}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3" className="heading-main">
            {title}
          </Heading>
          <p className="text-white font-secondary">{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
      <section className={styles.features}>
        <div className={styles.started}>Getting Started</div>
      </section>
      <section className={styles.features}>
        <div className="container bottomContainer">
          <div className={clsx("row", styles.bottomRow)}>
            {FeatureList2.map((props, idx) => (
              <Feature2 key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
