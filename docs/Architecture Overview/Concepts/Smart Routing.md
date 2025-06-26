---
sidebar_position: 4
description: "Learn about Euclid's Inovative Smart Routing"
---

# Smart Routing 

The **Liquidity Consensus Layer (LCL)** achieves a breakthrough for trading which is the ability to compute and execute optimized cross-chain trades at maximum depth, minimal price impact and lowest execution slippage possible. This happens because due to 2 main architectural reasons: 

1. All the liquidity states exist in the same consensus layer, even though the assets do not, and all are normalized to have a state transition function $f(n)$  which routers are able to use to simulate a route across this liquidity state. This creates a connected state graph composed of all liquidity states that exist in the LCL.
2. For a unique type of liquidity state, there can only exist for a certain asset(s) one of this liquidity state to avoid same state fragmentation. Also, in order to create a new liquidity state, one of the assets should already have another liquidity state created in the LCL. This ensures that all pools are interconnected to optimize routing and liquidity.

![Snart Routing](../../../static/img/consensus-4.webp)
*Chaining of Liquidity States in the LCL*

# The Routing Engine

Through the optimized state graph that is built, Euclid operates an extremely efficient routing engine that operates on Greedy Breadth-First search algorithm. 

## Expansion through Greedy Breadth-First Search (GBFS)

First of all, the engine is able for a swap from A to B $S(a,b)$ to find all the potential liquidity state routes that exist and are viable. If there are 2000 assets, there may be 1000 routes from A to B and most of them are not viable. Instead of searching through all the routes directly we build a custom BFS-based graph traversal with the ultimate goal of maximizing the output token for a certain input taking all constraints $C$  into consideration. Since an entire route is executed in one transaction, latency and settlement risk in the LCL is not an issue. The normalized state transition function $f(n)$ includes the fees involved in the liquidity state and the potential depth $D_i$  of a state (which can be defined differently depending on the Liquidity State in question). 

The **GBFS** algorithm starts by finding the *initial optimal route* which is the route that consists of one hop with the $max(f(n))$ , this is a local maximum and then starts to traverse the rest of the graph to find a maximum which is higher, if it is not, it drops this potential route in the graph. This ensures that the algorithm only finds routes which are better than the local maxima. This algorithm is also based on **Golang Routines** which allows the engine to run parallel execution of traversals with a common state that allows to compute different state transitions in the graph at the same time for faster execution. This allows for most queries to be < 200 ms even with a graph with 30,000+ nodes and assets.

This entire architecture is only possible with a unified settlement state such as the LCL and normalized liquidity states and ensures developers, traders and users are able to make the most informed decisions on any trade possible according to liquidity that exists across 50+ networks.