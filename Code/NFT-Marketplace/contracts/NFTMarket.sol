// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address payable owner;
    uint256 listingPrice = 0.0025 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    enum ListingStatus {
        Active,
        Sold
    }

    struct Owner {
        string name;
        string nic;
        address payable _address;
    }

    struct MarketItem {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool sold;
    }

    struct FullMarketItem {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        Owner[] owners;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => Owner[]) private idToOwners;

    event MarketItemCreated (
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        Owner[] owners,
        uint256 price,
        bool sold
    );

    function getListingPrice() public view returns(uint256) {
        return listingPrice;
    }

    function createMarketItem (
        address nftContract,
        uint256 tokenId,
        uint256 price,
        string memory name,
        string memory nic
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Payment must be equal to listing price");
        require(Address.isContract(nftContract), "Invalid NFT contract address");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        Owner memory _owner = Owner({
            name: name,
            nic: nic,
            _address: payable(msg.sender)
        });
        idToOwners[itemId].push(_owner);

        idToMarketItem[itemId] = MarketItem({
            itemId: itemId,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            sold:false
        });

        emit MarketItemCreated({
            itemId: itemId,
            nftContract: nftContract,
            tokenId: tokenId,
            owners: idToOwners[itemId],
            price: price,
            sold:false
        });
    }

    // Buy NFT
    function createMarketSale (
        address nftContract,
        uint256 itemId,
        string memory name,
        string memory nic
    ) public payable nonReentrant {
        uint price = idToMarketItem[itemId].price;
        uint tokenId = idToMarketItem[itemId].tokenId;

        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        uint ownersLength = idToOwners[itemId].length;

        // Transfer money to the current owner
        idToOwners[itemId][ownersLength - 1]._address.transfer(msg.value);
        // Transfer ownership of the NFT to new owner
        ERC721(nftContract).transferFrom(address(idToOwners[itemId][ownersLength - 1]._address), msg.sender, tokenId);

        // Add new owner to owners list
        idToOwners[itemId].push(Owner({
            name: name,
            nic: nic,
            _address: payable(msg.sender)
        }));
        idToMarketItem[itemId].sold = true;

        _itemsSold.increment();
        // TODO: Commission to the contract owner
    }

    // Get All Items
    function fetchAllMarketItems() public view returns(FullMarketItem[] memory) {
        uint itemCount = _itemIds.current();

        FullMarketItem[] memory items = new FullMarketItem[](itemCount);
        for(uint i = 1; i <= itemCount; i++) {
            FullMarketItem memory currentItem = FullMarketItem({
                itemId: idToMarketItem[i].itemId,
                nftContract: idToMarketItem[i].nftContract,
                tokenId: idToMarketItem[i].tokenId,
                owners: idToOwners[i],
                price: idToMarketItem[i].price,
                sold: idToMarketItem[i].sold
            });
            items[i-1] = currentItem;
        }

        return items;
    }

    // Get All Items
    function fetchMyMarketItems() public view returns(FullMarketItem[] memory) {
        uint itemCount = _itemIds.current();

        uint counter = 0;

        FullMarketItem[] memory items = new FullMarketItem[](itemCount);
        for(uint i = 1; i <= itemCount; i++) {
            address _owner = idToOwners[i][idToOwners[i].length - 1]._address;
            if (_owner == msg.sender) {
                FullMarketItem memory currentItem = FullMarketItem({
                    itemId: idToMarketItem[i].itemId,
                    nftContract: idToMarketItem[i].nftContract,
                    tokenId: idToMarketItem[i].tokenId,
                    owners: idToOwners[i],
                    price: idToMarketItem[i].price,
                    sold: idToMarketItem[i].sold
                });
                items[i-1] = currentItem;
                counter++;
            }
        }

        assembly { mstore(items, counter) }

        return items;
    }

}
