import fs from "node:fs/promises";
import path from "node:path";

const ROOT = "/Users/danielwehbe/Documents/euclid-docs-2/docs/docs/API";
const OUTPUT = "/tmp/euclid-api-curl-validation.json";
const TIMEOUT_MS = 20000;

const FILE_EXTENSIONS = new Set([".md", ".mdx", ".ts", ".tsx", ".js", ".jsx"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }
    if (FILE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractBlocks(content) {
  const blocks = [];

  const fenceRegex = /```(?:bash|sh|shell)\n([\s\S]*?)```/g;
  for (const match of content.matchAll(fenceRegex)) {
    blocks.push(match[1]);
  }

  const templateRegex = /content:\s*`([\s\S]*?)`/g;
  for (const match of content.matchAll(templateRegex)) {
    if (match[1].includes("curl")) {
      blocks.push(match[1]);
    }
  }

  return blocks;
}

function splitCommands(block) {
  const start = block.indexOf("curl");
  if (start === -1) {
    return [];
  }

  const command = block
    .slice(start)
    .split("\n")
    .filter((line) => !line.trim().startsWith("#"))
    .join("\n")
    .trim();

  return command ? [command] : [];
}

function stripOuterQuotes(value) {
  if (
    (value.startsWith("'") && value.endsWith("'")) ||
    (value.startsWith('"') && value.endsWith('"'))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function tokenize(command) {
  const normalized = command
    .replace(/\\\r?\n/g, " ")
    .replace(/\\\\\r?\n/g, " ")
    .replace(/\\"/g, '"')
    .trim();

  const tokens = [];
  let current = "";
  let quote = null;

  for (let i = 0; i < normalized.length; i += 1) {
    const ch = normalized[i];

    if (quote) {
      if (ch === quote) {
        quote = null;
      } else {
        current += ch;
      }
      continue;
    }

    if (ch === "'" || ch === '"') {
      quote = ch;
      continue;
    }

    if (/\s/.test(ch)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      continue;
    }

    current += ch;
  }

  if (current) {
    tokens.push(current);
  }

  return tokens.map(stripOuterQuotes);
}

function parseCurl(command) {
  const tokens = tokenize(command);
  if (tokens.length === 0 || tokens[0] !== "curl") {
    return { error: "not a curl command" };
  }

  let method = "GET";
  let url = "";
  let body = undefined;
  const headers = {};

  for (let i = 1; i < tokens.length; i += 1) {
    const token = tokens[i];

    if (token === "-X" || token === "--request") {
      method = (tokens[i + 1] || method).toUpperCase();
      i += 1;
      continue;
    }

    if (token === "--url") {
      url = tokens[i + 1] || url;
      i += 1;
      continue;
    }

    if (token === "-H" || token === "--header") {
      const header = tokens[i + 1] || "";
      const idx = header.indexOf(":");
      if (idx > -1) {
        headers[header.slice(0, idx).trim()] = header.slice(idx + 1).trim();
      }
      i += 1;
      continue;
    }

    if (
      token === "-d" ||
      token === "--data" ||
      token === "--data-raw" ||
      token === "--data-binary" ||
      token === "--data-urlencode"
    ) {
      body = tokens[i + 1] || body;
      if (method === "GET") {
        method = "POST";
      }
      i += 1;
      continue;
    }

    if (!token.startsWith("-") && token.startsWith("http") && !url) {
      url = token;
    }
  }

  if (!url) {
    return { error: "missing URL" };
  }

  return { method, url, headers, body };
}

async function runRequest(parsed) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(parsed.url, {
      method: parsed.method,
      headers: parsed.headers,
      body: parsed.body,
      signal: controller.signal,
    });

    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      bodyPreview: text.slice(0, 500),
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      error: error.name === "AbortError" ? "timeout" : String(error),
    };
  } finally {
    clearTimeout(timeout);
  }
}

function dedupeByCommand(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.command;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

async function main() {
  const files = await walk(ROOT);
  const examples = [];

  for (const file of files) {
    const content = await fs.readFile(file, "utf8");
    const blocks = extractBlocks(content);
    for (const block of blocks) {
      for (const command of splitCommands(block)) {
        if (!command.includes("curl")) {
          continue;
        }
        examples.push({ file, command });
      }
    }
  }

  const uniqueExamples = dedupeByCommand(examples);
  const results = [];

  for (const example of uniqueExamples) {
    const parsed = parseCurl(example.command);
    if (parsed.error) {
      results.push({
        ...example,
        ok: false,
        status: null,
        parseError: parsed.error,
      });
      continue;
    }

    const result = await runRequest(parsed);
    results.push({
      ...example,
      method: parsed.method,
      url: parsed.url,
      ...result,
    });
  }

  await fs.writeFile(OUTPUT, JSON.stringify(results, null, 2));

  const summary = {
    total: results.length,
    ok: results.filter((r) => r.ok).length,
    failed: results.filter((r) => !r.ok).length,
  };

  console.log(JSON.stringify(summary, null, 2));
  console.log(`Wrote ${OUTPUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
