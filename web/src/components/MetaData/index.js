import React, {Component} from 'react';
import './style.css';

class MetaData extends Component {

    state = {
        smart_contract_address: null,
        balance: null,
        curr_block: null,
        game_state: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            smart_contract_address: props.smartContractAddress,
            curr_block: props.blockNumber,
            balance: props.balance,
            game_state: this.asState(parseInt(props.gameState))
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            smart_contract_address: nextProps.smartContractAddress,
            curr_block: nextProps.blockNumber,
            balance: nextProps.balance,
            game_state: this.asState(parseInt(nextProps.gameState))
        });
    }

    asState(value) {
        if (value === 0) {
            return "Initialize";
        }
        else if (value === 1) {
            return "Running";
        }
        else if (value === 2) {
            return "Sold-Out";
        }
        else if (value === 3) {
            return "Finished";
        }
        return "ERROR: NOT MAPPED STATE";
    }

    render() {
        const {smart_contract_address, balance, curr_block, game_state} = this.state;
        let cssClass = "state-" + game_state.toLowerCase();
        let format_amount = balance ? new Intl.NumberFormat().format(balance) : 0;

        return (
            <table className="game-meta-data table table-striped table-dark">
                <tbody>
                <tr>
                    <td>Smart Contract</td>
                    <td>{smart_contract_address}</td>
                </tr>
                <tr>
                    <td>Balance</td>
                    <td>{format_amount} Wei</td>
                </tr>
                <tr>
                    <td>Current Block</td>
                    <td>{curr_block}</td>
                </tr>
                <tr>
                    <td>Game State</td>
                    <td className={cssClass}>{game_state}</td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default MetaData;