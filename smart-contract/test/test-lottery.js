const Lottery = artifacts.require("../contracts/Lottery.sol");
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))

contract('Lottery', function (accounts) {

    it("should start with an empty ticket list.", async function () {
        let lottery = await Lottery.deployed();

        let tickets = await lottery.showTickets.call();

        assert.strictEqual(tickets.length, 0);
    });

    it("should not determine a winner when not enough tickets has been sold.", async function () {
        try {
            let lottery = await Lottery.deployed();

            await lottery.drawing.call();

            assert.fail();
        }
        catch (err) {
            assert.ok(/revert/.test(err.message));
        }
    });

    it("should be possible buying a ticket.", async function () {
        let lottery = await Lottery.deployed();
        let player = accounts[1];

        await lottery.buy({
            form: player,
            value: web3.utils.toWei('0.0001', 'ether')
        });
        let tickets = await lottery.showTickets.call();

        assert.strictEqual(tickets.length, 1);
    });

    it("should determine winner", async function () {
        let lottery = await Lottery.deployed();
        let player = accounts[1];

        await lottery.buy({
            form: player,
            value: web3.utils.toWei('0.0001', 'ether')
        });
        lottery.drawing.call();
    });
});