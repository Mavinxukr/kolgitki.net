import { Fetch } from '../utils/fetcher';

export const checkPromoCode = async (params, body) => {
  const serverData = await Fetch.post('promo', params, {
    body: JSON.stringify(body)
  });
  return serverData;
};

export const getNewPostCities = async (params, char) => {
  const serverData = await Fetch.get(`post-city/${char}`, params, {});
  return serverData;
};

export const getNewPostWarehouses = async (params, cityRef) => {
  const serverData = await Fetch.get(`post-warehouse/${cityRef}`, params, {});
  return serverData;
};

export const getProductsByArr = async (params, body) => {
  const serverData = await Fetch.post('goodsbyArray', params, {
    body: JSON.stringify(body)
  });
  return serverData;
};

export const createOrder = async (params, body, url) => {
  const serverData = await Fetch.post(`order/${url}`, params, {
    body: JSON.stringify(body)
  });
  return serverData;
};

export const getOrdersRequest = async params => {
  const serverData = await Fetch.post('orders/get', params, {});
  return serverData;
};

export const getShopCities = async params => {
  const serverData = await Fetch.get('shops-cities', params, {});
  return serverData;
};

export const getShopByCity = async params => {
  const serverData = await Fetch.get('shops', params, {});
  return serverData;
};
