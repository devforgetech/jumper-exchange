import { getTokens } from '@lifi/sdk';
import type { TokensResponse } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import {
  getTokenBySymbol as getTokenBySymbolHelper,
  getTokenByName as getTokenByNameHelper,
  getTokenByAddressOnSpecificChain as getTokenByAddressOnSpecificChainHelper,
  getNativeTokenForChain as getNativeTokenForChainHelper,
} from '@/utils/tokenAndChain';
import { getCachedData } from 'src/app/lib/cache';

export const queryKey = ['tokenStats'];

// No need for cache as the response size is over 2MB, which is the current limit for fetch in Next.js
export const fetchCache = 'force-no-store';

export const getTokensQuery = async () => {
  const tokens = await getCachedData('tokens', getTokens);
  return tokens;
};

export const useTokens = () => {
  const { data, isSuccess } = useQuery({
    queryKey,
    queryFn: getTokensQuery,
    enabled: true,
    refetchInterval: 1000 * 60 * 60,
  });

  const getTokenBySymbol = (symbol: string) => {
    if (!data?.tokens) {
      return;
    }
    return getTokenBySymbolHelper(data?.tokens, symbol);
  };

  const getTokenByName = (name: string) => {
    if (!data?.tokens) {
      return;
    }
    return getTokenByNameHelper(data?.tokens, name);
  };

  const getTokenByAddressAndChain = (address: string, chainId: number) => {
    if (!data?.tokens) {
      return;
    }
    return getTokenByAddressOnSpecificChainHelper(
      data?.tokens,
      chainId,
      address,
    );
  };
  const getNativeTokenForChain = (chainId: number) => {
    if (!data?.tokens) {
      return;
    }
    return getNativeTokenForChainHelper(data?.tokens, chainId);
  };

  return {
    getTokenBySymbol,
    getTokenByName,
    getTokenByAddressAndChain,
    getNativeTokenForChain,
    tokens: data || ({} as TokensResponse),
    isSuccess,
  };
};
