import { getChainlinkOracles, getPythOracles } from "../../helpers/market-config-helpers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { COMMON_DEPLOY_PARAMS } from "../../helpers/env";
import { V3_CORE_VERSION, ZERO_ADDRESS } from "../../helpers/constants";
import {
    FALLBACK_ORACLE_ID,
    ORACLE_ID,
    POOL_ADDRESSES_PROVIDER_ID,
    PYTH_ORACLE_ID,
} from "../../helpers/deploy-ids";
import {
    loadPoolConfig,
    ConfigNames,
    getParamPerNetwork,
    checkRequiredEnvironment,
    getReserveAddresses,
} from "../../helpers/market-config-helpers";
import { eNetwork, ICommonConfiguration, SymbolMap } from "../../helpers/types";
import { getPairsTokenAggregator } from "../../helpers/init-helpers";
import { parseUnits } from "ethers/lib/utils";
import { MARKET_NAME } from "../../helpers/env";
import { PoolAddressesProvider } from "../../typechain";
import { getAddress } from "@ethersproject/address";

const func: DeployFunction = async function ({
    getNamedAccounts,
    deployments,
    ...hre
}: HardhatRuntimeEnvironment) {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const poolConfig = await loadPoolConfig(MARKET_NAME as ConfigNames);
    const network = (
        process.env.FORK ? process.env.FORK : hre.network.name
    ) as eNetwork;

    const { OracleQuoteUnit } = poolConfig as ICommonConfiguration;

    const reserveAssets = await getReserveAddresses(poolConfig, network);
    const pythAggregators = await getPythOracles(poolConfig, network);

    let [assets, sources] = getPairsTokenAggregator(
        reserveAssets,
        pythAggregators
    );
    assets = assets.map((asset: string) => asset.toLocaleLowerCase());
    const _synthex = "0xf99Ee3c876aaa586511051B085991f0221De1fd7";

    const configPriceOracle = (await deployments.get(ORACLE_ID)).address;
    // console.log("asset", assets);
    // console.log("sources", sources);
    const oracleAddress = getAddress(configPriceOracle);
    const fallbackOracleAddress = oracleAddress;
    const pyth = poolConfig.PythId;
    const pool = ZERO_ADDRESS;
    const units = parseUnits("1", OracleQuoteUnit);
    const CUSD = "0xBcD77D9073d61A72bf5650D3c694ab0aD4384832".toLocaleLowerCase();
    const FUSD = "0x2Ea0938813f8C04Cf6b34cA7828A45a7Aa1900D0".toLocaleLowerCase();
    const BASE_CURRENCYS = [CUSD, FUSD];
    const BASE_CURRENCY_UNITS = [units, units];

    await deploy(PYTH_ORACLE_ID, {
        from: deployer,
        args: [
            _synthex,
            pyth,
            pool,
            assets,
            sources,
            fallbackOracleAddress,
            BASE_CURRENCYS,
            BASE_CURRENCY_UNITS
        ],
        ...COMMON_DEPLOY_PARAMS,
        contract: "PythOracle",
    });
    return true;
};

func.id = `PythOracles:${MARKET_NAME}:aave-v3-core@${V3_CORE_VERSION}`;

func.tags = ["market", "pythOracle"];

func.dependencies = ["before-deploy", "oracle"];

func.skip = async () => checkRequiredEnvironment();

export default func;
