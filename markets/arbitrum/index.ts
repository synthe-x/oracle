import { eArbitrumNetwork, eEthereumNetwork, IAaveConfiguration } from "./../../helpers/types";
import AaveMarket from "../aave";
import { ZERO_ADDRESS } from "../../helpers";
import {
  strategyDAI,
  strategyUSDC,
  strategyLINK,
  strategyWBTC,
  strategyWETH,
  strategyUSDT,
  strategyAAVE,
  strategyEURS,
  strategycUSD,
  strategyfUSD,
} from "../aave/reservesConfigs";

export const ArbitrumConfig: IAaveConfiguration = {
  ...AaveMarket,
  PythId: "0x939C0e902FF5B3F7BA666Cc8F6aC75EE76d3f900",
  MarketId: "Arbitrum Aave Market",
  ATokenNamePrefix: "Arbitrum",
  StableDebtTokenNamePrefix: "Arbitrum",
  VariableDebtTokenNamePrefix: "Arbitrum",
  SymbolPrefix: "Arb",
  OracleQuoteUnit: '18',
  ProviderId: 36,
  ReservesConfig: {
    // LINK: strategyLINK,
    USDC: strategyUSDC,
    WETH: strategyWETH,
    CUSD: strategycUSD,
    FUSD: strategyfUSD,
    CETH: strategyWETH,
    CBTC: strategyWETH,
    FEUR: strategyfUSD,
    // USDT: strategyUSDT,
    FGBP: strategyfUSD,
    // ETH: strategyWETH
    // BTC: strategyWBTC,
    // CDOGE: strategyLINK,
    // DAI: strategyDAI,
    // FCNY: strategyfUSD
    // AAVE: strategyAAVE,
    // EURS: strategyEURS,
  },
  ReserveAssets: {
    [eArbitrumNetwork.arbitrumGoerli]: {
      // LINK: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
      // ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      USDC: "0xe87Ad4b7a14D8759BC92DAced7Ba243a23aCEc03",
      WETH: "0x7964Bcc63335E101F23da13583CEaD61d75f863b",
      CUSD: "0xBcD77D9073d61A72bf5650D3c694ab0aD4384832",
      FUSD: "0x2Ea0938813f8C04Cf6b34cA7828A45a7Aa1900D0",
      CETH: "0x816F232BcBd5dbeD2406b4Ade30E41EE428C0fF3",
      CBTC: "0x73358Eac8e7cc5038c8Ce46C12c53D75DC75600b",
      FEUR: "0x6DA9f58b380C1b926A3172A3181805F9f31068f6",
      FGBP: "0x08A52bD9eCafE62DeA84C12F8FbB73f9f94BeD54",
      

    },
    [eArbitrumNetwork.arbitrumTestnet]: {
      LINK: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      BTC: ZERO_ADDRESS,
      ETH: ZERO_ADDRESS,
      FUSD: ZERO_ADDRESS,
      CUSD: ZERO_ADDRESS,
      CETH: ZERO_ADDRESS,
      CBTC: ZERO_ADDRESS,
      FEUR: ZERO_ADDRESS,
      // FGBP: ZERO_ADDRESS,
      // DAI: ZERO_ADDRESS,
      // USDT: ZERO_ADDRESS,
      // AAVE: ZERO_ADDRESS,
      // EURS: ZERO_ADDRESS,
      // CDOGE: ZERO_ADDRESS,
      // FCNY: ZERO_ADDRESS
    },
    [eArbitrumNetwork.goerliNitro]: {
      LINK: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      BTC: ZERO_ADDRESS,
      ETH: ZERO_ADDRESS,
      FUSD: ZERO_ADDRESS,
      CUSD: ZERO_ADDRESS,
      CETH: ZERO_ADDRESS,
      CBTC: ZERO_ADDRESS,
      FEUR: ZERO_ADDRESS,
      FGBP: ZERO_ADDRESS,
      // DAI: ZERO_ADDRESS,
      // USDT: ZERO_ADDRESS,
      // AAVE: ZERO_ADDRESS,
      // EURS: ZERO_ADDRESS,
      // CDOGE: ZERO_ADDRESS,
      // FCNY: ZERO_ADDRESS
    },
  },
  EModes: {
    StableEMode: {
      id: "1",
      ltv: "9700",
      liquidationThreshold: "9800",
      liquidationBonus: "10100",
      label: "Stablecoins",
      assets: ["USDC", "CUSD", "FUSD"],
    },
    ethereumEMode: {
      id: "2",
      ltv: "9200",
      liquidationThreshold: "9550",
      liquidationBonus: "10100",
      label: "Ethereumcoins",
      assets: ["WETH", "CETH"],
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
      assets: ["FEUR", "FUSD", "FGBP"],
    }
  },
  ChainlinkAggregator: {
    [eArbitrumNetwork.arbitrumGoerli]: {
      // LINK: "0xd28Ba6CA3bB72bF371b80a2a0a33cBcf9073C954",
      USDC: "0x1692Bdd32F31b831caAc1b0c9fAF68613682813b",
      WETH: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
      CETH: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
      CBTC: "0x6550bc2301936011c1334555e62A87705A81C12C",
      // USDT: "0x0a023a3423D9b27A0BE48c768CCF2dD7877fEf5E", 
    },
    [eEthereumNetwork.hardhat]: {
      LINK: "0xd28Ba6CA3bB72bF371b80a2a0a33cBcf9073C954",
      USDC: "0x1692Bdd32F31b831caAc1b0c9fAF68613682813b",
      ETH: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
      CETH: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
      CBTC: "0x6550bc2301936011c1334555e62A87705A81C12C",
      USDT: "0x0a023a3423D9b27A0BE48c768CCF2dD7877fEf5E",
    },
  },
  PythAggregator: {
    [eArbitrumNetwork.arbitrumGoerli]: {
      USDC: "0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722",
      WETH: "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
      CETH: "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
      CBTC: "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b",
      // USDT: "0x1fc18861232290221461220bd4e2acd1dcdfbc89c84092c93c18bdc7756c1588",
      FEUR: "0xc1b12769f6633798d45adfd62bfc70114839232e2949b01fb3d3f927d2606154",
      FGPB: "0xbcbdc2755bd74a2065f9d3283c2b8acbd898e473bdb90a6764b3dbd467c56ecd",
    },
    [eEthereumNetwork.hardhat]: {
      USDC: "0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722",
      ETH: "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
      CETH: "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
      CBTC: "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b",
      USDT: "0x1fc18861232290221461220bd4e2acd1dcdfbc89c84092c93c18bdc7756c1588",
      FEUR: "0xc1b12769f6633798d45adfd62bfc70114839232e2949b01fb3d3f927d2606154",
      FGPB: "0xbcbdc2755bd74a2065f9d3283c2b8acbd898e473bdb90a6764b3dbd467c56ecd",
    },
  }
};

export default ArbitrumConfig;
