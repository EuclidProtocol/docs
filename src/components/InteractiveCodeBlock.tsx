import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import CodeBlock from "@theme/CodeBlock";
import styles from "./InteractiveCodeBlock.module.css";

type Props = {
  code: string;
  language: string;
  title?: string;
  label?: string;
  className?: string;
};

const DEFAULT_GRAPHQL_ENDPOINT = "https://api.euclidprotocol.com/graphql";

type ParsedCurl = {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
  error?: string;
};

const isGraphqlLanguage = (language: string) =>
  ["graphql", "gql"].includes(language);

const isCurlCommand = (language: string, code: string) => {
  if (!["bash", "sh", "shell"].includes(language)) {
    return false;
  }
  return /\bcurl\b/.test(code);
};

const stripQuotes = (value: string) => {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
};

const tokenize = (input: string) => {
  const tokens = input.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g);
  if (!tokens) {
    return [];
  }
  return tokens.map((token) => stripQuotes(token));
};

const parseCurl = (command: string): ParsedCurl => {
  const compact = command.replace(/\\\r?\n/g, " ").trim();
  const tokens = tokenize(compact);

  if (tokens.length === 0 || tokens[0] !== "curl") {
    return { url: "", method: "GET", headers: {}, error: "Not a curl command." };
  }

  let method = "GET";
  let url = "";
  let body = "";
  const headers: Record<string, string> = {};

  for (let i = 1; i < tokens.length; i += 1) {
    const token = tokens[i];

    if (token === "-X" || token === "--request") {
      const next = tokens[i + 1];
      if (next) {
        method = next.toUpperCase();
        i += 1;
      }
      continue;
    }

    if (token === "--url") {
      const next = tokens[i + 1];
      if (next) {
        url = next;
        i += 1;
      }
      continue;
    }

    if (token === "-H" || token === "--header") {
      const next = tokens[i + 1];
      if (next) {
        const [key, ...rest] = next.split(":");
        if (key) {
          headers[key.trim()] = rest.join(":").trim();
        }
        i += 1;
      }
      continue;
    }

    if (
      token === "-d" ||
      token === "--data" ||
      token === "--data-raw" ||
      token === "--data-binary" ||
      token === "--data-urlencode"
    ) {
      const next = tokens[i + 1];
      if (next) {
        body = next;
        if (method === "GET") {
          method = "POST";
        }
        i += 1;
      }
      continue;
    }

    if (!token.startsWith("-") && !url && token.startsWith("http")) {
      url = token;
    }
  }

  if (!url) {
    return { url: "", method, headers, error: "No URL found in curl command." };
  }

  return { url, method, headers, body };
};

const formatResponse = async (response: Response) => {
  const text = await response.text();
  try {
    const json = JSON.parse(text);
    return {
      language: "json",
      text: JSON.stringify(json, null, 2),
    };
  } catch (err) {
    return { language: "text", text };
  }
};

export default function InteractiveCodeBlock({
  code,
  language,
  title,
  label,
  className,
}: Props) {
  const [apiKey, setApiKey] = useState("");
  const [endpoint, setEndpoint] = useState(DEFAULT_GRAPHQL_ENDPOINT);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const [response, setResponse] = useState<{ text: string; language: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const trimmedCode = useMemo(() => code.trim(), [code]);
  const graphql = isGraphqlLanguage(language);
  const curl = isCurlCommand(language, trimmedCode);
  const supportsRun = graphql || curl;
  const labelText = label ?? "Try it";

  useEffect(() => {
    setResponse(null);
    setStatus(null);
    setError(null);
    setLoading(false);
  }, [trimmedCode, language]);

  const runRequest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setStatus(null);

    try {
      if (graphql) {
        const headers: Record<string, string> = {
          "content-type": "application/json",
        };
        if (apiKey) {
          headers.authorization = `Bearer ${apiKey}`;
        }

        const res = await fetch(endpoint, {
          method: "POST",
          headers,
          body: JSON.stringify({ query: trimmedCode }),
        });
        const formatted = await formatResponse(res);
        setStatus(res.status);
        setResponse(formatted);
        return;
      }

      if (curl) {
        const parsed = parseCurl(trimmedCode);
        if (parsed.error) {
          setError(parsed.error);
          return;
        }

        const headers = new Headers(parsed.headers);
        if (parsed.body && !headers.has("content-type")) {
          headers.set("content-type", "application/json");
        }
        if (apiKey && !headers.has("authorization")) {
          headers.set("authorization", `Bearer ${apiKey}`);
        }

        const res = await fetch(parsed.url, {
          method: parsed.method,
          headers,
          body: parsed.body || undefined,
        });
        const formatted = await formatResponse(res);
        setStatus(res.status);
        setResponse(formatted);
        return;
      }

      setError("This block does not support execution.");
    } catch (err) {
      setError("Request failed. Check CORS and endpoint availability.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.toolbar}>
        <div className={styles.label}>{labelText}</div>
        {supportsRun && (
          <button
            className={styles.runButton}
            type="button"
            onClick={runRequest}
            disabled={loading}
          >
            {loading ? "Running..." : "Run"}
          </button>
        )}
      </div>
      {supportsRun && (
        <div className={styles.inputs}>
          {graphql && (
            <label className={styles.inputGroup}>
              Endpoint
              <input
                className={styles.input}
                type="url"
                value={endpoint}
                onChange={(event) => setEndpoint(event.target.value)}
              />
            </label>
          )}
          <label className={styles.inputGroup}>
            API key (optional)
            <input
              className={styles.input}
              type="password"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              placeholder="Bearer token"
            />
          </label>
        </div>
      )}
      <div className={styles.codeBlock}>
        <CodeBlock language={language} title={title}>
          {trimmedCode}
        </CodeBlock>
      </div>
      {(response || error) && (
        <div className={styles.response}>
          <div className={styles.responseHeader}>
            Response
            {status !== null && <span className={styles.status}>HTTP {status}</span>}
          </div>
          {error ? (
            <div className={styles.error}>{error}</div>
          ) : response ? (
            <CodeBlock language={response.language}>{response.text}</CodeBlock>
          ) : null}
        </div>
      )}
    </div>
  );
}
