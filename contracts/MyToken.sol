pragma solidity 0.5.12;

contract MyToken{
    string public name;  //A public variable of our Token Name
    string public symbol; //A public variable of our Token Symbol
    uint8 public decimals; //A public varable of our Token Decimals(How much can our token can be divisible into)

    //An event declared as per ERC20 Requirments (To view the variables in logs)
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    //An event declared as per ERC20 Requirments (To view the variables in logs)
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
    //We will be defining the total supply of our token in variable supply
    uint supply;

    //This mapping will be responsible to hold  the balances of our accounts.
    mapping (address => uint) public balances;

    //Mapping having a nested mapping e.g Key:Our Address will call another mapping(Key: from and Value: amount)
    mapping (address => mapping(address => uint)) public allowance;

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

    //Transfer function that will take an address _to and value to transfer as _value
    function transfer(address _to, uint256 _value) public returns (bool success)
    {
        require(balances[msg.sender] >= _value,"Not enough Balance"); //Checking for enough balance
        balances[msg.sender] -= _value; //deducting the _value from msg.sender
        balances[_to] += _value; //adding the given _value to the address to transfer
        emit Transfer(msg.sender, _to, _value); //calling the event Transfer
        return true; //Returning true if things go well
    }

    //This function approve is going to approve the Account B to spend Some Account of Tokens on our behalf
    //E.g. If we list our tokens on an exchange we approve exchange to send/transfer our tokens 
    function approve(address _spender, uint256 _value) public returns (bool success){
        allowance[msg.sender][_spender] = _value; //mapping that will be recording the allowances from our address 
        emit Approval(msg.sender, _spender, _value); //Approval event to be subscribed
        return true; //Returning true if things go well
    }
    
    //Function transferFrom() will allow the B address that recieved TOkens from us to spend the allowance tokens
     function transferFrom(address _from,address _to,uint256 _value) public returns (bool success) {
        require(balances[_from] >= _value,"Not enough Balance"); //Checking from mapping that the balance of given address is greater than or = to value give.
        require(allowance[_from][msg.sender] >= _value,"Not Approved Amount"); //Checking if the allowance that we gave. _from to function executor is greater or equals to _value

        balances[_from] -= _value; //deducting the given balance/token from the _from address
        balances[_to] += _value; //increasing the given balance/token to the _to address
        allowance[_from][msg.sender] -= _value; //deducting the _value token given to spend from total spending.
        emit Transfer(_from, _to, _value); //calling the event Transfer
        return true; //Returning true if things go well
    }
    }