import { formatUnits } from "ethers/lib/utils";
import { task } from "hardhat/config";
import { hrtime } from "process";
import { getWalletBalances } from "../../helpers";
import { promises as fs } from "fs";
import path from "path";

task(`print-deployments`).setAction(
  async (_, { deployments, getNamedAccounts, ...hre }) => {
    const allDeployments = await deployments.all();

    let formattedDeployments: { [k: string]: { address: string } } = {};
    let mintableTokens: { [k: string]: { address: string } } = {};

    console.log("\nAccounts after deployment");
    console.log("========");
    console.table(await getWalletBalances());

    // Print deployed contracts
    console.log("\nDeployments");
    console.log("===========");
    Object.keys(allDeployments).forEach((key) => {
      if (!key.includes("Mintable")) {
        formattedDeployments[key] = {
          address: allDeployments[key].address,
        };
      }
    });

    let _deployments = formattedDeployments;
    const chainId = await hre.getChainId()
    await fs.writeFile((path.join(__dirname + `../../../deployments/${chainId}.json`)), JSON.stringify(_deployments));

    console.table(formattedDeployments);

    // Print Mintable Reserves and Rewards
    Object.keys(allDeployments).forEach((key) => {
      if (key.includes("Mintable")) {
        mintableTokens[key] = {
          address: allDeployments[key].address,
        };
      }
    });
    console.log("\nMintable Reserves and Rewards");
    console.table(mintableTokens);
  }
);
