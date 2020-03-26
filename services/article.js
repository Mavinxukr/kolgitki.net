import { Fetch } from '../utils/fetcher';

export const getDataBySlug = async (params, slug) => {
  const serverData = await Fetch.get(`blog/${slug}`, params, {});
  return serverData;
};
