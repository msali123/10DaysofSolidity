const MyToken = artifacts.require('MyToken');
// npm install truffle-assertions
const truffleAssert = require('truffle-assertions');

contract("MyToken", (accounts)  =>{
  let instance;
  beforeEach('should setup the contract instance', async () => {
    instance = await MyToken.deployed();
  });

  it('Should check the initial balance', async()=>{
    const supply = await instance.totalSupply();
    assert(supply == 10000000);
  });

  it("Checkng the balance should not be greater in transfer", async()=>{
    try {
      await instance.transfer.call(accounts[1],9999999999);
    } 
    catch (error) {
      assert(error.message.includes("Not Equal amount doesnt exists"));
      return;
    }
  assert(true);
  });

  it("Transfer of Tokens to another account", async()=>{
    try {
      await instance.transfer(accounts[1],9999);
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
    const bal = await instance.balanceOf(accounts[0]);
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
    const allow = await instance.allowance(accounts[0],accounts[1]);
    assert(allow, 200);

  });

  it("Handles the TransferFrom Function",async()=>{
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


  it('should emit with correct paremeters of event Approval', async()=>{
    let result = await instance.approve(accounts[4], 20,{from :accounts[2]} );
    // truffleAssert.prettyPrintEmittedEvents(result);
    truffleAssert.eventEmitted(result, 'Approval', (event) =>{
      return (event._owner == accounts[2] && event._spender == accounts[4] && event._value ==20);
    });
  });

});