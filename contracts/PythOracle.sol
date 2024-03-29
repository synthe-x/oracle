// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IPythOracle, IPythOracleGetter} from "./IPythOracle.sol";
import "./synthex/SyntheX.sol";
import "./aave-core-v3/contracts/dependencies/chainlink/AggregatorInterface.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
import "hardhat/console.sol";

/**
 * @title PriceOracle
 * @author Aave
 * @notice Contract to get asset prices, manage price sources and update the fallback oracle
 * - Use of Chainlink Aggregators as first source of price
 * - If the returned price by a Chainlink aggregator is <= 0, the call is forwarded to a fallback oracle
 * - Owned by the Aave governance
 */
contract PythOracle is IPythOracle, AccessControl {
    SyntheX public immutable synthex;
    // IPyth public pyth;
    address pyth;
    bytes32 constant PRICE_UPDATER = keccak256("PRICE_UPDATER");

    bool public constant IS_PYTH_ORACLE = true;

    mapping(address => bytes32) public assetsSources; // need to make it private

    IPriceOracleGetter private _fallbackOracle;
    mapping(address => uint256) public BASE_CURRENCYS;

    /**
     * @dev Only asset listing or pool admin can call functions marked by this modifier.
     */
    modifier onlyAssetListingOrPoolAdmins() {
        require(synthex.isL1Admin(msg.sender), Errors.CALLER_NOT_L1_ADMIN);
        _;
    }

    receive() external payable {}

    /**
     * @notice Constructor
     * @param _synthex The address of the new System
     * @param assets The addresses of the assets
     * @param sources The address of the source of each asset
     * @param fallbackOracle The address of the fallback oracle to use if the data of an
     *        aggregator is not consistent
     * @param baseCurrency The base currency used for the price quotes. If USD is used, base currency is 0x0
     * @param baseCurrencyUnit The unit of the base currency
     */
    constructor(
        SyntheX _synthex,
        address _pyth,
        address pool,
        address[] memory assets,
        bytes32[] memory sources,
        address fallbackOracle,
        address[] memory baseCurrency,
        uint[] memory baseCurrencyUnit
    ) payable {
        synthex = _synthex;
        pyth = _pyth;
        _grantRole(PRICE_UPDATER, pool);
        _setFallbackOracle(fallbackOracle);
        _setAssetsSources(assets, sources);
        _setBaseCurency(baseCurrency, baseCurrencyUnit);
    }

    function grantRole(
        bytes32 role,
        address account
    ) public override onlyAssetListingOrPoolAdmins {
        _setupRole(role, account);
    }

    /**
     * @param assets The asset need to add or delete
     * @param sources The source uint, 0 for delete
     */
    function updateBaseCurrencies(
        address[] memory assets,
        uint256[] memory sources
    ) external onlyAssetListingOrPoolAdmins {
        _setBaseCurency(assets, sources);
    }

    /// @inheritdoc IPythOracle
    function setAssetSources(
        address[] calldata assets,
        bytes32[] calldata sources
    ) external override onlyAssetListingOrPoolAdmins {
        _setAssetsSources(assets, sources);
    }

    /// @inheritdoc IPythOracle
    function setFallbackOracle(
        address fallbackOracle
    ) external override onlyAssetListingOrPoolAdmins {
        _setFallbackOracle(fallbackOracle);
    }

    /**
     * @notice Internal function to set the sources for each asset
     * @param assets The addresses of the assets
     * @param sources The address of the source of each asset
     */
    function _setAssetsSources(
        address[] memory assets,
        bytes32[] memory sources
    ) internal {
        require(assets.length == sources.length, Errors.INVALID_ARGUMENT);
        for (uint256 i = 0; i < assets.length; i++) {
            assetsSources[assets[i]] = sources[i];
            emit AssetSourceUpdated(assets[i], sources[i]);
        }
    }

    function _setBaseCurency(
        address[] memory assets,
        uint256[] memory units
    ) internal {
        require(assets.length == units.length, Errors.INVALID_ARGUMENT);
        for (uint256 i = 0; i < assets.length; i++) {
            BASE_CURRENCYS[assets[i]] = units[i];
            emit BaseCurrencySet(assets[i], units[i]);
        }
    }

    /**
     * @notice Internal function to set the fallback oracle
     * @param fallbackOracle The address of the fallback oracle
     */
    function _setFallbackOracle(address fallbackOracle) internal {
        _fallbackOracle = IPriceOracleGetter(fallbackOracle);
        emit FallbackOracleUpdated(fallbackOracle);
    }

    /// @inheritdoc IPythOracleGetter
    function getAssetPrice(address asset) public view override returns (uint) {
        bytes32 source = assetsSources[asset];

        if (BASE_CURRENCYS[asset] != 0) {
            return BASE_CURRENCYS[asset];
        } else if (source == bytes32(0)) {
            return _fallbackOracle.getAssetPrice(asset);
        } else {
            PythStructs.Price memory currentBasePrice = IPyth(pyth)
                .getPrice(source);
            uint256 price = convertToUint(currentBasePrice, 8);

            if (price > 0) {
                return price;
            } else {
                return _fallbackOracle.getAssetPrice(asset);
            }
        }
    }

    function updatePrices(bytes[] calldata pythUpdateData) external override {
        uint updateFee = IPyth(pyth).getUpdateFee(pythUpdateData);
        IPyth(pyth).updatePriceFeeds{value: updateFee}(pythUpdateData);
        console.log("priceUpdate");
    }

    function convertToUint(
        PythStructs.Price memory price,
        uint8 targetDecimals
    ) private pure returns (uint256) {
        if (price.price < 0 || price.expo > 0 || price.expo < -255) {
            revert();
        }
        uint8 priceDecimals = uint8(uint32(-1 * price.expo));
        if (targetDecimals - priceDecimals >= 0) {
            return
                uint(uint64(price.price)) *
                10 ** uint32(targetDecimals - priceDecimals);
        } else {
            return
                uint(uint64(price.price)) /
                10 ** uint32(priceDecimals - targetDecimals);
        }
    }

    /// @inheritdoc IPythOracle
    function getAssetsPrices(
        address[] calldata assets
    ) external view override returns (uint[] memory) {
        uint[] memory prices = new uint[](assets.length);
        for (uint256 i = 0; i < assets.length; i++) {
            prices[i] = getAssetPrice(assets[i]);
        }
        return prices;
    }

    /// @inheritdoc IPythOracle
    function getSourceOfAsset(
        address asset
    ) external view override returns (bytes32) {
        return assetsSources[asset];
    }

    /// @inheritdoc IPythOracle
    function getFallbackOracle() external view returns (address) {
        return address(_fallbackOracle);
    }
}
