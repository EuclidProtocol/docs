import Layout from "@theme/Layout";
import WidgetBuilder from "@site/src/components/WidgetBuilder";

export default function WidgetPage(): JSX.Element {
  return (
    <Layout
      title="Widget Builder"
      description="Build a Euclid swap or quote widget with testnet endpoints."
    >
      <main>
        <WidgetBuilder />
      </main>
    </Layout>
  );
}
