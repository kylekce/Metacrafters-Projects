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
        supply == balances[_address];

        require(_value > 0, "Value must be greater than 0");

        supply += _value;
        balances[_address] += _value;
        
        assert(balances[_address] == supply); // Check for overflows or underflows
        supply == 0; // Reset the supply
    }

    // burn function
    function burn(address _address, uint _value) public {
        supply == balances[_address];

        if (supply < _value) {
            revert("Not enough balance to burn");
        }
        
        supply -= _value;
        balances[_address] -= _value;

        assert(balances[_address] == supply); // Check for overflows or underflows
        supply == 0; // Reset the supply
    }

}
