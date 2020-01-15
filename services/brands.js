import { Fetch } from './fetcher';

export const getBrandsData = async (params) => {
  const serverData = await Fetch.get('brands', params, {});
  return serverData;
};
