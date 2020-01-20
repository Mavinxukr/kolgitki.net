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
  const serverData = await Fetch.get('user/viewed', params, {});
  return serverData;
};

export const addCommentRequest = async (params, body, token) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const serverData = await Fetch.post('comments', params, {
    headers,
    body: JSON.stringify(body),
  });
  return serverData;
};
