---
sidebar_position: 2
description: "Learn about Euclid's Inovative Messaging Protocol"
---

# Euclid Messaging Protocol (EMP)
The Euclid Messaging Protocol (EMP) is a modular, decentralized and trust-minimized messaging and verification protocol that allows any cross-chain liquidity event in the Euclid Ecosystem to be securely transmitted and finalized by the Liquidity Consensus Layer (LCL). It also allows to emit finalized proofs of settlement from the LCL to outpost chains to release assets. The messaging protocol handles only Euclid specific encoded messages between a Euclid outpost (any integrated network) and the LCL. It is **Not** a general message passing layer like other protocols. 

**EMP never connects or communicates two networks directly to each other.** 

## Modular Verification

The main architecture of the EMP revolves around a modular verification with different pluggable security models to support the highest number of networks across different virtual machines. This means that different relayers will be able to use different architectures or security models or even separate messaging layers (like LayerZero) to relay a message between a Euclid Outpost and an LCL. It is important to mention that messages originating from the LCL will have the proofs generated in them after every block for verification. 

### Verification Modules

Here are the different verification modules that EMP supports that can be configured per chain or per message type. 

| **Verification Module** | **Explanation** |
| --- | --- |
| Merkle Inclusion Proof | Lightweight and is used to verify events emitted from chains with known state roots, which is pretty common for EVM networks.  |
| Threshold Signature Consensus (TSC) | A set of decentralized relayers co-sign proofs through an MPC to pass over to the LCL |
| Light Clients | Light clients verify the headers of blocks of message events that enables full-trust minimization.  |

## Message Uniqueness

Every Euclid message which is created through a transaction on a Euclid Outpost is unique and cannot be forged or replicated by the relayer that relays the message. Each message ID is derived from a chain unique identifier registered in the LCL, the address origination of the transaction as well as the payload data. This message ID then generates an on-chain nonce from the registry for each outpost to chain to ensure no duplicate messages can be accepted or replay attacks are possible. It also means that the same user cannot by mistake execute a transaction twice as one of them will take precedence in the block of the LCL and the other will fail. If any of the above verifications is not accurate according to the LCL, the whole transaction is reverted and the relayer is slashed or not permitted to keep posting messages. 

## Relayer Requirements

All relayers that want to relay messages between the LCL and any outpost require to post collateral as $EUCLID tokens. These tokens can be withdrawn if a relayer no longer wishes to relay. These tokens are used as a security collateral in case a relayer passes an invalid message, or spams the network. 

## Message Lifecycle

All messages when initiated stay available to relay with the initial asset of the user locked in the contract until a user set expiry date. The expiry date is a minimum of 5 seconds and can last up to 3 full days. If the message is expired, the user is able to withdraw his assets. If the message is still not expired, the user is not able to cancel a transaction and a relayer can still relay a transaction to the LCL. If a relayer relays an expired transaction, the refund is automatically initiated. 

# Euclid Relayers Economic Model

In Euclid, the access to assets and access to liquidity are fundamentally separated: 

- Assets exist on their native chain and security assumptions.
- Liquidity is priced and routed through the LCL.

This means that relayers are not message relayers but activators of cross-chain liquidity and are rewarded accordingly. Fees for relayers come from two major outlets:

1. **User/Protocol Tip**
2. **Euclid Block Emissions**

## User or Protocol Tip

When a user submits a certain cross-chain transaction from any Euclid Outpost, there is an ability to attach a tip payable to the relayer upon transmitting a successful message. This top is optional and is calculated as a percentage of the output asset notional value. 

When listening for messages to relay, relayers read a queue sorted by fee for the network they support, and they can then choose the messages they want to relay.

## Euclid Block Emissions

Block emissions are rewards for when a relayer supports the LCL by transmitting Euclid specific messages back and forth. Euclid generates fees by taking a percentage of the fees that liquidity providers earn on a certain Liquidity State. A portion of this fee is then used to reward a relayer (or set of relayers) that transmit the message to the LCL. This fee will be decided in the initial tokenomics and is then managed by governance.


![EMP Layer](../../../static/img/emp-1.webp)
*Relayer Revenue Flow in Euclid Protocol*


## Posting Messages on Euclid Outposts

Relayers will have to submit transactions to Euclid Outposts to pass on a confirmation or verification proof from LCL for a certain transaction lifecycle which allows the release of an asset to a user or continue a downstream lifecycle. In both, the relayer will need to pay the transaction fee to submit the transaction on the network, hence the tip (if it exists) as well as protocol reward will have to be greater than the cost to relay transaction for a relayer to generate a profit $RP$. For example, if gas fees cost 8 USD on Ethereum, the tip will need to exceed this nominal value for the relayer to consider it. On most networks, gas would be cheap enough that this would be viable. 

Euclid provides a gas registry which keeps moving average of gas fees on different networks that relayers could utilize to decide what messages from queues to pick up to relay. This can also be subsidized by networks or protocols to facilitate transactions on their protocols across the Euclid ecosystem.

![EMP Layer](../../../static/img/emp-2.webp)
*High Level Architecture of Relayer*