const { CommonsConfig } = require("../../markets/aave/commons");
const { MantleConfig } = require("../../markets/mantle/index");

const { ethers } = require("hardhat");
const hre = require("hardhat");

const RewardsController = '0x3A5AD67Cda40a8C0dC3D90F5Ae177088d011acC7';
const RewardsAdmin = '0xBf59B84c9a7aD688D87ABe3357f70039C1540006'; // deployer address
const RewardsVault = '0x0eD6a1F7a99E8Bc1c752E4515f7AB3aFe20BdBF7'; // deployer address

const veREAX = '0x986B7E081083FA4B202e93Ce85d8300D4657857A';

const ASSETS = [
    '0x71739632Df42FBEA512113185A97F9d051120984', 
    '0x7d10CB8FB5Dd17Efc8B585b58628DfBcBa264ea7', 
    // '0xF7385e3209CD34d0BE263264f0d32C774C9f14a7',
    '0xbd79B72B29cACA0C301Def534cF11BF5FC6D02E6',
    '0xc8c4298bE0F6B19cECfAb845FF27dE450d4a32a1',
    // '0x96E7AED0285A0F0Cc3547095A32Cb5e3344e4F69',
    '0x0a897b22ecDFc32031360cB3009A86aca8bfcf31',
    '0x6445655364463B9009C5F3a5E8fde8e1e3e25934',
    // '0x0BcCDf533aC238Ae07009d002dD59AF4e4F25fc3'
];

const main = async () => {
    const eManager = await ethers.getContractAt("EmissionManager", "0xe3cfb601C0E58Efe1CbC4b5512DE149Cf213D36B");
    const rewardsController = await ethers.getContractAt("RewardsController", RewardsController);
    // deploy PullRewardsTransferStrategy
    // const PullRewardsTransferStrategy = await ethers.getContractFactory("PullRewardsTransferStrategy");
    // const pullRewardsTransferStrategy = await PullRewardsTransferStrategy.deploy(RewardsController, RewardsAdmin, RewardsVault);
    // await pullRewardsTransferStrategy.deployed();

    // let input = [];
    // for(let i in ASSETS){
    //     input.push({});
    //     input[i].reward = veREAX;
    //     input[i].asset = ASSETS[i];
    //     input[i].rewardOracle = '0x1B91b5568f1ca4D8b0BF76e5603dca9234DDF66e'; // Dummy feed return '1'
    //     // distributionEnd
    //     input[i].distributionEnd = Number((Date.now()/1000).toFixed(0)) + 60*60*24*365; // 1 year
    //     // transferStrategy
    //     input[i].transferStrategy = '0x00f7b6DCc8f4D14CB90231307524D4c85A773Ae9'; // pullRewardsTransferStrategy.address;
    //     input[i].totalSupply = 0;
    //     // emissionPerSecond
    //     input[i].emissionPerSecond = 1e17.toString();
    //     /**
    //      * uint88 emissionPerSecond;
    // uint256 totalSupply;
    // uint32 distributionEnd;
    // address asset;
    // address reward;
    // ITransferStrategyBase transferStrategy;
    // IEACAggregatorProxy rewardOracle;
    //      */
    // }
    // console.log(input);
    // console.log(await eManager.owner());
    // await eManager.setEmissionAdmin(input[0].reward, RewardsAdmin);
    // await eManager.configureAssets(input)

    console.log(await rewardsController.callStatic.claimAllRewards(ASSETS, RewardsVault));
}

main()