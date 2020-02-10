import { Fetch } from '../utils/fetcher';

export const getCartDataRequest = async (params) => {
  const serverData = await Fetch.get('cart', params, {});
  return serverData;
};

export const addCartDataRequest = async ({ params, body }) => {
  const serverData = await Fetch.post('cart/add', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const updateCartDataRequest = async ({ params, body }) => {
  const serverData = await Fetch.post('cart/update', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const deleteCartItemRequest = async ({ params, body }) => {
  const serverData = await Fetch.post('cart/delete', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};
