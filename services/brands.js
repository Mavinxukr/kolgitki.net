import { Fetch } from '../utils/fetcher';

export const getBrandsData = async (params) => {
  const serverData = await Fetch.get('brands', params, {});
  return serverData;
};
