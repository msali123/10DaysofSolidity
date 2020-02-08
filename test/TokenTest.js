const MyToken = artifacts.require('MyToken');
contract("MyToken", () =>{
  it('Should check the initial balance', async()=>{
    const token = await MyToken.deployed();
    const supply = await token.totalSupply();
    assert(supply == 10000);
  });
});