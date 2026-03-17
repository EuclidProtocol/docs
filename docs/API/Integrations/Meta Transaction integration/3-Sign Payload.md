---
sidebar_label: Sign Payload
id: meta-tx-sign-payload
---

# Step 3 — Sign Payload

Sign the payload returned by Step 2.

## Option A — Wallet Signing (EVM)

```ts
const signature = await ethereum.request({
  method: 'personal_sign',
  params: [JSON.stringify(payload), walletAddress],
});
```

You can also sign `evm_raw_payload` if your wallet flow expects a preformatted message.

## Option B — Backend Signing

1. Select the correct raw payload (`evm_raw_payload` or `cosmos_raw_payload`).
2. Sign with your backend-managed key.
3. Return `signature` and `pub_key`.

:::tip
For programmatic/private-key signing, sign the chain-specific raw payload directly (`evm_raw_payload` or `cosmos_raw_payload`), not a re-serialized `payload` object.
:::

## Output Needed For Step 4

- `signature`
- `pub_key`
- `wallet_address`
- plus Step 2 values: `payload`, `types`, and optional `meta`

Next: [Broadcast](./4-Broadcast.md)
