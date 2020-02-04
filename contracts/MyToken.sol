pragma solidity 0.5.12;

contract MyToken{
    string public name;  //A public variable of our Token Name
    string public symbol; //A public variable of our Token Symbol
    uint8 public decimals; //A public varable of our Token Decimals(How much can our token can be divisible into)
//We will be defining the total supply of our token in variable supply
uint supply;
//This mapping will be responsible to hold  the balances of our accounts.
mapping (address => uint) balances;
//This totalSupply() will be returning the total supply of our token
function totalSupply() public view returns (uint256)
{
    return supply;
}
//balanceOf function will take an address that address will be used as key in mapping to return the balance
function balanceOf(address _owner) public view returns (uint256 balance)
{
        return balances[_owner];
}
}