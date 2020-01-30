import { Fetch } from '../utils/fetcher';

export const getCartDataRequest = async (params, token) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const serverData = await Fetch.get('cart', params, { headers });
  return serverData;
};

export const addCartDataRequest = async ({ params, token, body }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const serverData = await Fetch.post('cart/add', params, {
    headers,
    body: JSON.stringify(body),
  });
  return serverData;
};

export const updateCartDataRequest = async ({ params, token, body }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const serverData = await Fetch.post('cart/update', params, {
    headers,
    body: JSON.stringify(body),
  });
  return serverData;
};

export const deleteCartItemRequest = async ({ params, token, body }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const serverData = await Fetch.post('cart/delete', params, {
    headers,
    body: JSON.stringify(body),
  });
  return serverData;
};
