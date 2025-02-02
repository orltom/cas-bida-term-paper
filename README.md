[![MIT License](https://raw.githubusercontent.com/orltom/game-of-life/master/.github/license.svg?sanitize=true)](https://github.com/orltom/cas-bida-term-paper/blob/master/LICENSE)

# Generating Randomness in a Deterministic Environment

![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?logo=ethereum&logoColor=white)
![Smart Contract](https://img.shields.io/badge/Smart_Contract-282C34?logo=smart-contract&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Truffle](https://img.shields.io/badge/Truffle-5E464D?logo=truffle&logoColor=white)
![Ganache](https://img.shields.io/badge/Ganache-EF9E44?logo=ganache&logoColor=white)

# Term Paper
This project was developed as a term paper for the ZHAW CAS Big Data Analytics, Blockchain, and Distributed Ledger course. It aims to implement a lottery ticket system using an Ethereum Smart Contract to explore methods of generating random numbers in a deterministic environment.

see [semesterarbeit.pdf](https://github.com/orltom/cas-bida-term-paper/blob/master/build/semesterarbeit.pdf)

## Key Features
- Implementation of a lottery ticket as an Ethereum Smart Contract.
- Examination of methods for generating random numbers on the blockchain.
- Provision of a web interface for interacting with the Smart Contract.

## Architecture Overview

The application comprises three main components:

1. **Smart Contract:** Developed in Solidity and deployed on the Ethereum blockchain.
2. **Web Interface:** A React-based application for interacting with the Smart Contract.
3. **Blockchain Network:** A local Ethereum network provided by Ganache for development and testing purposes.

## Prerequisites

- [Node.js](https://nodejs.org/) (Version 14.x or higher)
- [npm](https://www.npmjs.com/)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://www.trufflesuite.com/ganache)
- [MetaMask](https://metamask.io/)

## Development
* Compile Smart Contract >> `./cli.sh --build`
* Run Smart Contract >> `./cli.sh --run`
* Create Term Paper >> `./cli.sh --documentation`

## Usage
```
ganache-cli -p 7545 -d

cd smart-contract
truffle compile
truffle migrate --reset

cd ../web/
npm start
```

## Disclaimer
This Proof of Concept application is **NOT** for production use.

This software is provided as source code under an MIT license (see LICENSE)
