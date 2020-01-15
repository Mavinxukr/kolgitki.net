import { Fetch, generalOptions } from './fetcher';

export const getSliderData = async (params) => {
  const serverData = await Fetch.get('slider', params, generalOptions);
  return serverData;
};

export const getTopGoods = async (params) => {
  const serverData = await Fetch.get('top-goods', params, generalOptions);
  return serverData;
};

export const getCollectionsData = async (params) => {
  const serverData = await Fetch.get('collections', params, generalOptions);
  return serverData;
};

export const getPopularCategories = async (params) => {
  const serverData = await Fetch.get('category', params, generalOptions);
  return serverData;
};
