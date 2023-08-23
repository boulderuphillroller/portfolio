import { Platform } from '@sonarwatch/portfolio-core';
import { Fetcher } from './Fetcher';
import { Job } from './Job';
import * as platformsObj from './platforms';
import {
  jobs as tokensJobs,
  fetchers as tokensFetchers,
} from './plugins/tokens';
import {
  fetchers as nativeStakeFetchers,
  jobs as nativeStakeJobs,
} from './plugins/native-stake';
import { fetchers as marinadeFetchers } from './plugins/marinade';
import {
  jobs as marginfiJobs,
  fetchers as marginfiFetchers,
} from './plugins/marginfi';
import { jobs as saberJobs } from './plugins/saber';
import {
  jobs as solendJobs,
  fetchers as solendFetchers,
} from './plugins/solend';
import {
  jobs as raydiumJobs,
  fetchers as raydiumFetchers,
} from './plugins/raydium';
import { jobs as orcaJobs, fetchers as orcaFetchers } from './plugins/orca';
import { jobs as meteoraJobs } from './plugins/meteora';
import { jobs as cetusJobs, fetchers as cetusFetchers } from './plugins/cetus';
import {
  jobs as turbosJobs,
  fetchers as turbosFetchers,
} from './plugins/turbos';
import { jobs as thalaJobs, fetchers as thalaFetchers } from './plugins/thala';
import { fetchers as tensorFetchers } from './plugins/tensor';
import {
  fetchers as ordersFetchers,
  jobs as ordersJobs,
} from './plugins/orders';
import { fetchers as aaveFetchers, jobs as aaveJobs } from './plugins/aave';
import { fetchers as aptosStakingFetchers } from './plugins/staking-aptos';
import {
  fetchers as morphoFetchers,
  jobs as morphoJobs,
} from './plugins/morpho';
import { jobs as driftJobs, fetchers as driftFetchers } from './plugins/drift';
import { jobs as mangoJobs, fetchers as mangoFetchers } from './plugins/mango';
import { jobs as topTokensJobs } from './plugins/top-tokens';
import {
  jobs as astroportJobs,
  fetchers as astroportFetchers,
} from './plugins/astroport';
import {
  jobs as seaswapJobs,
  fetchers as seaswapFetchers,
} from './plugins/liquiditypools-sei';
import { jobs as fuzioJobs } from './plugins/fuzio';
import { jobs as pancakeswapJobs } from './plugins/pancakeswap';
import { jobs as liquidswapJobs } from './plugins/liquidswap';
import { jobs as auxexchangeJobs } from './plugins/auxexchange';
import { jobs as makerJobs } from './plugins/maker';
import { getFetchersByAddressSystem } from './utils/misc/getFetchersByAddressSystem';

export * from './Cache';
export * from './Fetcher';
export * from './Job';

export * from './platforms';
export const platforms: Platform[] = Object.values(platformsObj);

export const jobs: Job[] = [
  ...tokensJobs,
  ...nativeStakeJobs,
  ...thalaJobs,
  ...marginfiJobs,
  ...raydiumJobs,
  ...solendJobs,
  ...meteoraJobs,
  ...orcaJobs,
  ...driftJobs,
  ...mangoJobs,
  ...cetusJobs,
  ...turbosJobs,
  ...topTokensJobs,
  ...pancakeswapJobs,
  ...liquidswapJobs,
  ...auxexchangeJobs,
  ...saberJobs,
  ...aaveJobs,
  ...ordersJobs,
  ...morphoJobs,
  ...makerJobs,
  ...astroportJobs,
  ...seaswapJobs,
  ...fuzioJobs,
];

export const fetchers: Fetcher[] = [
  ...tokensFetchers,
  ...nativeStakeFetchers,
  ...tensorFetchers,
  ...marginfiFetchers,
  ...marinadeFetchers,
  ...solendFetchers,
  ...thalaFetchers,
  ...raydiumFetchers,
  ...orcaFetchers,
  ...driftFetchers,
  ...mangoFetchers,
  ...cetusFetchers,
  ...turbosFetchers,
  ...aptosStakingFetchers,
  ...aaveFetchers,
  ...ordersFetchers,
  ...morphoFetchers,
  ...seaswapFetchers,
  ...astroportFetchers,
];

export const fetchersByAddressSystem = getFetchersByAddressSystem(fetchers);
