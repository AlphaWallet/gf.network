/*
Requirements:
·No fixed amount
·Cannot be transferred
·admin functions: move token, mint token, burn token
.*/

pragma solidity >=0.4.22 <0.6.0;

import "./EIP20Interface.sol";

contract GFO is EIP20Interface {

    uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    /*
    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */
    string public name;                   //fancy name: eg Simon Bucks
    uint8 public decimals;                //How many decimals to show.
    string public symbol;                 //An identifier: eg SBX
    address public admin;

    modifier adminOnly() {
        require(msg.sender == admin);
        _;
    }

    constructor(
        uint256 _initialAmount,
        string memory _tokenName,
        uint8 _decimalUnits,
        string memory _tokenSymbol,
        address _admin
    ) public {
        balances[msg.sender] = _initialAmount;               // Give the creator all initial tokens
        totalSupply = MAX_UINT256;                           // unlimited
        name = _tokenName;                                   // Set the name for display purposes
        decimals = _decimalUnits;                            // Amount of decimals for display purposes
        symbol = _tokenSymbol;                               // Set the symbol for display purposes
        admin = _admin;
    }

    function mint(address to, uint amountToMint) public adminOnly returns (bool success) {
        balances[to] += amountToMint;
        return true;
    }

    function burn(address from, uint amountToBurn) public adminOnly returns (bool success) {
        require(balances[from] >= amountToBurn);
        balances[from] -= amountToBurn;
        return true;
    }

    function transfer(address _to, uint256 _value) public adminOnly returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public adminOnly returns (bool success) {
        require(balances[_from] >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        emit Transfer(_from, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        //not implemented
        return false;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        //not implemented
        return 0;
    }
}