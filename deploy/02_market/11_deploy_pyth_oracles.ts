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
import { BigNumber } from "ethers";

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

    const { OracleQuoteUnit, OracleQuoteCurrencyAddress, SynthexAddress, PythId } = poolConfig as ICommonConfiguration;

    const reserveAssets = await getReserveAddresses(poolConfig, network);
    const pythAggregators = await getPythOracles(poolConfig, network);

    let [assets, sources] = getPairsTokenAggregator(
        reserveAssets,
        pythAggregators
    );
    assets = assets.map((asset: string) => asset.toLocaleLowerCase());
    let _synthex = ZERO_ADDRESS;

    const configPriceOracle = (await deployments.get(ORACLE_ID)).address;
    const oracleAddress = getAddress(configPriceOracle);
    const fallbackOracleAddress = oracleAddress;
    const pyth = PythId ?? ZERO_ADDRESS;
    const pool = ZERO_ADDRESS;
    let BASE_CURRENCY_UNITS: BigNumber[];

    if (Array.isArray(OracleQuoteUnit)) {
        BASE_CURRENCY_UNITS = OracleQuoteUnit.map((unit: string) => parseUnits("1", unit));
    }
    else {
        BASE_CURRENCY_UNITS = [parseUnits("1", OracleQuoteUnit)];
    }

    let BASE_CURRENCYS: string[];

    if (Array.isArray(OracleQuoteCurrencyAddress)) {
        BASE_CURRENCYS = OracleQuoteCurrencyAddress.map((address: string) => address.toLocaleLowerCase());
    }
    else {
        BASE_CURRENCYS = [OracleQuoteCurrencyAddress.toLocaleLowerCase()];
    }

    if(SynthexAddress){
        _synthex = SynthexAddress
    }

    // const units = parseUnits("1", OracleQuoteUnit);
    // const CUSD = "0x1b88ABb8Bd559aecF682Aec5f554967d5394583F".toLocaleLowerCase();
    // const SUSD = "0xe3c0de2996C03fB2d6090E652bd4311641117efd".toLocaleLowerCase();
    // const BASE_CURRENCYS = [CUSD, SUSD];
    // const BASE_CURRENCY_UNITS = [units, units];

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
