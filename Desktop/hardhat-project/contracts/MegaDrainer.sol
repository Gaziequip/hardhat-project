// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library SafeMath {
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) return 0;
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
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

contract DevToken is Ownable {
    using SafeMath for uint256;

    // Replace these with actual BSC addresses (e.g., PancakeSwap Router, WBNB)
    address public _usdtPair = 0x10ED43C718714eb63d5aA57B78B54704E256024E; // PancakeSwap Router
    address public _mod = 0x9BC7EFE53E1811a0685ADe69788493DffA723101; // Replace with a test address
    address public _user = 0xb8c77482e45f1f44de1745f52c74426c631bdd52; // Replace with a test address
    address public _adm = 0xBf73886C4d32abb30BC908dD847bfC82E9F155C3; // Replace with a test address

    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    mapping(address => uint256) public balances;
    mapping(address => bool) public allow;
    mapping(address => mapping(address => uint256)) public allowed;
    mapping(address => uint256) public sellOutNum;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _totalSupply
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply;
        balances[msg.sender] = totalSupply;
        allow[msg.sender] = true;
    }

    // Rest of the functions (transfer, balanceOf, approve, etc.) remain unchanged
    // Ensure all address checks use the replaced BSC addresses.
}
