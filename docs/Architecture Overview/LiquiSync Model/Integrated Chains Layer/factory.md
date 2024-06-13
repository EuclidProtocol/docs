---
sidebar_position: 1
description: "Learn About Euclid's Escrow factory smart contract"
---

# Factory

## Introduction

The Factory smart contract in the Euclid system serves as the core component for managing user interactions with liquidity pools and facilitating swaps. Its primary role is to handle requests from users and communicate these requests to the [router contract](../router.md). The factory contract simplifies user interactions by providing a single point of access for various operations, such as swaps, adding liquidity, and removing liquidity.

## Single Entry point for Requests

The Factory contract is the sole point of communication between the chains and the VSL. This is beneficial for the system for the following reasons:

- **Stremlined Processing for Requests:** This ensures that all request coming from a single chain are processed in a streamlined manner by the factory, removing the possibility of inconsistencies or conflicts that could arise from handling requests in multiple locations and ensuring that operations are executed in the correct order.

- **Improved Security:** Having all messages pass through the a single factory facilitates the implementation of security measures that ensure that all requests received are legitimate.

- **Simplified Developer Experience:** Protocols looking to integrate and use the Euclid layer will only need to interact with one contract being the factory contract. This simplification greatly decreases the complexity of using the Euclid layer making the developer experience as smooth as possible.

## Workflow

The following diagram illustrates the workflow of the factory contract for a swap request:
:::tip
We will dive deeper into each of the contract's messages and queries in the [Euclid Smart Contracts](../../../Euclid%20Protocol/euclid-smart-contracts.md) section.
:::

:::note
Add diagram
:::
