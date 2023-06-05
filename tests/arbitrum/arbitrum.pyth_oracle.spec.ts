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

} from "../../helpers";

import {
    getEthersSigners,
    getFirstSigner,
} from "../../helpers/utilities/signer";
import { waitForTx } from "../../helpers/utilities/tx";
import { parseEther } from "ethers/lib/utils";

// Prevent error HH9 when importing this file inside tasks or helpers at Hardhat config load
declare var hre: HardhatRuntimeEnvironment;

describe("Testing Oracles", function () {
    let poolConfig: ICommonConfiguration;
    before(async () => {
        expect(process.env.MARKET_NAME).equal("Arbitrum");

        await hre.deployments.fixture(["market", "periphery-post", "after-deploy"]);

        poolConfig = loadPoolConfig((process.env.MARKET_NAME || "") as ConfigNames);
    });

    describe("Test pyth oracle", () => {
        it("getting price from pyth oracle", async () => {
            const [, , user] = await getEthersSigners();
            const deployer = await getFirstSigner();
            const pool = await getPool();
           
           const supply = await pool.connect(user).getReservesList();
           const userAddress = await user.getAddress();
           const wrapper = await getWrappedTokenGateway();

           await expect(
            wrapper
                .connect(user)
                .depositETH(ZERO_ADDRESS, userAddress, 0, { value: oneEther })
        ).to.emit(pool, "Supply");

            
        });
    });

    describe("Perform user actions", () => {
        it("Supply WETH via WrappedTokenGateway", async () => {
          const deployer = await getFirstSigner();
          const [, , user] = await getEthersSigners();
          const userAddress = await user.getAddress();
          const wrapper = await getWrappedTokenGateway();
          const pool = await getPool();
    
          await expect(
            wrapper
              .connect(user)
              .depositETH(ZERO_ADDRESS, userAddress, 0, { value: oneEther })
          ).to.emit(pool, "Supply");
    
          await expect(
            wrapper.depositETH(ZERO_ADDRESS, await deployer.getAddress(), 0, {
              value: parseEther("100"),
            })
          ).to.emit(pool, "Supply");
        });
        it("Borrow WETH variable debt via WrappedTokenGateway", async () => {
          const [, , user] = await getEthersSigners();
          const wrapper = await getWrappedTokenGateway();
          const pool = await getPool();
          const weth = WRAPPED_NATIVE_TOKEN_PER_NETWORK["arbitrumGoerli"];
          const data = await pool.getReserveData(weth);
          const borrowSize = oneEther.div(4);
          const debtToken = await hre.ethers.getContractAt(
            "VariableDebtToken",
            data.variableDebtTokenAddress
          );
          await waitForTx(
            await debtToken
              .connect(user)
              .approveDelegation(wrapper.address, borrowSize)
          );
          await expect(
            wrapper.connect(user).borrowETH(ZERO_ADDRESS, borrowSize, 2, 0)
          ).to.emit(pool, "Borrow");
        });
        it("Repay WETH variable debt via WrappedTokenGateway", async () => {
          const [, , user] = await getEthersSigners();
          const userAddress = await user.getAddress();
          const wrapper = await getWrappedTokenGateway();
          const pool = await getPool();
          const weth = WRAPPED_NATIVE_TOKEN_PER_NETWORK["arbitrumGoerli"];
          const data = await pool.getReserveData(weth);
    
          await expect(
            wrapper
              .connect(user)
              .repayETH(ZERO_ADDRESS, oneEther.div(4), 2, userAddress, {
                value: oneEther.div(4),
              })
          ).to.emit(pool, "Repay");
        });
      });
});
