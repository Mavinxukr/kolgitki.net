import { Fetch } from '../utils/fetcher';

export const getBrandsData = async params => {
  const serverData = await Fetch.get('brands', params, {});
  return serverData;
};

export const getBrandData = async (params, slug) => {
  const serverData = await Fetch.get(`brand/${slug}`, params, {});
  return serverData;
};
