import { AssetType, eArbitrumNetwork, eEthereumNetwork, eMantleNetwork, IAaveConfiguration, TransferStrategy } from "./../../helpers/types";
import AaveMarket from "../aave";
import { ZERO_ADDRESS } from "../../helpers";
import {
    // strategyUSDC,
    // strategyETH,
    // strategyUSDT,
    // strategycBNB,
    strategycBTC,
    strategycETH,
    strategycUSD,
    // strategycXRP,
    // strategysAAPL,
    // strategysCOIN,
    // strategysGOOGL,
    // strategysMSFT,
    // strategysUSD,
    // strategyMNT

} from "./reservesConfig";

export const MantleConfig: IAaveConfiguration = {
    ...AaveMarket,
    SynthexAddress: "0x15F13D4BC9F5c31f2e84c50D24040B56548A16Db",
    PythId: "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729",
    MarketId: "Mantle Aave Market",
    ATokenNamePrefix: "Mantle",
    StableDebtTokenNamePrefix: "Mantle",
    VariableDebtTokenNamePrefix: "Mantle",
    SymbolPrefix: "MNT",
    OracleQuoteUnit: ['8'],
    OracleQuoteCurrencyAddress: ["0x10736f742c810be853Ff30d8a0A238112875F23b"],
    OracleQuoteCurrency: ["CUSD"],
    ProviderId: 40,
    ReservesConfig: {
        CETH: strategycETH,
        CBTC: strategycBTC,
        CUSD: strategycUSD,
    },
    ReserveAssets: {
        [eMantleNetwork.mantleTestnet]: {

            CBTC: "0x71020714cB8F12D20266371f741Cd467F5A8F1EB",
            CETH: "0xC5463C3E462E730A7BF625569e96dD275D136D2d",
            CUSD: "0x10736f742c810be853Ff30d8a0A238112875F23b",

        },
    },
    EModes: {
        // StableEMode: {
        //     id: "1",
        //     ltv: "9700",
        //     liquidationThreshold: "9800",
        //     liquidationBonus: "10100",
        //     label: "Stablecoins",
        //     assets: ["USDC", "CUSD", "SUSD"],
        // },
        // ethereumEMode: {
        //     id: "2",
        //     ltv: "9200",
        //     liquidationThreshold: "9550",
        //     liquidationBonus: "10100",
        //     label: "Ethereumcoins",
        //     assets: ["ETH", "CETH"],
        // }
    },
    ChainlinkAggregator: {
        [eMantleNetwork.mantleTestnet]: {
            // USDC: "0x1692Bdd32F31b831caAc1b0c9fAF68613682813b",
            // ETH: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            CETH: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
            CBTC: "0x6550bc2301936011c1334555e62A87705A81C12C",
            // USDT: "0x0a023a3423D9b27A0BE48c768CCF2dD7877fEf5E",
        }
    },
    PythAggregator: {
        [eMantleNetwork.mantleTestnet]: {
            // USDC: "0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722",
            // MNT: "0x0e9ec6a3f2fba0a3df73db71c84d736b8fc1970577639c9456a2fee0c8f66d93",
            // ETH: "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
            // USDT: "0x1fc18861232290221461220bd4e2acd1dcdfbc89c84092c93c18bdc7756c1588",
            CBTC: "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b",
            CETH: "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
            // SAAPL: "0xafcc9a5bb5eefd55e12b6f0b4c8e6bccf72b785134ee232a5d175afd082e8832",
            // SGOOGL: "0xabb1a3382ab1c96282e4ee8c847acc0efdb35f0564924b35f3246e8f401b2a3d",
            // CXRP: "0xbfaf7739cb6fe3e1c57a0ac08e1d931e9e6062d476fa57804e165ab572b5b621",
            // SCOIN: "0xa29b53fbc56604ef1f2b65e89e48b0f09bb77b3fb890f4c70ee8cbd68a12a94b",
            // SMSFT: "0x4e10201a9ad79892f1b4e9a468908f061f330272c7987ddc6506a254f77becd7",
            // CBNB: "0xecf553770d9b10965f8fb64771e93f5690a182edc32be4a3236e0caaa6e0581a",
        },
    },
};

export default MantleConfig;

