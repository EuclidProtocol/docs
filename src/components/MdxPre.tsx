import React, { Children, isValidElement, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCheck, FaCopy } from "react-icons/fa";

type PreProps = React.HTMLAttributes<HTMLPreElement> & {
  children?: React.ReactNode;
  originalPre?: React.ElementType;
};

const CURL_LANGUAGES = new Set(["language-bash", "language-sh", "language-shell"]);
const CURL_COMMAND_PATTERN = /^\s*curl(?:\s|\\|$)/m;

function getCodeChild(children: React.ReactNode) {
  const childArray = Children.toArray(children);
  const firstChild = childArray[0];
  if (!isValidElement(firstChild)) {
    return null;
  }
  return firstChild;
}

function getCodeText(children: React.ReactNode) {
  if (typeof children === "string") {
    return children.trimEnd();
  }
  if (Array.isArray(children)) {
    return children
      .map((child) => (typeof child === "string" ? child : ""))
      .join("")
      .trimEnd();
  }
  return "";
}

export default function MdxPre(props: PreProps) {
  const [copied, setCopied] = useState(false);
  const { originalPre: OriginalPre = "pre", ...restProps } = props;
  const codeChild = getCodeChild(props.children);

  if (!codeChild) {
    return <OriginalPre {...restProps} />;
  }

  const className =
    typeof codeChild.props.className === "string" ? codeChild.props.className : "";
  const code = getCodeText(codeChild.props.children);
  const isCurlBlock =
    Array.from(CURL_LANGUAGES).some((language) => className.includes(language)) &&
    CURL_COMMAND_PATTERN.test(code);

  if (!isCurlBlock) {
    return <OriginalPre {...restProps} />;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy cURL block", error);
    }
  };

  return (
    <div
      className="theme-code-block mdx-curl-block"
      style={{ position: "relative" }}
    >
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code"
        style={{
          position: "absolute",
          top: "0.8rem",
          right: "0.8rem",
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2rem",
          height: "2rem",
          border: "1px solid var(--euclid-line)",
          borderRadius: "999px",
          background: "rgba(255, 255, 255, 0.8)",
          color: "var(--euclid-text)",
          cursor: "pointer",
        }}
      >
        {copied ? <FaCheck /> : <FaCopy />}
      </button>
      <SyntaxHighlighter
        language="bash"
        style={coldarkCold}
        customStyle={{
          margin: 0,
          padding: "1.1rem 1.25rem",
          maxHeight: "420px",
          overflow: "auto",
          background: "var(--euclid-surface)",
          border: "1px solid var(--euclid-line)",
          borderRadius: "14px",
          boxShadow: "0 12px 30px rgba(17, 24, 28, 0.04)",
          fontSize: "0.95rem",
          lineHeight: 1.7,
        }}
        codeTagProps={{
          style: {
            fontFamily: "var(--ifm-font-family-monospace)",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
