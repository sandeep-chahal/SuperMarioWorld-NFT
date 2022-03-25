// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract ERC721 {
    // state
    mapping(address => uint256) internal _balances;
    mapping(uint256 => address) internal _owners;
    //       user   => operator/marketplace => isAllowed
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    mapping(uint256 => address) private _approves;

    // events
    event ApprovalForAll(
        address indexed _owner,
        address indexed _operator,
        bool _isApproved
    );

    event Approval(
        address indexed _owner,
        address indexed _to,
        uint256 _tokenId
    );

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _tokenId
    );

    // modifiers
    modifier isTokenExist(uint256 tokenId) {
        require(_owners[tokenId] != address(0), "Token does not exist");
        _;
    }

    // functions

    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "Adress cannot be zero");
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId)
        public
        view
        isTokenExist(tokenId)
        returns (address)
    {
        address owner = _owners[tokenId];
        return owner;
    }

    function setApprovalForAll(address operator, bool isApproved) public {
        _operatorApprovals[msg.sender][operator] = isApproved;
        emit ApprovalForAll(msg.sender, operator, isApproved);
    }

    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return _operatorApprovals[owner][operator];
    }

    function approve(address to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(
            owner == msg.sender || isApprovedForAll(owner, msg.sender),
            "You are not the owner or operator"
        );
        _approves[tokenId] = to;
        emit Approval(owner, to, tokenId);
    }

    function getApproved(uint256 tokenId)
        public
        view
        isTokenExist(tokenId)
        returns (address)
    {
        return _approves[tokenId];
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public isTokenExist(tokenId) {
        require(
            from == _owners[tokenId],
            "From address doesn't hold this token"
        );

        require(
            isApprovedForAll(from, msg.sender) ||
                getApproved(tokenId) == msg.sender ||
                from == msg.sender,
            "You are not authorized"
        );

        require(to != address(0), "Adress cannot be zero");

        _owners[tokenId] = from;
        _balances[from] -= 1;
        _balances[to] += 1;

        approve(address(0), tokenId);

        emit Transfer(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public {
        transferFrom(from, to, tokenId);
        require(_checkOnERC721Received(), "Receiver not implemented");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public {
        safeTransferFrom(from, to, tokenId, "");
        require(_checkOnERC721Received(), "Receiver not implemented");
    }

    // incomplete
    function _checkOnERC721Received() private pure returns (bool) {
        return true;
    }

    // EIP165
    function supportsInterface(bytes4 interfaceId)
        public
        pure
        virtual
        returns (bool)
    {
        return interfaceId == 0x80ac58cd;
    }
}
