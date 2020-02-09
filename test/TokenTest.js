const MyToken = artifacts.require('MyToken');
contract("MyToken", () =>{
  it('Should check the initial balance', async()=>{
    const token = await MyToken.deployed();
    const supply = await token.totalSupply();
    assert(supply == 10000);
  });

  it("Transfer of Tokens to another account", async()=>{
    const token = await MyToken.deployed();
    try {
      await token.transfer("0xc41173b46e5F21F5FA4947959dB90AC544C2ef5d",9999);
    } 
    catch (error) {
      assert(error.message.includes("Not Equal amount doesnt exists"));
      return;
    }
  assert(true);
  });

  it("Checking the Balance", async()=>{
    const token = await MyToken.deployed();
    const bal = await token.balanceOf.call("0x3a38E94f0662c2407194074F9F7d69A3CDCEc479");
    console.log(bal.toNumber());
    assert(bal != 0);
  });

});