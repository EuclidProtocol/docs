import React from "react";
import OriginalMDXComponents from "@theme-original/MDXComponents";
import MdxPre from "@site/src/components/MdxPre";

const OriginalPre = OriginalMDXComponents.pre ?? "pre";

export default {
  ...OriginalMDXComponents,
  pre: (props: React.ComponentProps<"pre">) => (
    <MdxPre {...props} originalPre={OriginalPre} />
  ),
};
