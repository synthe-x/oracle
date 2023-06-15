import { eArbitrumNetwork, eEthereumNetwork, eMantleNetwork, IAaveConfiguration } from "./../../helpers/types";
import AaveMarket from "../aave";
import { ZERO_ADDRESS } from "../../helpers";
import {
    strategyUSDC,
    strategyETH,
    // strategyUSDT,
    // strategycBNB,
    strategycBTC,
    strategycETH,
    strategycUSD,
    // strategycXRP,
    strategysAAPL,
    // strategysCOIN,
    strategysGOOGL,
    // strategysMSFT,
    strategysUSD,
    strategyMNT

} from "./reservesConfig";

export const MantleConfig: IAaveConfiguration = {
    ...AaveMarket,
    SynthexAddress:"0xB9FE95aE8cD2964174c3589C1bFb360A3D1de9Dc",
    PythId: "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729",
    MarketId: "Mantle Aave Market",
    ATokenNamePrefix: "Mantle",
    StableDebtTokenNamePrefix: "Mantle",
    VariableDebtTokenNamePrefix: "Mantle",
    SymbolPrefix: "MNT",
    OracleQuoteUnit: ['18', '18'],
    OracleQuoteCurrencyAddress: ["0xe49b5e1a76a9a081ca6be9ac31df63afc1814e2e", "0x1561ccba861ee39552da5d703b629b1b23ee1899"],
    OracleQuoteCurrency: ["CUSD", "SUSD"],
    ProviderId: 40,
    ReservesConfig: {
        // USDT: strategyUSDT,
        MNT: strategyMNT,
        CETH: strategycETH,
        CBTC: strategycBTC,
        CUSD: strategycUSD,
        SAAPL: strategysAAPL,
        SGOOGL: strategysGOOGL,
        SUSD: strategysUSD,
        USDC: strategyUSDC,
        ETH: strategyETH,
        // CBNB: strategycBNB,
        // CXRP: strategycXRP,
        // SCOIN: strategysCOIN,
        // SMSFT: strategysMSFT,
    },
    ReserveAssets: {
        [eMantleNetwork.mantleTestnet]: {
            // USDT: "0x41fc4dfa6b2aafcc192335b309f64e3cf83c9ccd",
            CBTC: "0xe70733321d6902fe6780e2e2d221d2c466a43a9c",
            CETH: "0x4398c702b845584fca3adbbf1738f2c3cfb9fb5b",
            CUSD: "0xe49b5e1a76a9a081ca6be9ac31df63afc1814e2e",
            SAAPL: "0x5536f3b573d99e5a0a586c79ac3c60b445a76639",
            SGOOGL: "0xbcc4b49b5c75340c52f7e427302bd5e38363f09f",
            SUSD: "0x1561ccba861ee39552da5d703b629b1b23ee1899",
            USDC: "0x0134369386a3aebcf0704946c0df89fe78fa2b50",
            MNT: "0x55f317247632d42584848064a0cc0190fe1f6c58",
            ETH: "0x43d9c2dec2a83079641feafdabc4719bb362aacf",
            // CXRP: "0xDF75f29f0fb07ED2E1648bedF36194A8A643912C",
            // SCOIN: "0xA24797057e3A08Ff27542Aa427e1FC734364e4E5",
            // SMSFT: "0x5Ade5FA57839D3c49B611C437dbe316B6bB4D224",
            // CBNB: "0x1e54215EC35eeBE965BD401A90BD6bd1fcC46163",
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
            label: "SPoolcoins",
            assets: ["SGOOGL", "SUSD","SAAPL"],
        }
    },
    ChainlinkAggregator: {
        [eMantleNetwork.mantleTestnet]: {
            USDC: "0x1692Bdd32F31b831caAc1b0c9fAF68613682813b",
            ETH: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            CETH: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            CBTC: "0x6550bc2301936011c1334555e62A87705A81C12C",
            // USDT: "0x0a023a3423D9b27A0BE48c768CCF2dD7877fEf5E",
        }
    },
    PythAggregator: {
        [eMantleNetwork.mantleTestnet]: {
            USDC: "0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722",
            MNT: "0x0e9ec6a3f2fba0a3df73db71c84d736b8fc1970577639c9456a2fee0c8f66d93",
            ETH: "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
            // USDT: "0x1fc18861232290221461220bd4e2acd1dcdfbc89c84092c93c18bdc7756c1588",
            CBTC: "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b",
            CETH: "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
            SAAPL: "0xafcc9a5bb5eefd55e12b6f0b4c8e6bccf72b785134ee232a5d175afd082e8832",
            SGOOGL: "0xabb1a3382ab1c96282e4ee8c847acc0efdb35f0564924b35f3246e8f401b2a3d",
            // CXRP: "0xbfaf7739cb6fe3e1c57a0ac08e1d931e9e6062d476fa57804e165ab572b5b621",
            // SCOIN: "0xa29b53fbc56604ef1f2b65e89e48b0f09bb77b3fb890f4c70ee8cbd68a12a94b",
            // SMSFT: "0x4e10201a9ad79892f1b4e9a468908f061f330272c7987ddc6506a254f77becd7",
            // CBNB: "0xecf553770d9b10965f8fb64771e93f5690a182edc32be4a3236e0caaa6e0581a",
        },
    }
};

export default MantleConfig;

