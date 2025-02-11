import {
  EvmNetworkIdType,
  NetworkId,
  PortfolioAsset,
  PortfolioElementBorrowLend,
  PortfolioElementType,
  TokenPrice,
  Yield,
  getElementLendingValues,
} from '@sonarwatch/portfolio-core';
import BigNumber from 'bignumber.js';
import { Cache } from '../../Cache';
import {
  comethTokenPricesPrefix,
  marketDetails,
  platformId,
} from './constants';
import { Fetcher, FetcherExecutor } from '../../Fetcher';
import { getEvmClient } from '../../utils/clients';
import { comethAbi } from './abis';
import { UserCollateralResult } from './types';
import { zeroBigInt } from '../../utils/misc/constants';
import tokenPriceToAssetToken from '../../utils/misc/tokenPriceToAssetToken';

export default function getPositionsV3Fetcher(
  networkId: EvmNetworkIdType
): Fetcher {
  const executor: FetcherExecutor = async (owner: string, cache: Cache) => {
    const markets = marketDetails.get(networkId);
    if (!markets) return [];

    const client = getEvmClient(networkId);

    // Supply
    const userCollateralContracts = markets
      .map((m) =>
        m.assets.map((asset) => ({
          abi: comethAbi,
          address: m.cometAddress,
          functionName: 'userCollateral',
          args: [owner, asset.address],
        }))
      )
      .flat();
    const userCollateralResponses = await client.multicall({
      contracts: userCollateralContracts,
    });
    const isSupplyNotZero = userCollateralResponses.some(
      (r) =>
        r.status === 'success' &&
        (r.result as UserCollateralResult)[0] !== zeroBigInt
    );

    // Borrow
    const borrowBalanceOfContracts = markets.map((m) => ({
      abi: comethAbi,
      address: m.cometAddress,
      functionName: 'borrowBalanceOf',
      args: [owner],
    }));
    const borrowBalanceOfResponses = await client.multicall({
      contracts: borrowBalanceOfContracts,
    });
    const isBorrowNotZero = borrowBalanceOfResponses.some(
      (r) => r.status === 'success' && (r.result as bigint) !== zeroBigInt
    );

    if (!isSupplyNotZero && !isBorrowNotZero) return [];
    const tokenPrices = await cache.getItem<Record<string, TokenPrice>>(
      comethTokenPricesPrefix,
      {
        prefix: platformId,
        networkId,
      }
    );
    if (!tokenPrices) return [];

    let index = 0;
    const elements: PortfolioElementBorrowLend[] = [];
    for (let i = 0; i < markets.length; i++) {
      // Borrow
      const marketDetail = markets[i];
      const borrowedAssets: PortfolioAsset[] = [];
      const borrowedYields: Yield[][] = [];
      const borrowBalanceOfResponse = borrowBalanceOfResponses[i];
      if (
        borrowBalanceOfResponse.status === 'success' &&
        (borrowBalanceOfResponse.result as bigint) !== zeroBigInt
      ) {
        const borrowAmount = new BigNumber(
          (borrowBalanceOfResponse.result as bigint).toString()
        )
          .div(10 ** marketDetail.baseAssetDecimals)
          .toNumber();
        borrowedAssets.push(
          tokenPriceToAssetToken(
            marketDetail.baseAssetAddress,
            borrowAmount,
            networkId,
            tokenPrices[marketDetail.baseAssetAddress]
          )
        );
        borrowedYields.push([]);
      }
      // Supply
      const suppliedAssets: PortfolioAsset[] = [];
      const suppliedYields: Yield[][] = [];
      const rewardAssets: PortfolioAsset[] = [];
      for (let j = 0; j < marketDetail.assets.length; j++) {
        const assetInfo = marketDetail.assets[j];
        const userCollateralResponse = userCollateralResponses[index];
        index += 1;
        if (userCollateralResponse.status === 'failure') continue;
        const userCollateral = (
          userCollateralResponse.result as UserCollateralResult
        )[0];
        if (userCollateral === zeroBigInt) continue;

        const amount = new BigNumber(userCollateral.toString())
          .div(10 ** assetInfo.decimals)
          .toNumber();
        const asset = tokenPriceToAssetToken(
          assetInfo.address,
          amount,
          networkId,
          tokenPrices[assetInfo.address]
        );
        suppliedAssets.push(asset);
        suppliedYields.push([]);
      }
      if (
        borrowedAssets.length === 0 &&
        suppliedAssets.length === 0 &&
        rewardAssets.length === 0
      )
        continue;
      const { borrowedValue, collateralRatio, suppliedValue, value } =
        getElementLendingValues(suppliedAssets, borrowedAssets, rewardAssets);
      elements.push({
        type: PortfolioElementType.borrowlend,
        networkId: NetworkId.ethereum,
        platformId,
        label: 'Lending',
        name: 'Compound V3',
        value,
        data: {
          borrowedAssets,
          borrowedValue,
          borrowedYields,
          suppliedAssets,
          suppliedValue,
          suppliedYields,
          collateralRatio,
          rewardAssets,
          value,
        },
      });
    }
    return elements;
  };

  return {
    id: `${platformId}-${networkId}-positions-v3`,
    networkId: NetworkId.ethereum,
    executor,
  };
}
