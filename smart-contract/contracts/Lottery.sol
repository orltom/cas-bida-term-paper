pragma solidity >=0.5.0 <0.6.0;

contract Lottery {

    enum State {
        Initialize,
        Running,
        Completed,
        Finished
    }

    struct Ticket {
        address payable buyer;
    }

    event Sold();

    event Draws();

    event Reset();

    event Completed();

    address owner;

    State currentState = State.Initialize;

    Ticket[] tickets;

    uint8 drawingNumber;

    address payable [] buyers;

    uint price;

    uint minimumSoldTickets;

    uint latestBlockNumber;

    constructor () public {
        owner = msg.sender;
        currentState = State.Running;
        price = 100000000000000;
        minimumSoldTickets = 5;
        latestBlockNumber = 0;
    }

    modifier isOwner() {
        require(owner == msg.sender, "Sender not authorized.");
        _;
    }

    modifier isReadyToDrawing() {
        require(currentState == State.Completed, "Not enough ticket sold.");
        require(block.number >= latestBlockNumber, "Wait block generation.");
        _;
    }

    modifier isPayable() {
        require(price == msg.value, "Not exactly required costs.");
        require(currentState == State.Running, "All tickets sold");
        _;
    }

    modifier isRunning() {
        require(currentState == State.Running || currentState == State.Completed, "Game is not running.");
        _;
    }

    function getCurrentState() public view returns (State) {
        return currentState;
    }

    function buy() public isPayable isRunning payable {
        tickets.push(Ticket({buyer : msg.sender}));
        buyers.push(msg.sender);
        emit Sold();

        if(tickets.length >= minimumSoldTickets) {
            currentState = State.Completed;
            latestBlockNumber = block.number + 2;
            emit Completed();
        }
    }

    function showTickets() public view returns (address payable [] memory) {
        return buyers;
    }

    function ticketSoldCount() external view returns (uint) {
        return tickets.length;
    }

    function drawingTicket() external view returns (uint8) {
        return drawingNumber;
    }

    function drawing() external isRunning isReadyToDrawing isOwner {
        currentState = State.Finished;
        drawingNumber = random();
        Ticket memory ticket = tickets[drawingNumber];
        withdraw(ticket.buyer);
        emit Draws();
    }

    function reset() external isOwner {
        currentState = State.Initialize;
        for(uint i = 0; i<buyers.length; i++) {
            delete buyers[i];
            buyers.length--;
        }

        buyers.length = 0;
        for(uint i = 0; i<tickets.length; i++) {
            delete tickets[i];
            tickets.length--;
        }
        tickets.length = 0;

        delete drawingNumber;
        currentState = State.Running;
        emit Reset();
    }

    function random() private view returns (uint8) {
        bytes memory buyerAddress = abi.encodePacked(buyers);
        bytes32 blockHash = blockhash(block.number - 1);
        uint difficulty = block.difficulty;
        bytes memory value = encode(blockHash, difficulty, buyerAddress);
        uint ticketCount = tickets.length;
        return uint8(uint256(keccak256(bytes(value))) % ticketCount);
    }

    function encode(bytes32 blockHash, uint difficulty, bytes memory buyerAddress) private pure returns (bytes memory) {
        return abi.encodePacked(blockHash, difficulty, buyerAddress);
    }

    function withdraw(address payable _winnerAddress) private {
        uint256 balanceToDistribute = calculateEarnings();
        _winnerAddress.transfer(balanceToDistribute);
    }

    function calculateEarnings() private view returns (uint256) {
        uint256 balance = address(this).balance;
        uint256 amount = (price * tickets.length) * 4 / 5;
        if (amount >= balance) {
            return balance / 2;
        }
        else {
            return amount;
        }
    }
}