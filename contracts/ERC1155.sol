// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract ERC1155 {
    event TransferSingle(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256 id,
        uint256 value
    );
    event TransferBatch(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256[] ids,
        uint256[] values
    );
    event ApprovalForAll(
        address indexed _account,
        address indexed _operator,
        bool approved
    );
    // event URI(value, id)

    //      tokenId             user      balance
    mapping(uint256 => mapping(address => uint256)) internal _balances;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    function balanceOf(address account, uint256 id)
        public
        view
        returns (uint256)
    {
        require(account != address(0), "Invalid address 0");
        return _balances[id][account];
    }

    function balanceOfBatch(address[] memory accounts, uint256[] memory ids)
        public
        view
        returns (uint256[] memory)
    {
        require(
            accounts.length == ids.length,
            "Accounts and Ids are not the same length"
        );
        uint256[] memory balances = new uint256[](accounts.length);

        for (uint256 i = 0; i < accounts.length; i++) {
            balances[i] = balanceOf(accounts[i], ids[i]);
        }
        return balances;
    }

    function isApprovedForAll(address account, address operator)
        public
        view
        returns (bool)
    {
        return _operatorApprovals[account][operator];
    }

    function setApprovalForAll(address operator, bool approved) public {
        _operatorApprovals[msg.sender][operator] = approved;

        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function _transferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount
    ) private {
        uint256 fromBalAmount = balanceOf(from, id);
        require(fromBalAmount >= amount, "You don't have enough ");

        _balances[id][from] -= amount;
        _balances[id][to] += amount;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount
    ) public virtual {
        require(
            from == msg.sender || isApprovedForAll(from, msg.sender),
            "You are not authorized"
        );
        require(to != address(0), "To address cannot be 0");
        _transferFrom(from, to, id, amount);

        emit TransferSingle(msg.sender, from, to, id, amount);

        require(_checkOnERC1155Received(), "Receiver not implemented");
    }

    // dummy
    function _checkOnERC1155Received() internal pure returns (bool) {
        return true;
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) public {
        require(
            ids.length == amounts.length,
            "Ids and amounts length not same"
        );

        require(to != address(0), "To address cannot be 0");

        require(
            from == msg.sender || isApprovedForAll(from, msg.sender),
            "You are not authorized"
        );

        for (uint256 i = 0; i < ids.length; i++) {
            _transferFrom(from, to, ids[i], amounts[i]);
        }

        emit TransferBatch(msg.sender, from, to, ids, amounts);

        require(_checkOnBatchERC1155Received(), "Receiver not implemented");
    }

    // dummy
    function _checkOnBatchERC1155Received() internal pure returns (bool) {
        return true;
    }

    // ERC165
    function supportsInterface(bytes4 interfaceId)
        public
        pure
        virtual
        returns (bool)
    {
        return interfaceId == 0xd9b67a26;
    }
}
