const MyToken = artifacts.require('MyToken');
contract("MyToken",accounts  =>{
  it('Should check the initial balance', async()=>{
    const token = await MyToken.deployed();
    const supply = await token.totalSupply();
    assert(supply == 10000000);
  });

  it("Checkng the balance should be greater", async()=>{
    const token = await MyToken.deployed();
    try {
      await token.transfer.call(accounts[1],9999999999);
    } 
    catch (error) {
      assert(error.message.includes("Not Equal amount doesnt exists"));
      return;
    }
  assert(true);
  });

  it("Transfer of Tokens to another account", async()=>{
    const token = await MyToken.deployed();
    try {
      await token.transfer(accounts[1],9999);
    //  const trans = await token.transfer(accounts[1],9999);
    //  const transcall = await token.transfer.call(accounts[1],9999);

    //  assert.equal(trans.logs.length,1,"Triggered One Event");
    //  assert.equal(trans.logs[0].event,'Tranfser',"Should be a 'Transfer' event");
    //  assert.equal(trans.logs[0].args._to, accounts[1],'logs the account the tokens are transferred to');
    //  assert.equal(trans.logs[0].args._value, 9999, 'logs the transfer amount');

    } 
    catch (error) {
      assert(error.message.includes("Not Equal amount doesnt exists"));
      return;
    }
  assert(true);
  });

  it("Checking the Balance", async()=>{
    const token = await MyToken.deployed();
    const bal = await token.balanceOf(accounts[0]);
    console.log(bal.toNumber());
    console.log(accounts[0]);
    assert(bal != 0);
  });

  it("Approves the Tokens to transfer", async()=>{
    const token = await MyToken.deployed();
    const approvecall = await token.approve.call(accounts[1],200);
    const approve = await token.approve(accounts[1],200);
    assert.equal(approve.logs.length,1,"Trigger One Event");
    assert.equal(approve.logs[0].event,'Approval','should be the Approval event');
    assert.equal(approve.logs[0].args._owner, accounts[0],'Logs the authorizing account');
    assert.equal(approve.logs[0].args._spender, accounts[1],'Logs the to be authorized account');
    assert.equal(approve.logs[0].args._value, 200,'Log the transfer amount');
    assert.equal(approvecall,true,"It returns true");
  });

  it("Checks the allowance", async()=>{
    const token = await MyToken.deployed();
    const allow = await token.allowance(accounts[0],accounts[1]);
    assert(allow, 200);

  });

  it
  ("Handles the TransferFrom Function",async()=>{
    const token = await MyToken.deployed();
    let fromAccount = accounts[2];
    let toAccount = accounts[3];
    let spendingAccount = accounts[4];
    const trans = await token.transfer(fromAccount, 100);
    // // assert(trans,100);
      await token.approve(spendingAccount, 20,{from : fromAccount});
     let transF = await token.transferFrom(fromAccount, toAccount, 10,{from : spendingAccount});
     let transFcall = await token.transferFrom.call(fromAccount, toAccount, 10,{from : spendingAccount});
     assert.equal(transFcall, true);
    
    //  assert.equal(transF.logs.length,1,"Triggered One Event");
    //  assert.equal(transF.logs[0].event,'Tranfser',"Should be a 'Transfer' event");
    //  assert.equal(transF.logs[0].args._from, fromAccount,'logs the account the tokens are transferred to');
    //  assert.equal(transF.logs[0].args._to, toAccount,'logs the account the tokens are transferred to');
    //  assert.equal(transF.logs[0].args._value, 10, 'logs the transfer amount');

     let bal = await token.balanceOf(toAccount);
    console.log(bal.toNumber());
  });

});