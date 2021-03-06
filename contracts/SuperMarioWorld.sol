// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./ERC721.sol";

contract SuperMarioWorld is ERC721 {
    string public name;
    string public symbol;
    uint256 public tokenCount;
    mapping(uint256 => string) internal _tokenURIs;

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        isTokenExist(tokenId)
        returns (string memory)
    {
        return _tokenURIs[tokenId];
    }

    function mint(string memory _tokenURI) public {
        tokenCount++;
        _balances[msg.sender]++;
        _owners[tokenCount] = msg.sender;
        _tokenURIs[tokenCount] = _tokenURI;

        emit Transfer(address(0), msg.sender, tokenCount);
    }

    // EIP165
    function supportsInterface(bytes4 interfaceId)
        public
        pure
        override
        returns (bool)
    {
        return interfaceId == 0x80ac58cd || interfaceId == 0x5b5e139f;
    }
}
