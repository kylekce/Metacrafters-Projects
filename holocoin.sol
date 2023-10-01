// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract Holocoin {

    // public variables
    string public name = "HOLOCOIN";
    string public abbrv = "HLO";
    uint public supply = 0;

    // mapping variable
    mapping(address => uint) public balances;

    // mint function
    function mint(address _address, uint _value) public {
        supply += _value;
        balances[_address] += _value;
    }

    // burn function
    function burn(address _address, uint _value) public {
        if (balances[_address] >= _value) {
            supply -= _value;
            balances[_address] -= _value;
        }
    }

}
