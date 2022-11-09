const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const crud = await deploy("Crud", {
    from: deployer,
    log: true,
    args: [],
  });
  if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
    await verify(crud.address, []);
  }
  console.log(`Contract deployed at ${crud.address}`);
};
