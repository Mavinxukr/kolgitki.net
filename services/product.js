import { Fetch, generalOptions } from './fetcher';

export const getProductById = async (params, id) => {
  const serverData = await Fetch.get(`goods/${id}`, params, generalOptions);
  return serverData;
};

export const getCommentsById = async (params, id) => {
  const serverData = await Fetch.get(`comments/${id}`, params, generalOptions);
  return serverData;
};
