// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Holocoin is ERC20, Ownable {
    // Constructor
    constructor() ERC20("Holocoin", "HLO") Ownable(msg.sender) {}

    // Mint new coins
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Burn coins
    function burn(uint256 amount) public {
        require(amount > 0, "Transfer amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Not enough coins to burn"); 
        _burn(msg.sender, amount);
    }

    // Transfer coins
    function transferTokens(address receiver, uint256 amount) external {
        require(amount > 0, "Transfer amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Not enough coins to transfer"); 
        approve(msg.sender, amount);
        transferFrom(msg.sender, receiver, amount);
    }
}
