import React, {Component} from 'react';

class Shop extends Component {

    state = {
        accounts: [],
        contract: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            accounts: props.accounts,
            contract: props.contract
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            accounts: nextProps.accounts,
            contract: nextProps.contract
        });
    }

    buyTicket = async (event) => {
        event.preventDefault();
        const {accounts, contract} = this.state;
        const weiAmount = 100000000000000;
        await contract.methods.buy().send({
            from: accounts[0],
            value: weiAmount
        });
    }

    drawing = async (event) => {
        event.preventDefault();
        const {accounts, contract} = this.state;
        const weiAmount = 0;
        await contract.methods.drawing().send({
            from: accounts[0],
            value: weiAmount
        });
    }

    resetGame = async (event) => {
        event.preventDefault();
        const {accounts, contract} = this.state;
        const weiAmount = 0;
        await contract.methods.reset().send({
            from: accounts[0],
            value: weiAmount
        });
    }

    render() {
        const {accounts} = this.state;

        return (
            <div className="container p-0">
                <div >
                    <div className="form-group">
                        <label htmlFor="accounts">Account</label>
                        <select id="accounts" className="form-control">
                            {accounts.map(function (account, index) {
                                return (<option key="{account}" value="{account}">{account}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div>
                    {
                        /*
                        <div className="form-group">
                            <label htmlFor="otp">OTP</label>
                            <input id="otp" type="number" className="form-control" min="000000" max="999999"/>
                            <small id="otpHelp" className="form-text text-muted">Please type your One Time Password from GAuthenticator App</small>
                        </div>
                        */
                    }
                    <button type="button" className="btn btn-primary ml-0" onClick={this.buyTicket}>Buy</button>
                </div>
                <button type="button"
                        className="btn btn-outline-warning mt-4 mb-2"
                        onClick={this.drawing}>Determine Winner</button>
                <button type="button"
                        className="btn btn-outline-success ml-2 mt-4 mb-2"
                        onClick={this.resetGame}>Reset Game</button>
            </div>
        );
    }
}

export default Shop;