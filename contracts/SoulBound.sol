// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// 0xA3D4638F0B592aBEBdbCF34125dF4F5DaaB23e8a
contract SoulBound is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);

    constructor() ERC721("Soulbound", "SBD") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmNcHTuS4DJjhebdJTMRSu8TVFnW2HwT84DzAfKFm9sW3T";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of the tokenId");
        _burn(tokenId);
    }

    function revoke(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }

    function tokenURI(uint256)
        public
        pure
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return _baseURI();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 /* TokenId */
    ) internal  virtual {
        require(from == address(0) || to == address(0), "You cannot transfer this token");
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId
    ) internal  virtual {
        if(from == address(0)) {
            emit Attest(to, firstTokenId);
        } else if (to == address(0)) {
            emit Revoke(to, firstTokenId);
        }
    }
}
