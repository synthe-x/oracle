import { expect } from "chai";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import {
  ConfigNames,
  getMockPool,
  getMockL2Pool,
  getPythOracle,
  ICommonConfiguration,
  L2_POOL_IMPL_ID,
  loadPoolConfig,
  getPool,
  getWrappedTokenGateway,
  ZERO_ADDRESS,
  oneEther,
  WRAPPED_NATIVE_TOKEN_PER_NETWORK,
  getMockStableDebtToken,
  WrappedTokenGatewayV3,
  Pool,
  MockAToken,
  MockToken,
  getWETH,
  getAToken,
  getPoolAddressesProvider,
  ATOKEN_IMPL_ID,
  POOL_ADDRESSES_PROVIDER_ID,
  getAaveProtocolDataProvider,

} from "../../helpers";

import {
  getEthersSigners,
  getFirstSigner,
} from "../../helpers/utilities/signer";
import { waitForTx } from "../../helpers/utilities/tx";
import { parseEther } from "ethers/lib/utils";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js"
import { ethers } from "hardhat";
import { BaseContract, Contract, Signer } from "ethers";
import { execPath } from "process";
// Prevent error HH9 when importing this file inside tasks or helpers at Hardhat config load
declare var hre: HardhatRuntimeEnvironment;
let pool: Pool, usdc: MockToken, wrapper: WrappedTokenGatewayV3;
let poolConfig: ICommonConfiguration;
let deployer: Signer, user: Signer, user2: Signer, user3: Signer, user4: Signer;
let priceFeedUpdateData: string[];
describe("Testing Oracles", function () {


  before(async () => {
    expect(process.env.MARKET_NAME).equal("Mantle");

    await hre.deployments.fixture(["market", "periphery-post", "after-deploy"]);

    deployer = await getFirstSigner();

    poolConfig = loadPoolConfig((process.env.MARKET_NAME || "") as ConfigNames);

    [, , user, user2, user3, user4] = await getEthersSigners();

    const pythPriceService = new EvmPriceServiceConnection('https://xc-testnet.pyth.network');

    priceFeedUpdateData = await pythPriceService.getPriceFeedsUpdateData([
      "0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722",
      "0x0e9ec6a3f2fba0a3df73db71c84d736b8fc1970577639c9456a2fee0c8f66d93",
      "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
      "0x1fc18861232290221461220bd4e2acd1dcdfbc89c84092c93c18bdc7756c1588",
      "0xecf553770d9b10965f8fb64771e93f5690a182edc32be4a3236e0caaa6e0581a",
      "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b",
      "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
      "0xbfaf7739cb6fe3e1c57a0ac08e1d931e9e6062d476fa57804e165ab572b5b621",
      "0xafcc9a5bb5eefd55e12b6f0b4c8e6bccf72b785134ee232a5d175afd082e8832",
      "0xa29b53fbc56604ef1f2b65e89e48b0f09bb77b3fb890f4c70ee8cbd68a12a94b",
      "0xabb1a3382ab1c96282e4ee8c847acc0efdb35f0564924b35f3246e8f401b2a3d",
      "0x4e10201a9ad79892f1b4e9a468908f061f330272c7987ddc6506a254f77becd7",
    ]);

    pool = await getPool();
    usdc = await ethers.getContractAt("MockToken", "0x0134369386a3aebcf0704946c0df89fe78fa2b50");
    wrapper = await getWrappedTokenGateway();
  });

  describe("Test pyth oracle", () => {


    it("check pyth asset", async () => {

        const pythOracle = await getPythOracle();
        const ETH = "0x43d9c2dec2a83079641feafdabc4719bb362aacf";
        const price = await pythOracle.getSourceOfAsset(ETH);
        console.log(price);
    });





  });

  // describe("Perform user actions", () => {
  //   it("Supply WETH via WrappedTokenGateway", async () => {
  //     const deployer = await getFirstSigner();
  //     const [, , user] = await getEthersSigners();
  //     const userAddress = await user.getAddress();
  //     const wrapper = await getWrappedTokenGateway();
  //     const pool = await getPool();

  //     await expect(
  //       wrapper
  //         .connect(user)
  //         .depositETH(ZERO_ADDRESS, userAddress, 0, { value: oneEther })
  //     ).to.emit(pool, "Supply");

  //     await expect(
  //       wrapper.depositETH(ZERO_ADDRESS, await deployer.getAddress(), 0, {
  //         value: parseEther("100"),
  //       })
  //     ).to.emit(pool, "Supply");
  //   });
  //   it("Borrow WETH variable debt via WrappedTokenGateway", async () => {
  //     const [, , user] = await getEthersSigners();
  //     const wrapper = await getWrappedTokenGateway();
  //     const pool = await getPool();
  //     const weth = WRAPPED_NATIVE_TOKEN_PER_NETWORK["arbitrumGoerli"];
  //     const data = await pool.getReserveData(weth);
  //     const borrowSize = oneEther.div(4);
  //     const debtToken = await hre.ethers.getContractAt(
  //       "VariableDebtToken",
  //       data.variableDebtTokenAddress
  //     );
  //     await waitForTx(
  //       await debtToken
  //         .connect(user)
  //         .approveDelegation(wrapper.address, borrowSize)
  //     );
  //     await expect(
  //       wrapper.connect(user).borrowETH(ZERO_ADDRESS, borrowSize, 2, 0)
  //     ).to.emit(pool, "Borrow");
  //   });
  //   it("Repay WETH variable debt via WrappedTokenGateway", async () => {
  //     const [, , user] = await getEthersSigners();
  //     const userAddress = await user.getAddress();
  //     const wrapper = await getWrappedTokenGateway();
  //     const pool = await getPool();
  //     const weth = WRAPPED_NATIVE_TOKEN_PER_NETWORK["arbitrumGoerli"];
  //     const data = await pool.getReserveData(weth);

  //     await expect(
  //       wrapper
  //         .connect(user)
  //         .repayETH(ZERO_ADDRESS, oneEther.div(4), 2, userAddress, {
  //           value: oneEther.div(4),
  //         })
  //     ).to.emit(pool, "Repay");
  //   });
  // });
});
