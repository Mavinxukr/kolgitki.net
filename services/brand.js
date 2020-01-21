import { Fetch } from '../utils/fetcher';

export const getBrandBySlag = async (params, slug) => {
  const serverData = await Fetch.get(`brands/${slug}`, params, {});
  return serverData;
};
