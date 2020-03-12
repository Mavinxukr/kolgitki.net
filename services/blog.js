import { Fetch } from '../utils/fetcher';

export const getBlog = async (params) => {
  const serverData = await Fetch.get('blog', params, {});
  return serverData;
};

export const getTags = async (params) => {
  const serverData = await Fetch.get('blog-tags', params, {});
  return serverData;
};

export const getRecommendations = async (params) => {
  const serverData = await Fetch.get('blog-recommendations', params, {});
  return serverData;
};
