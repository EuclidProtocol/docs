---
title: Broadcasting a Trade On-Chain
sidebar_position: 4
---

import Tabs from '@site/src/components/Tabs';

Once you've constructed a trade message using the Euclid API, the final step is to **sign and broadcast the transaction on-chain**.

This section covers:
- Connecting a wallet (Cosmos and EVM)
- Fetching the correct chain config
- Broadcasting and confirming the transaction


## Prerequisites

### Wallet Connection

You must connect a compatible wallet to sign and send transactions:

- [Keplr (Cosmos)](https://docs.keplr.app/api/)
- [Leap (Cosmos)](https://docs.leapwallet.io/cosmos/for-dapps-connect-to-leap/api-reference)
- [MetaMask (EVM)](https://docs.metamask.io/wallet/)
- [Rabby (EVM)](https://rabby.io/docs/integrating-rabby-wallet/)

:::tip
You’ll need the user’s wallet address and signing provider for their selected chain.
:::


## Broadcast the Transaction

Assuming you've already constructed the trade message (see [Send a Trade](../Developer%20Guides/Perform%20A%20Swap.md)), you now need to send it.


### CosmWasm

<Tabs
  tabs={[
    {
      id: 'js',
      label: 'JavaScript',
      language: 'javascript',
      content: `// broadcast_cosmos.js

const tx = await client.executeMultiple(
  wallet.bech32Address,
  msg.msgs,
  "auto",
  "Swap"
);

return tx;`
    },
    {
      id: 'ts',
      label: 'TypeScript',
      language: 'typescript',
      content: `// broadcast_cosmos.ts

const tx: DeliverTxResponse = await client.executeMultiple(
  wallet.bech32Address,
  msg.msgs,
  "auto",
  "Swap"
);

return tx;`
    },
    {
      id: 'py',
      label: 'Python',
      language: 'python',
      content: `# broadcast_cosmos.py

from keplr_py import Client

client = Client(rpc_url)
tx = client.execute_multiple(
    sender=wallet_address,
    msgs=msgs,
    fee='auto',
    memo='Swap'
)

print(tx)`
    },
    {
      id: 'go',
      label: 'Go',
      language: 'go',
      content: `// broadcast_cosmos.go

tx := BuildCosmosTx(walletAddress, msgs, "auto", "Swap")
res, err := client.BroadcastTx(tx)
if err != nil {
  log.Fatal(err)
}
fmt.Println(res)`
    },
  ]}
/>



### EVM


<Tabs
  tabs={[
    {
      id: 'js-evm',
      label: 'JavaScript',
      language: 'javascript',
      content: `// broadcast_evm.js

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const tx = {
  to: msg.msgs[0].to,
  data: msg.msgs[0].data,
  value: msg.msgs[0].value || "0x0"
};

const receipt = await signer.sendTransaction(tx);
const confirmed = await receipt.wait();

return confirmed;`
    },
    {
      id: 'ts-evm',
      label: 'TypeScript',
      language: 'typescript',
      content: `// broadcast_evm.ts

import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const tx: ethers.providers.TransactionRequest = {
  to: msg.msgs[0].to,
  data: msg.msgs[0].data,
  value: msg.msgs[0].value ?? "0x0"
};

const response = await signer.sendTransaction(tx);
const receipt = await response.wait();

return receipt;`
    },
    {
      id: 'py-evm',
      label: 'Python',
      language: 'python',
      content: `# broadcast_evm.py

from web3 import Web3

w3 = Web3(Web3.HTTPProvider("https://your-evm-rpc-url"))
account = w3.eth.account.from_key(PRIVATE_KEY)

tx = {
    'to': msg['msgs'][0]['to'],
    'data': msg['msgs'][0]['data'],
    'value': int(msg['msgs'][0].get('value', '0'), 16),
    'gas': 250000,
    'nonce': w3.eth.get_transaction_count(account.address),
    'chainId': w3.eth.chain_id
}

signed = account.sign_transaction(tx)
tx_hash = w3.eth.send_raw_transaction(signed.rawTransaction)
print(w3.to_hex(tx_hash))`
    },
    {
      id: 'go-evm',
      label: 'Go',
      language: 'go',
      content: `// broadcast_evm.go

tx := types.NewTransaction(
  nonce,
  common.HexToAddress(msg.Msgs[0].To),
  value,
  gasLimit,
  gasPrice,
  msg.Msgs[0].Data,
)

signedTx, err := types.SignTx(tx, types.LatestSignerForChainID(chainID), privateKey)
if err != nil {
  log.Fatal(err)
}

err = client.SendTransaction(context.Background(), signedTx)
if err != nil {
  log.Fatal(err)
}

fmt.Println("TX Hash:", signedTx.Hash().Hex())`
    }
  ]}
/>

## Success

Once the transaction is confirmed, the assets will be routed cross-chain and swapped using the parameters you’ve set in your trade intent.