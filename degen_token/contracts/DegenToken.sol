// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20, Ownable {
    // Structure to represent an in-game item
    struct InGameItem {
        uint256 id;
        string name;
        uint256 price;
    }

    InGameItem[] public inGameItems; // List of in-game items

    // Constructor
    constructor() ERC20("Degen", "DGN") {
        // Initialize some in-game items
        inGameItems.push(InGameItem(1, "Bored Aps NFT", 10));
        inGameItems.push(InGameItem(2, "$20 Steam Gift Card", 20));
        inGameItems.push(InGameItem(3, "$50 Amazon Gift Card", 50));
    }

    // Mint new tokens to another address
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Transfer tokens to another address
    function transferTokens(address to, uint256 amount) public {
        require(amount > 0, "Transfer amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _transfer(msg.sender, to, amount);
    }   

    // Redeem tokens for items
    function redeemTokens(uint256 itemId) public {
        require(itemId < inGameItems.length, "Invalid item ID");

        InGameItem storage item = inGameItems[itemId];
        require(balanceOf(msg.sender) >= item.price, "Insufficient balance");

        _burn(msg.sender, item.price);
    }

    // Check token balance of an address
    function checkTokenBalance(address account) public view returns (uint256) {
        return balanceOf(account);
    }

    // Burn tokens
    function burnTokens(uint256 amount) public {
        require(amount > 0, "Burn amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _burn(msg.sender, amount);
    }
}

