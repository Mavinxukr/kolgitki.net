import { Fetch, generalOptions } from './fetcher';

export const getBrandsData = async (params) => {
  const serverData = await Fetch.get('brands', params, generalOptions);
  return serverData;
};
