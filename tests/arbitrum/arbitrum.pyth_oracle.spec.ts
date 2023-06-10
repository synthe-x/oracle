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
    expect(process.env.MARKET_NAME).equal("Arbitrum");

    await hre.deployments.fixture(["market", "periphery-post", "after-deploy"]);

    deployer = await getFirstSigner();

    poolConfig = loadPoolConfig((process.env.MARKET_NAME || "") as ConfigNames);

    [, , user, user2, user3, user4] = await getEthersSigners();

    const pythPriceService = new EvmPriceServiceConnection('https://xc-testnet.pyth.network');

    priceFeedUpdateData = await pythPriceService.getPriceFeedsUpdateData([
      "0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722",
      "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
      "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
      "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b",
      "0x1fc18861232290221461220bd4e2acd1dcdfbc89c84092c93c18bdc7756c1588",
      "0xc1b12769f6633798d45adfd62bfc70114839232e2949b01fb3d3f927d2606154",
      "0xbcbdc2755bd74a2065f9d3283c2b8acbd898e473bdb90a6764b3dbd467c56ecd",
    ]);

    pool = await getPool();
    usdc = await ethers.getContractAt("MockToken", "0xe87Ad4b7a14D8759BC92DAced7Ba243a23aCEc03");
    wrapper = await getWrappedTokenGateway();
  });

  describe("Test pyth oracle", () => {
    it("User supply usdc", async () => {
      const userAddress = await user.getAddress();
      //  wrapper = await getWrappedTokenGateway();
      const pythOracle = await getPythOracle();

      const transfer = await user.sendTransaction({ to: pythOracle.address, value: parseEther("10") });

      await expect(
        wrapper
          .connect(user)
          .depositETH(ZERO_ADDRESS, userAddress, 0, priceFeedUpdateData, { value: parseEther("10") })
      ).to.emit(pool, "Supply");

      await usdc.connect(user).mint(user.getAddress(), parseEther("100000"));
      const balance = await usdc.connect(user).balanceOf(user.getAddress());
      await usdc.connect(user).approve(pool.address, parseEther("100"));
      
      await expect(await pool.connect(user).supply(
        usdc.address,
        "100000000",
        userAddress,
        "0",
        priceFeedUpdateData
      )
      ).to.emit(pool,"Supply");

    });

    it("User2 Borrow usdc", async () => {
      // supply to pool
      // console.log(priceFeedUpdateData)
      const pool = await getPool();
      await expect(
        wrapper
          .connect(user)
          .depositETH(ZERO_ADDRESS, await user2.getAddress(), 0, priceFeedUpdateData, { value: parseEther("10") })
      ).to.emit(pool, "Supply");

      await expect( await pool.connect(user2).borrow(
        usdc.address,
        "1000000",
        2,
        0,
        await user2.getAddress(),
        priceFeedUpdateData
      )
      ).to.emit(pool, "Borrow");

    })

    it("User2 Repay usdc", async () => {

      await usdc.connect(user2).approve(pool.address, "1000000");
      await expect(await pool.connect(user2).repay(
        usdc.address,
        "1000000",
        2,
        await user2.getAddress(),
        priceFeedUpdateData
      )
      ).to.emit(pool, "Repay");
    });

    it("User1 withdraw usdc", async () => {

      await expect(await pool.connect(user).withdraw(
        usdc.address,
        "100000000",
        await user.getAddress(),
        priceFeedUpdateData
      )
      ).to.emit(pool,"Withdraw")
    })


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
