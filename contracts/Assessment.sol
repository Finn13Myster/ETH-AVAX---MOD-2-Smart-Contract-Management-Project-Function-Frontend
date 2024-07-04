// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    uint256 public interestRate; // Interest rate in percentage (e.g., 5 for 5%)
    uint256 public lastInterestCalculation;
    uint256 public interestInterval; // Interval for interest calculation (in seconds)

    struct Transaction {
        uint256 timestamp;
        address from;
        address to;
        uint256 amount;
        string actionPerformed; // New field to indicate action type
    }
    
    Transaction[] public transactionHistory;

    event Deposit(address indexed account, uint256 amount);
    event Withdraw(address indexed account, uint256 amount);
    event InterestAccrued(uint256 amount);
    event TransactionRecorded(uint256 indexed index, uint256 timestamp, address indexed from, address indexed to, uint256 amount, string actionPerformed); // Include actionPerformed in event

    constructor(uint256 initBalance, uint256 _interestRate, uint256 _interestInterval) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        interestRate = _interestRate;
        interestInterval = _interestInterval;
        lastInterestCalculation = block.timestamp;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");

        uint256 _previousBalance = balance;
        balance += _amount;

        emit Deposit(msg.sender, _amount);
        recordTransaction(address(0), msg.sender, _amount, "Deposit");

        assert(balance == _previousBalance + _amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");

        uint256 _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        balance -= _withdrawAmount;

        emit Withdraw(msg.sender, _withdrawAmount);
        recordTransaction(msg.sender, address(0), _withdrawAmount, "Withdraw");

        assert(balance == (_previousBalance - _withdrawAmount));
    }

    function calculateInterest() internal {
        uint256 timePassed = block.timestamp - lastInterestCalculation;
        uint256 interest = (balance * interestRate * timePassed) / (interestInterval * 100);
        balance += interest;
        lastInterestCalculation = block.timestamp;

        emit InterestAccrued(interest);
    }

    // Modifier to trigger interest calculation before executing a function
    modifier accrueInterestIfNeeded {
        uint256 timePassed = block.timestamp - lastInterestCalculation;
        if (timePassed >= interestInterval) {
            calculateInterest();
        }
        _;
    }

    function accrueInterest() public accrueInterestIfNeeded {
        require(msg.sender == owner, "You are not the owner of this account");
    }

    function recordTransaction(address _from, address _to, uint256 _amount, string memory _actionPerformed) internal {
        Transaction memory newTransaction = Transaction(block.timestamp, _from, _to, _amount, _actionPerformed);
        transactionHistory.push(newTransaction);
        emit TransactionRecorded(transactionHistory.length - 1, block.timestamp, _from, _to, _amount, _actionPerformed);
    }

    function getTransactionHistoryLength() public view returns (uint256) {
        return transactionHistory.length;
    }

    function getTransaction(uint256 index) public view returns (uint256, address, address, uint256, string memory) {
        require(index < transactionHistory.length, "Index out of bounds");
        Transaction memory txn = transactionHistory[index];
        return (txn.timestamp, txn.from, txn.to, txn.amount, txn.actionPerformed);
    }
}
