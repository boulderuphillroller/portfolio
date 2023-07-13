import { Fetcher, Job } from '@sonarwatch/portfolio-core';
import * as platformsObj from './platforms';
import {
  jobs as tokensJobs,
  fetchers as tokensFetchers,
} from './plugins/tokens';
import { fetchers as marinadeFetchers } from './plugins/marinade';
import {
  jobs as marginfiJobs,
  fetchers as marginfiFetchers,
} from './plugins/marginfi';
import { jobs as raydiumJobs } from './plugins/raydium';
import {
  jobs as solendJobs,
  fetchers as solendFetchers,
} from './plugins/solend';
import { jobs as thalaJobs, fetchers as thalaFetchers } from './plugins/thala';
import { fetchers as tensorFetchers } from './plugins/tensor';
import { jobs as fooJobs, fetchers as fooFetchers } from './plugins/foo';
import { getFetchersByAddressSystem } from './utils/misc/getFetchersByAddressSystem';

export * from './platforms';
export const platforms = Object.values(platformsObj);

export const jobs: Job[] = [
  ...tokensJobs,
  ...thalaJobs,
  ...fooJobs,
  ...marginfiJobs,
  ...raydiumJobs,
  ...solendJobs,
];

export const fetchers: Fetcher[] = [
  ...tokensFetchers,
  ...fooFetchers,
  ...tensorFetchers,
  ...marginfiFetchers,
  ...marinadeFetchers,
  ...solendFetchers,
  ...thalaFetchers,
];

export const fetchersByAddressSystem = getFetchersByAddressSystem(fetchers);
