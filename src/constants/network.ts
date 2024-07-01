import { BackEndNetworkType, NetworkItem } from '@/types/network';
import { NEXT_PUBLIC_NETWORK_ENV, NEXT_PUBLIC_WEBSITE_NAME } from './misc';

export type WebsiteNetworkConfig = {
  [key in BackEndNetworkType]: NetworkItem;
};

export const BackEndNetWorkMap: Record<string, WebsiteNetworkConfig> = {
  schrodinger: {
    dev: {
      cmsUrl: 'https://testnet-cms.schrodingerai.com/',
      s3Url: 'https://schrodinger-testnet.s3.amazonaws.com/',
    },
    mainnet: {
      cmsUrl: 'https://schrodingernft.ai/',
      s3Url: 'https://schrodinger.s3.amazonaws.com/',
    },
  },
  // Add More ...
};

export const s3Url =
  NEXT_PUBLIC_WEBSITE_NAME && NEXT_PUBLIC_NETWORK_ENV
    ? BackEndNetWorkMap[NEXT_PUBLIC_WEBSITE_NAME][NEXT_PUBLIC_NETWORK_ENV]?.s3Url
    : '';
