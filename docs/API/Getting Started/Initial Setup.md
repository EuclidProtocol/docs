
import Tabs from '@site/src/components/Tabs';

# Set Up Your Development Environment

Get started building with Euclid’s APIs in minutes. Whether you're integrating token swaps, fetching pricing and pool data, or exploring liquidity provisioning, this guide walks you through the minimal setup needed to begin.


## 1. Choose and Install a Tool

You can make requests to Euclid via:

- **GraphQL**: Using any [GraphQL](https://graphql.org/learn/) client like [Apollo Client](https://www.apollographql.com/docs/react/), Postman, or curl.
- **REST API**: Using tools like Postman, curl, or native `fetch` in your language of choice.

No CLI or SDK is required.

Depending on what you're using, here's how to install the basics:

<Tabs tabs={[
  {
    id: 'tab-node-fetch',
    label: 'JavaScript (fetch)',
    language: 'bash',
    content: `
# No install needed in browser
# For Node.js (18+ includes fetch), otherwise:
npm install node-fetch
`
  },
  {
    id: 'tab-node-axios',
    label: 'JavaScript (Axios)',
    language: 'bash',
    content: `
npm install axios
`
  },
  {
    id: 'tab-node-apollo',
    label: 'Apollo (Node.js)',
    language: 'bash',
    content: `
npm install @apollo/client graphql cross-fetch
`
  },
  {
    id: 'tab-react-apollo',
    label: 'Apollo (React)',
    language: 'bash',
    content: `
npm install @apollo/client graphql
`
  },
  {
    id: 'tab-python-requests',
    label: 'Python (requests)',
    language: 'bash',
    content: `
pip install requests
`
  }
]} />


## 2. Connect a Wallet

If you're interacting with authenticated routes or signing and broadcasting transactions, you'll need a wallet connection.

Euclid supports several wallet types across EVM and Cosmos:

- [Keplr (Cosmos)](https://docs.keplr.app/api/)
- [Leap (Cosmos)](https://docs.leapwallet.io/cosmos/for-dapps-connect-to-leap/api-reference)
- [MetaMask (EVM)](https://docs.metamask.io/wallet/)
- [Rabby (EVM)](https://rabby.io/docs/integrating-rabby-wallet/)

>  Wallets are required to sign transactions and resolve cross-chain identity and balances.

## 3. (Optional) Get an API Key

:::note
If your API usage requires a key (for example higher rate limits or transaction tracking), generate one in the Euclid Developer Portal. If you do not have portal access yet, [contact us](mailto:general@euclidswap.io).
:::

Include it as a header:
```
Authorization: Bearer YOUR_API_KEY
```


## 4. Use the Sandbox / Testnet

>  *Test trades and simulate transactions without spending real assets using our testnet.*

- GraphQL Sandbox Endpoint: `https://testnet.api.euclidprotocol.com/`
- [Faucet Links ](#)


## 5. Explore Further

Once your environment is ready, explore key integrations:

- [Send Your First Trade ](./First%20Call.md)
- [Broadcast a Trade On-Chain ](./Broadcast%20Trade%20Onchain.md)
- [Track a Transaction ](#)
