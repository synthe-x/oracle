import { eArbitrumNetwork, eEthereumNetwork, eMantleNetwork, IAaveConfiguration } from "./../../helpers/types";
import AaveMarket from "../aave";
import { ZERO_ADDRESS } from "../../helpers";
import {
    strategyUSDC,
    strategyBIT,
    strategyETH,
    strategyUSDT,
    strategycBNB,
    strategycBTC,
    strategycETH,
    strategycUSD,
    strategycXRP,
    strategysAAPL,
    strategysCOIN,
    strategysGOOGL,
    strategysMSFT,
    strategysUSD

} from "./reservesConfig";

export const MantleConfig: IAaveConfiguration = {
    ...AaveMarket,
    SynthexAddress:"0x5741dcdBB4D3A44FE8555E8032E349206BfbFd84",
    PythId: "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729",
    MarketId: "Mantle Aave Market",
    ATokenNamePrefix: "Mantle",
    StableDebtTokenNamePrefix: "Mantle",
    VariableDebtTokenNamePrefix: "Mantle",
    SymbolPrefix: "MNT",
    OracleQuoteUnit: ['18', '18'],
    OracleQuoteCurrencyAddress: ["0x1b88ABb8Bd559aecF682Aec5f554967d5394583F", "0xe3c0de2996C03fB2d6090E652bd4311641117efd"],
    OracleQuoteCurrency: ["CUSD", "SUSD"],
    ProviderId: 40,
    ReservesConfig: {
        USDC: strategyUSDC,
        BIT: strategyBIT,
        ETH: strategyETH,
        USDT: strategyUSDT,
        CBNB: strategycBNB,
        CBTC: strategycBTC,
        CETH: strategycETH,
        CUSD: strategycUSD,
        CXRP: strategycXRP,
        SAAPL: strategysAAPL,
        SCOIN: strategysCOIN,
        SGOOGL: strategysGOOGL,
        SMSFT: strategysMSFT,
        SUSD: strategysUSD
    },
    ReserveAssets: {
        [eMantleNetwork.mantleTestnet]: {
            USDC: "0xc7bde95c4b5c62ce52b7edf8a2ab59437186028d",
            BIT: "0x55f317247632d42584848064a0cc0190fe1f6c58",
            ETH: "0x7d494f8fd66a9dcaa244bd496ea151fa71da74aa",
            USDT: "0x8a30a1ce8c7c8e238e7eee1982fc6ad798050133",
            CBNB: "0x1e54215EC35eeBE965BD401A90BD6bd1fcC46163",
            CBTC: "0xc8daA480043b724006d215219303B03CA9531a7A",
            CETH: "0x0e71fFAC901B92e43d543074c41a691D28644D49",
            CUSD: "0x1b88ABb8Bd559aecF682Aec5f554967d5394583F",
            CXRP: "0xDF75f29f0fb07ED2E1648bedF36194A8A643912C",
            SAAPL: "0x0158EeA6f3C84A22072bA103F08752A8ED4db551",
            SCOIN: "0xA24797057e3A08Ff27542Aa427e1FC734364e4E5",
            SGOOGL: "0x76AAD45172ed4D57A858c521B468176568506417",
            SMSFT: "0x5Ade5FA57839D3c49B611C437dbe316B6bB4D224",
            SUSD: "0xe3c0de2996C03fB2d6090E652bd4311641117efd"
        },
    },
    EModes: {
        StableEMode: {
            id: "1",
            ltv: "9700",
            liquidationThreshold: "9800",
            liquidationBonus: "10100",
            label: "Stablecoins",
            assets: ["USDC", "CUSD", "SUSD"],
        },
        ethereumEMode: {
            id: "2",
            ltv: "9200",
            liquidationThreshold: "9550",
            liquidationBonus: "10100",
            label: "Ethereumcoins",
            assets: ["ETH", "CETH"],
        },
        cPoolEMode: {
            id: "3",
            ltv: "9700",
            liquidationThreshold: "9800",
            liquidationBonus: "10100",
            label: "CPoolcoins",
            assets: ["CBTC", "CETH", "CUSD"],
        },
        fPoolEMode: {
            id: "4",
            ltv: "9700",
            liquidationThreshold: "9800",
            liquidationBonus: "10100",
            label: "FPoolcoins",
            assets: ["SGOOGL", "SUSD", "SMSFT", "SAAPL"],
        }
    },
    ChainlinkAggregator: {
        [eMantleNetwork.mantleTestnet]: {
            USDC: "0x1692Bdd32F31b831caAc1b0c9fAF68613682813b",
            ETH: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            CETH: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            CBTC: "0x6550bc2301936011c1334555e62A87705A81C12C",
            USDT: "0x0a023a3423D9b27A0BE48c768CCF2dD7877fEf5E",
        }
    },
    PythAggregator: {
        [eMantleNetwork.mantleTestnet]: {
            USDC: "0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722",
            BIT: "0x0e9ec6a3f2fba0a3df73db71c84d736b8fc1970577639c9456a2fee0c8f66d93",
            ETH: "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
            USDT: "0x1fc18861232290221461220bd4e2acd1dcdfbc89c84092c93c18bdc7756c1588",
            CBNB: "0xecf553770d9b10965f8fb64771e93f5690a182edc32be4a3236e0caaa6e0581a",
            CBTC: "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b",
            CETH: "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
            CXRP: "0xbfaf7739cb6fe3e1c57a0ac08e1d931e9e6062d476fa57804e165ab572b5b621",
            SAAPL: "0xafcc9a5bb5eefd55e12b6f0b4c8e6bccf72b785134ee232a5d175afd082e8832",
            SCOIN: "0xa29b53fbc56604ef1f2b65e89e48b0f09bb77b3fb890f4c70ee8cbd68a12a94b",
            SGOOGL: "0xabb1a3382ab1c96282e4ee8c847acc0efdb35f0564924b35f3246e8f401b2a3d",
            SMSFT: "0x4e10201a9ad79892f1b4e9a468908f061f330272c7987ddc6506a254f77becd7",
        },
    }
};

export default MantleConfig;

