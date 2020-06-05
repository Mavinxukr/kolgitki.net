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
  const serverData = await Fetch.get('popular-category', params, {});
  return serverData;
};

export const getLocation = async () => {
  const responseLocation = await fetch(
    'https://api.ipstack.com/159.224.232.162?access_key=3cfa3ace42683834b7f2c581a098c2e4&language=ru',
  );
  const locationData = await responseLocation.json();
  return locationData;
};

export const getAllCategories = async (params) => {
  const serverData = await Fetch.get('category', params, {});
  return serverData;
};

export const getAllFilters = async (params) => {
  const serverData = await Fetch.get('filters', params, {});
  return serverData;
};

export const getInstagramData = async (params) => {
  const serverData = await Fetch.get('instagram', params, {});
  return serverData;
};

export const getSeoData = async (params) => {
  const serverData = await Fetch.get('get-seo', params, {});
  return serverData;
};
