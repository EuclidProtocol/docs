// src/components/widgets/shared/types.ts

export type WidgetTheme = {
  accent: string;
  surface: string;
  panel: string;
  border: string;
  text: string;
  muted: string;
};

export type TokenMeta = {
  tokenId: string;
  displayName?: string;
  image?: string;
  coinDecimal?: number;
  is_verified?: boolean;
  chain_uids?: string[];
  price?: string;
  price_change_24h?: number | string;
  price_change_7d?: number | string;
  total_volume?: string;
  total_volume_24h?: string;
};

export type ChainMeta = {
  chain_uid: string;
  chain_id?: string;
  factory_address?: string;
};

export type SwapHop = {
  route: string[];
  dex: string;
  chain_uid: string;
  amount_in: string;
  amount_out: string;
  amount_out_for_hops?: string[];
};

export type SwapPath = {
  path: SwapHop[];
  total_price_impact: string;
};

export type RoutesResponse = {
  paths: SwapPath[];
};

// Typed payload returned by POST /api/v1/execute/swap
// Feed this to wagmi (EVM) or CosmJS (Cosmos) for signing
export type EvmMsg = {
  chainId: string;
  to: string;
  data: string;
  value: string;
};

export type SwapPayload = {
  chain_id: string;
  contract?: string;
  msgs: EvmMsg[];
  meta?: string;
  // raw response preserved for Cosmos chains
  [key: string]: unknown;
};
