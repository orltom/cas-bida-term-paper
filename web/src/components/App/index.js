import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import './style.css';

import Shop from '../Shop';
import MetaData from '../MetaData';
import Tickets from '../Tickets';
import getWeb3 from "../../utils/getWeb3";
import Lottery from "../../Lottery.json";

class App extends Component {

    state = {
        smart_contract_address: null,
        balance: null,
        curr_block: null,
        game_state: null,
        accounts: [],
        tickets: [],
        contract: null,
        web3: null,
        winner: null
    }

    componentWillMount = async () => {

        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();
        const network = Lottery.networks[networkId];
        const contract = new web3.eth.Contract(
            Lottery.abi,
            network && network.address,
        );

        let accounts = await web3.eth.getAccounts();
        let soldTickets = await contract.methods.showTickets().call();
        let gameState = await contract.methods.getCurrentState().call();
        let blockNumber = await web3.eth.getBlockNumber();
        let smartContractAddress = await contract.options.address;
        let balance = await web3.eth.getBalance(smartContractAddress);
        //let winner = await contract.methods.getDrawingTicket().call();

        this.setState({
            accounts: accounts,
            contract: contract,
            web3: web3,
            tickets: soldTickets,
            game_state: gameState,
            curr_block: blockNumber,
            smart_contract_address: smartContractAddress,
            balance: balance,
            //winner: winner
        });

        this.watchTicketEvent();
        this.watchWinnerEvent();
        this.watchResetEvent();
        this.watchSoldOutEvent();
    }

    watchTicketEvent() {
        const {contract} = this.state;
        contract.events.Sold({}, (error, data) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                this.updateSoldTickets();
                this.updateMetaData();
            }
        });
    }

    watchSoldOutEvent() {
        const {contract} = this.state;
        contract.events.Completed({}, (error, data) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                this.updateMetaData();
            }
        });
    }

    watchWinnerEvent() {
        const {contract} = this.state;
        contract.events.Draws({}, (error, data) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                this.updateSoldTickets();
                this.updateMetaData();
                this.updateWinner();
            }
        });
    }

    watchResetEvent() {
        const {contract} = this.state;
        contract.events.Reset({}, (error, data) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                console.log("catch reset event.");
                this.resetGame();
                this.updateMetaData();
            }
        });
    }

    updateSoldTickets = async () => {
        const {contract} = this.state;
        let soldTickets = await contract.methods.showTickets().call();
        this.setState({
            tickets: soldTickets
        });
    }

    updateMetaData = async () => {
        const {contract, web3} = this.state;
        let balance = await web3.eth.getBalance(contract.options.address);
        let blockNumber = await web3.eth.getBlockNumber();
        let gameState = await contract.methods.getCurrentState().call();
        this.setState({
            game_state: gameState,
            blockNumber: blockNumber,
            balance: balance
        });
    }

    updateWinner = async () => {
        const {contract} = this.state;
        let winner = await contract.methods.drawingTicket().call();
        this.setState({
            winner: winner
        });
    }

    resetGame = async () => {
        window.location.reload();
    }

    render() {
        const {smart_contract_address, balance, curr_block, game_state, accounts, tickets, contract, winner} = this.state;

        return (
            <div className="game container fixed-top">
                <div className="app-header row"/>
                <div className="app-shop row">
                    <Shop accounts={accounts} contract={contract}/>
                </div>
                <div className="app-meta-data row">
                    <MetaData gameState={game_state}
                              blockNumber={curr_block}
                              smartContractAddress={smart_contract_address}
                              balance={balance}/>
                </div>

                <div className="app-tickets row">
                    <Tickets tickets={tickets} winner={winner}/>
                </div>
            </div>
        );
    }
}

export default App;