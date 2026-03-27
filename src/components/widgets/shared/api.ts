// src/components/widgets/shared/api.ts
import type { TokenMeta, ChainMeta, RoutesResponse, SwapPayload } from "./types";

const DEFAULT_BASE = "https://api.euclidprotocol.com";

async function gql<T>(base: string, query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${base}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`GQL ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data as T;
}

async function rest<T>(base: string, path: string, body: unknown): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`REST ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

// ── Token metadata ──────────────────────────────────────────────────────────

const TOKEN_METADATA_QUERY = `
  query Tokens($limit: Int, $offset: Int, $verified: Boolean, $dex: [String!], $showVolume: Boolean, $search: String) {
    token {
      token_metadatas(limit: $limit, offset: $offset, verified: $verified, dex: $dex, show_volume: $showVolume, search: $search) {
        tokenId displayName image coinDecimal is_verified chain_uids
        price price_change_24h price_change_7d total_volume total_volume_24h
      }
    }
  }
`;

export async function fetchTokens(opts: {
  base?: string;
  limit?: number;
  offset?: number;
  verified?: boolean;
  dex?: string[];
  showVolume?: boolean;
  search?: string;
} = {}): Promise<TokenMeta[]> {
  const { base = DEFAULT_BASE, ...variables } = opts;
  const data = await gql<{ token: { token_metadatas: TokenMeta[] } }>(
    base,
    TOKEN_METADATA_QUERY,
    { limit: variables.limit ?? 100, ...variables }
  );
  return data.token.token_metadatas;
}

// ── Chains ──────────────────────────────────────────────────────────────────

const CHAINS_QUERY = `
  query Chains {
    router {
      all_chains { chain_uid chain_id factory_address }
    }
  }
`;

export async function fetchChains(base = DEFAULT_BASE): Promise<ChainMeta[]> {
  const data = await gql<{ router: { all_chains: ChainMeta[] } }>(base, CHAINS_QUERY, {});
  return data.router.all_chains;
}

// ── Routes ──────────────────────────────────────────────────────────────────

export async function fetchRoutes(params: {
  token_in: string;
  token_out: string;
  amount_in: string;
  chain_uids?: string[];
  external?: boolean;
  base?: string;
}): Promise<RoutesResponse> {
  const { base = DEFAULT_BASE, ...body } = params;
  return rest<RoutesResponse>(base, "/api/v1/routes", {
    external: true,
    chain_uids: [],
    ...body,
  });
}

// ── Execute swap ─────────────────────────────────────────────────────────────

export async function executeSwap(params: {
  base?: string;
  amount_in: string;
  asset_in: unknown;
  slippage: string;
  recipients: unknown[];
  sender: { address: string; chain_uid: string };
  swap_path: unknown;
  partner_fee?: { partner_fee_bps: number; recipient: string };
}): Promise<SwapPayload> {
  const { base = DEFAULT_BASE, ...body } = params;
  return rest<SwapPayload>(base, "/api/v1/execute/swap", body);
}
