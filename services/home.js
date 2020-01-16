import { Fetch } from '../utils/fetcher';

export const getSliderData = async (params) => {
  const serverData = await Fetch.get('slider', params, {});
  return serverData;
};

export const getTopGoods = async (params) => {
  const serverData = await Fetch.get('top-goods', params, {});
  return serverData;
};

export const getCollectionsData = async (params) => {
  const serverData = await Fetch.get('collections', params, {});
  return serverData;
};

export const getPopularCategories = async (params) => {
  const serverData = await Fetch.get('category', params, {});
  return serverData;
};
