pragma solidity 0.5.11;

contract MyToken{
//We will be defining the total supply of our token in variable supply
uint supply;
//This totalSupply() will be returning the total supply of our token
function totalSupply() public view returns (uint256)
{
    return supply;
}
}