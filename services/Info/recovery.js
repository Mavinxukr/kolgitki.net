import { Fetch } from '../../utils/fetcher';

export const getExchange = async (params) => {
  const serverData = await Fetch.get('exchange', params, {});
  return serverData;
};
