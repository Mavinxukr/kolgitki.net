import { Fetch } from '../utils/fetcher';

export const getStockCategories = async params => {
  const serverData = await Fetch.get('categoryies-actions', params, {});
  return serverData;
};

export const getStocksByCategoryRequest = async (params, body) => {
  const serverData = await Fetch.post('categoryies-actions', params, {
    body: JSON.stringify(body)
  });
  return serverData;
};

export const getStock = async (params, slug) => {
  const serverData = await Fetch.get(`actions/${slug}`, params, {});
  return serverData;
};
