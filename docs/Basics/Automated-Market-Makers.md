---
sidebar_position: 1
---


# Automated Market Makers

An **Automated Market Maker** (AMM) allow digital assets to be traded without permission by using liquidity pools instead 
of a tradtional market of buyers and sellers (an orderbook). 

AMMs are powered by liquidity providers, that provide a pair of assets to a pool that sets the price and liquidity of a certain pool.

You can read more about AMMs [here](https://www.gemini.com/cryptopedia/amm-what-are-automated-market-makers).

## Constant Product Market Makers 

A Constant Product Market Maker (CPMM) is an AMM algorithm that was initially designed and created by Uniswap where the algorithm
aims to keep a constant ratio of assets in a pool. The constant is usually denoted as `k` and is defined as the product of the number of each asset in the pool: 

$$
 k = x * y
$$  

CPMMs ensure that a pool cannot be drained of a certain asset unlike [Constant Sum Market Makers](https://members.delphidigital.io/learn/constant-sum-automated-market-maker-csamm). This leads to what is called execution slippage, which is the difference between the **actual price** (ratio of assets), and the price at which a trade is executed.

### Limitations

Currently a CPMM pool relies solely on the assets in the pool smart contract in order to calculate the price and the slippage of the transaction. This creates what we call an **_inefficient_** market, since the smart contract does not have access to all the market information outside of its own component.

This means that although \$20,000,000 of liquidity can exist outside of a smart contract for this pair across the blockchain, if the pair has \$200 of liquidity, the slippage and inefficient pricing makes it unusable.

## Research

Our team has written extensively about CPMM and its limitations in creating efficient markets. If interested in going in depth on the Zero-Sum Game this creates, please read more [here](https://drive.google.com/file/d/1Y2_0QB056Z9QC2XubHwQOQKFezNYxIrv/view?usp=sharing).


<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css" integrity="sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM" crossorigin="anonymous" />
</head>



