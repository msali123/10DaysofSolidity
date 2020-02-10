# 10DaysofSolidity

Starting my 10 days of code challenge.

Focusing on Solidity Smart Contract Development.

Will be trying to make a token according to ERC-20 Standards.

Following this article: (https://www.freecodecamp.org/news/how-to-make-programming-a-daily-habit/?fbclid=IwAR3Qbds7VPUm6Uy4N-E0vUtM0Ohl8T8UtfGYmzA-rHVVtT1G46P15Jh501M)

I will be committing daily with my progress

Day 1 starts from today.

#10daysofcode 

# Day1:

Commit Hash(a7cd35b2fe29ab2a0047fa66d851d95e1aa5c499)

Made a smart contract named MyToken & added a function of TotalSupply() according to ERC20.

``uint supply;`` <- Total supply of our token will be initialized in this variable of uint type.

The function ``totalSupply()`` will return our ``supply`` variable.

# Day2:

Commit Hash(6dc83eed2e5ff7a0a3911a789f6f9be3e0089ecc)

Made a ``mapping (address => uint) balances;`` to store the address as key and uint as their balance.

Function ``balanceOf()`` will take an argument as address and will return its respective balance.

# Day3:

Commit Hash(3ca80ba560ab9b86c10757161a0f60505b05c57a)

Added public variables or getter and setter for our Token's Name, Symbol & Decimals as per ERC20.

# Day4:

Commit Hash(69d35391cdeedee09140043b239be6c9eb310c6e)

Added Transfer event & transfer() function for our Token.

# Day5:

Commit Hash(e4237e209544dbbb0e299719db90bb0c93c68a63)

I've added Approval event, allowance mapping and an approve() function as per ERC20. I've commented with the code explaining the purpose.

# Day6:

Commit Hash(2af50423deffea02b1a6281cc24748374c18f903)

Finally implemented the last required function by ERC20 Standards. Well many functionalities are still missing ,will be trying tocover them up.

``transferFrom()`` will be taking 3 arguments (_from, _to, _value) 

``require(balances[_from] >= _value,"Not enough Balance");`` Checking from mapping that the balance of given address is greater than or = to value given.

``require(allowance[_from][msg.sender] >= _value,"Not Approved Amount");``Checking if the allowance that we gave. _from to function executor is greater or equals to _value.

If these above require's are successful then our function will move forward.
    
``balances[_from] -= _value;`` Deducting the given balance/token from the _from address.

``balances[_to] += _value;`` Increasing the given balance/token to the _to address.

``allowance[_from][msg.sender] -= _value;`` Deducting the _value token given to spend from total spending.

``emit Transfer(_from, _to, _value);`` Calling the event Transfer as it is required by Standards

 ``return true;`` Returning true if things go well

# Day7:

Commit Hash(3dab5feec8b7ccb2b14f17afeacb53370f8d3324)

Added a contructor that will take an argument as a ``_supply`` and will set that amount to our state level variable ``supply``.

Added a test case to check our ``totalSupply()`` function & you know what??? That passed :D

# Day8:

Commit Hash(dec261aaf937fc07fdd4a2f8f9763e31ebb19573)

Added a test to check our ``transfer()`` function running,

   * Tested with amount greater than the tokens available.
   * Tested with amount less than or equals the token available at senders address.
   
Added another test cases to check our ``balanceOf()`` function.

# Day9:

Commit Hash(3d1dcf787c46d229121e4f4cb0581e91d5435ff2)

Added a test case to test  ``approve()`` function, & also tested the events in it.

Done some changes with previous one's as well. 
