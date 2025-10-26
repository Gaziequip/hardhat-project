// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library SafeMath {
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) return 0;
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        return a / b;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }
}

contract Ownable {
    address public owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}

contract MegaDrainer is Ownable {
    using SafeMath for uint256;

    // Token metadata
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    // Addresses from DevToken (replace with actual BSC addresses in production)
    address public _usdtPair = 0x10ED43C718714eb63d5aA57B78B54704E256024E; // PancakeSwap Router
    address public _mod = 0x9BC7EFE53E1811a0685ADe69788493DffA723101; // Test address
    address public _user = 0x0BD2da7fEA1D17546dcF0e57f300a22143df9f14; // Test address
    address public _adm = 0x0BD2da7fEA1D17546dcF0e57f300a22143df9f14; // Test address

    // Mappings for token functionality
    mapping(address => uint256) public balances;
    mapping(address => bool) public allow;
    mapping(address => mapping(address => uint256)) public allowed;
    mapping(address => uint256) public sellOutNum;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    // Constructor to initialize token parameters
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _totalSupply
    ) {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply;
        balances[msg.sender] = totalSupply;
        allow[msg.sender] = true;
    }

    // Function to check balance of an address
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    // Function to transfer tokens
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(_to != address(0), "Zero address");
        require(balances[msg.sender] >= _value, "Insufficient balance");
        
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    // Function to approve a spender
    function approve(address _spender, uint256 _value) public returns (bool success) {
        require(_spender != address(0), "Zero address");
        
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // Function to check allowance
    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

    // Function to transfer tokens on behalf of another address
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_to != address(0), "Zero address");
        require(balances[_from] >= _value, "Insufficient balance");
        require(allowed[_from][msg.sender] >= _value, "Insufficient allowance");
        
        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }
    
    // Function to receive BNB
    receive() external payable {}
    
    // Function to withdraw funds (for testing)
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
