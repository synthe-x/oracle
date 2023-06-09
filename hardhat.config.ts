import {
  DETERMINISTIC_DEPLOYMENT,
  DETERMINISTIC_FACTORIES,
  ETHERSCAN_KEY,
  getCommonNetworkConfig,
  hardhatNetworkSettings,
  loadTasks,
} from "./helpers/hardhat-config-helpers";
import {
  eArbitrumNetwork,
  eAvalancheNetwork,
  eEthereumNetwork,
  eFantomNetwork,
  eHarmonyNetwork,
  eOptimismNetwork,
  ePolygonNetwork,
  eTenderly,
} from "./helpers/types";
import { DEFAULT_NAMED_ACCOUNTS } from "./helpers/constants";

import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-contract-sizer";
import "hardhat-dependency-compiler";
import "@nomicfoundation/hardhat-chai-matchers";
import path from "path";

const SKIP_LOAD = process.env.SKIP_LOAD === "true";
const TASK_FOLDERS = ["misc", "market-registry"];

// Prevent to load tasks before compilation and typechain
if (!SKIP_LOAD) {
  loadTasks(TASK_FOLDERS);
}


// import { TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS }  from "hardhat/builtin-tasks/task-names";
// import { subtask } from "hardhat/config";


// subtask(
//   TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS,
//   async (_, { config }, runSuper) => {
//     const paths = await runSuper();

//     return paths
//       .filter((solidityFilePath: string) => {
//         const relativePath = path.relative(config.paths.sources, solidityFilePath)
//         console.log("path",solidityFilePath);
//         return relativePath !== "Bar.sol";
//       })
//   }
// );

export default {
  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
    disambiguatePaths: false,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
          evmVersion: "berlin",
        },
      },
      {
        version: "0.7.5",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
        },
      },
    ],
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  ignoreFiles: [
    "@aave/**"
  ],
  networks: {
    hardhat: hardhatNetworkSettings,
    localhost: {
      url: "http://127.0.0.1:8545",
      ...hardhatNetworkSettings,
    },
    tenderly: getCommonNetworkConfig("tenderly", 3030),
    main: getCommonNetworkConfig(eEthereumNetwork.main, 1),
    kovan: getCommonNetworkConfig(eEthereumNetwork.kovan, 42),
    rinkeby: getCommonNetworkConfig(eEthereumNetwork.rinkeby, 4),
    ropsten: getCommonNetworkConfig(eEthereumNetwork.ropsten, 3),
    [ePolygonNetwork.polygon]: getCommonNetworkConfig(
      ePolygonNetwork.polygon,
      137
    ),
    [ePolygonNetwork.mumbai]: getCommonNetworkConfig(
      ePolygonNetwork.mumbai,
      80001
    ),
    arbitrum: getCommonNetworkConfig(eArbitrumNetwork.arbitrum, 42161),
    [eArbitrumNetwork.arbitrumTestnet]: getCommonNetworkConfig(
      eArbitrumNetwork.arbitrumTestnet,
      421611
    ),
    [eArbitrumNetwork.arbitrumGoerli]: getCommonNetworkConfig(
      eArbitrumNetwork.arbitrumGoerli,
      421613
    ),
    [eHarmonyNetwork.main]: getCommonNetworkConfig(
      eHarmonyNetwork.main,
      1666600000
    ),
    [eHarmonyNetwork.testnet]: getCommonNetworkConfig(
      eHarmonyNetwork.testnet,
      1666700000
    ),
    [eAvalancheNetwork.avalanche]: getCommonNetworkConfig(
      eAvalancheNetwork.avalanche,
      43114
    ),
    [eAvalancheNetwork.fuji]: getCommonNetworkConfig(
      eAvalancheNetwork.fuji,
      43113
    ),
    [eFantomNetwork.main]: getCommonNetworkConfig(eFantomNetwork.main, 250),
    [eFantomNetwork.testnet]: getCommonNetworkConfig(
      eFantomNetwork.testnet,
      4002
    ),
    [eOptimismNetwork.testnet]: getCommonNetworkConfig(
      eOptimismNetwork.testnet,
      420
    ),
    [eOptimismNetwork.main]: getCommonNetworkConfig(eOptimismNetwork.main, 10),
    [eEthereumNetwork.goerli]: getCommonNetworkConfig(
      eEthereumNetwork.goerli,
      5
    ),
    [eEthereumNetwork.sepolia]: getCommonNetworkConfig(
      eEthereumNetwork.sepolia,
      11155111
    ),
    [eArbitrumNetwork.goerliNitro]: getCommonNetworkConfig(
      eArbitrumNetwork.goerliNitro,
      421613
    ),
  },
  namedAccounts: {
    ...DEFAULT_NAMED_ACCOUNTS,
  },
  mocha: {
    timeout: 0,
  },
  dependencyCompiler: {
    paths: [
      "contracts/aave-core-v3/contracts/protocol/configuration/PoolAddressesProviderRegistry.sol",
      "contracts/aave-core-v3/contracts/protocol/configuration/PoolAddressesProvider.sol",
      "contracts/aave-core-v3/contracts/misc/AaveOracle.sol",
      "contracts/aave-core-v3/contracts/protocol/tokenization/AToken.sol",
      "contracts/aave-core-v3/contracts/protocol/tokenization/DelegationAwareAToken.sol",
      "contracts/aave-core-v3/contracts/protocol/tokenization/StableDebtToken.sol",
      "contracts/aave-core-v3/contracts/protocol/tokenization/VariableDebtToken.sol",
      "contracts/aave-core-v3/contracts/protocol/libraries/logic/GenericLogic.sol",
      "contracts/aave-core-v3/contracts/protocol/libraries/logic/ValidationLogic.sol",
      "contracts/aave-core-v3/contracts/protocol/libraries/logic/ReserveLogic.sol",
      "contracts/aave-core-v3/contracts/protocol/libraries/logic/SupplyLogic.sol",
      "contracts/aave-core-v3/contracts/protocol/libraries/logic/EModeLogic.sol",
      "contracts/aave-core-v3/contracts/protocol/libraries/logic/BorrowLogic.sol",
      "contracts/aave-core-v3/contracts/protocol/libraries/logic/BridgeLogic.sol",
      "contracts/aave-core-v3/contracts/protocol/libraries/logic/FlashLoanLogic.sol",
      "contracts/aave-core-v3/contracts/protocol/libraries/logic/CalldataLogic.sol",
      "contracts/aave-core-v3/contracts/protocol/pool/Pool.sol",
      "contracts/aave-core-v3/contracts/protocol/pool/L2Pool.sol",
      "contracts/aave-core-v3/contracts/protocol/pool/PoolConfigurator.sol",
      "contracts/aave-core-v3/contracts/protocol/pool/DefaultReserveInterestRateStrategy.sol",
      "contracts/aave-core-v3/contracts/protocol/libraries/aave-upgradeability/InitializableImmutableAdminUpgradeabilityProxy.sol",
      "contracts/aave-core-v3/contracts/dependencies/openzeppelin/upgradeability/InitializableAdminUpgradeabilityProxy.sol",
      "contracts/aave-core-v3/contracts/deployments/ReservesSetupHelper.sol",
      "contracts/aave-core-v3/contracts/misc/AaveProtocolDataProvider.sol",
      "contracts/aave-core-v3/contracts/misc/L2Encoder.sol",
      "contracts/aave-core-v3/contracts/protocol/configuration/ACLManager.sol",
      "contracts/aave-core-v3/contracts/dependencies/weth/WETH9.sol",
      "contracts/aave-core-v3/contracts/mocks/helpers/MockIncentivesController.sol",
      "contracts/aave-core-v3/contracts/mocks/helpers/MockReserveConfiguration.sol",
      "contracts/aave-core-v3/contracts/mocks/oracle/CLAggregators/MockAggregator.sol",
      "contracts/aave-core-v3/contracts/mocks/tokens/MintableERC20.sol",
      "contracts/aave-core-v3/contracts/mocks/flashloan/MockFlashLoanReceiver.sol",
      "contracts/aave-core-v3/contracts/mocks/tokens/WETH9Mocked.sol",
      "contracts/aave-core-v3/contracts/mocks/upgradeability/MockVariableDebtToken.sol",
      "contracts/aave-core-v3/contracts/mocks/upgradeability/MockAToken.sol",
      "contracts/aave-core-v3/contracts/mocks/upgradeability/MockStableDebtToken.sol",
      "contracts/aave-core-v3/contracts/mocks/upgradeability/MockInitializableImplementation.sol",
      "contracts/aave-core-v3/contracts/mocks/helpers/MockPool.sol",
      "contracts/aave-core-v3/contracts/mocks/helpers/MockL2Pool.sol",
      "contracts/aave-core-v3/contracts/dependencies/openzeppelin/contracts/IERC20Detailed.sol",
      "contracts/aave-core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol",
      "contracts/aave-core-v3/contracts/mocks/oracle/PriceOracle.sol",
      "contracts/aave-core-v3/contracts/mocks/tokens/MintableDelegationERC20.sol",
      "contracts/aave-periphery-v3/contracts/misc/UiPoolDataProviderV3.sol",
      "contracts/aave-periphery-v3/contracts/misc/WalletBalanceProvider.sol",
      "contracts/aave-periphery-v3/contracts/misc/WrappedTokenGatewayV3.sol",
      "contracts/aave-periphery-v3/contracts/misc/interfaces/IWETH.sol",
      "contracts/aave-periphery-v3/contracts/misc/UiIncentiveDataProviderV3.sol",
      "contracts/aave-periphery-v3/contracts/rewards/RewardsController.sol",
      "contracts/aave-periphery-v3/contracts/rewards/transfer-strategies/StakedTokenTransferStrategy.sol",
      "contracts/aave-periphery-v3/contracts/rewards/transfer-strategies/PullRewardsTransferStrategy.sol",
      "contracts/aave-periphery-v3/contracts/rewards/EmissionManager.sol",
      "contracts/aave-periphery-v3/contracts/mocks/WETH9Mock.sol",
      "contracts/aave-periphery-v3/contracts/mocks/testnet-helpers/Faucet.sol",
      "contracts/aave-periphery-v3/contracts/mocks/testnet-helpers/TestnetERC20.sol",
      "contracts/aave-periphery-v3/contracts/treasury/Collector.sol",
      "contracts/aave-periphery-v3/contracts/treasury/CollectorController.sol",
      "contracts/aave-periphery-v3/contracts/treasury/AaveEcosystemReserveV2.sol",
      "contracts/aave-periphery-v3/contracts/treasury/AaveEcosystemReserveController.sol",
      "contracts/aave-periphery-v3/contracts/adapters/paraswap/ParaSwapLiquiditySwapAdapter.sol",
      "contracts/aave-periphery-v3/contracts/adapters/paraswap/ParaSwapRepayAdapter.sol",
      "@aave/safety-module/contracts/stake/StakedAave.sol",
      "@aave/safety-module/contracts/stake/StakedAaveV2.sol",
      "@aave/safety-module/contracts/proposals/extend-stkaave-distribution/StakedTokenV2Rev3.sol",
    ],
  },
  // paths:{
  //   artifacts: "./artifacts1"
  // },
  deterministicDeployment: DETERMINISTIC_DEPLOYMENT
  ? DETERMINISTIC_FACTORIES
    : undefined,
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};
