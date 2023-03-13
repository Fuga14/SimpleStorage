// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

// EVM = Ethereum Virtual Machine
// Avalange, Fantom, Polygon

contract SimpleStorage {
    // bool hasFavoriteNumber = true;
    // string favoriteNumberInText = 'Five';
    // int256 favoriteint = -5;
    // address myAddress = 0x01D36439F9726adcB94efAEf4da035B769506807;
    // bytes32 favoriteBytes = 'cat';

    // Arrays and structs

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People public person = People({favoriteNumber: 10, name: "Patrick"});

    // size of array could be dynamic or sized
    // People[3] public people;
    People[] public people;

    // public means creating a function that simply returns value of variable like in functions in js
    uint256 favoriteNumber;

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
        // favoriteNumber++;
    }

    // view and pure functions, when called alone, don't spend gas
    // view means read state from the contract
    // pure is disallow reading from the function
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    // calldata, memory and storage
    // 'memory' means exist temporaryli, for ex: inside of this function
    // 'calldata' the same but do not allow to modify
    // 'storage' permanent variable that can be modify
    function addPerson(string calldata _name, uint256 _favoriteNumber) public {
        // One way
        // People memory newPerson = People({favoriteNumber: _favoriteNumber, name: _name});
        // people.push(newPerson);
        // Second way
        people.push(People(_favoriteNumber, _name));
    }

    // mapping
    mapping(string => uint256) public nameToFavoriteNumber;

    function addPersonMap(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
