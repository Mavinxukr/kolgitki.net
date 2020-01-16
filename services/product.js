import { Fetch } from '../utils/fetcher';

export const getProductById = async (params, id) => {
  const serverData = await Fetch.get(`goods/${id}`, params, {});
  return serverData;
};

export const getCommentsById = async (params, id) => {
  const serverData = await Fetch.get(`comments/${id}`, params, {});
  return serverData;
};

export const getViewedProducts = async (params) => {
  const serverData = await Fetch.get('viewed', params, {});
  return serverData;
};
