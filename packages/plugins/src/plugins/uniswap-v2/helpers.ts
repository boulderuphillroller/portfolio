import request, { gql } from 'graphql-request';

import { TheGraphUniV2Pair } from './types';

export async function getPairsV2(url: string) {
  const query = gql`
    {
      pairs(
        orderBy: reserveUSD
        first: 500
        orderDirection: desc
        where: { trackedReserveETH_not: "0" }
      ) {
        id
        reserve0
        reserve1
        token0 {
          id
          decimals
        }
        token1 {
          id
          decimals
        }
      }
    }
  `;
  const res = await request<{ pairs: TheGraphUniV2Pair[] }>(url, query);
  const pairs = res.pairs as TheGraphUniV2Pair[];
  if (!pairs || !pairs.length) return [];
  return pairs;
}
