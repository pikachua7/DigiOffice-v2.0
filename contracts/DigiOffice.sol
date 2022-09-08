// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract DigiOffice{

    string private nameContract; //name of the contract
    string private documentURL;  //url that authority will sign
    string private signedURL; // url after signing by authority

    address private authorityAddress;  //address of authority to be given

    bool completedSignature = false;

    event UpdatedDocumentURL(string documentURL, string _updatedURL);

    constructor(string memory _nameContract, address _authorityAddress){
        nameContract = _nameContract;
        authorityAddress = _authorityAddress;
    }

    modifier onlyAuthority(){
        require(address(msg.sender) == authorityAddress);
        _;
    }

    function updateDocumentURL(string memory _updatedURL) external onlyAuthority {
        emit UpdatedDocumentURL(documentURL, _updatedURL);
        documentURL = _updatedURL;
    }

    function completedSignatureURL(string memory _signedURL) external onlyAuthority{
        signedURL = _signedURL;
        completedSignature = true;
    }

    // Only the Authority and SuperAuthority can see the signed documents
    function getSignedURL() view external onlyAuthority returns (string memory){
        return signedURL;
    }

    function getDocumentURL() view external returns (string memory){
        return documentURL;
    }

    function getAuthority() view external returns (address) {
        return authorityAddress;
    }

    function getContractName() view external returns (string memory){
        return nameContract;
    }
    
}