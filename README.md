[![MIT License](https://raw.githubusercontent.com/orltom/game-of-life/master/.github/license.svg?sanitize=true)](https://github.com/orltom/cas-bida-term-paper/blob/master/LICENSE)


# Term Paper
ZHAW CAS Big Data Analytics, Blockchain and Distributed Ledger
topic: lottery ticket as ethereum smart contract

see [semesterarbeit.pdf](https://github.com/orltom/cas-bida-term-paper/blob/master/build/semesterarbeit.pdf)

## Requirements
* asciidoctor-pdf
* ganache
* truffle
* nodejs
* MetaMask

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