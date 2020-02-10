const MyToken = artifacts.require('MyToken');
contract("MyToken",accounts  =>{
  it('Should check the initial balance', async()=>{
    const token = await MyToken.deployed();
    const supply = await token.totalSupply();
    assert(supply == 10000);
  });

  it("Checkng the balance should be greater", async()=>{
    const token = await MyToken.deployed();
    try {
      await token.transfer.call(accounts[1],9999999);
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
     await token.transfer.call(accounts[1],9999);
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
});