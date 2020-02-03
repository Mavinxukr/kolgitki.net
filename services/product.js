import { Fetch } from '../utils/fetcher';

export const getProductById = async ({ params, id, url }) => {
  const serverData = await Fetch.get(`${url}/${id}`, params, {});
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

export const addCommentRequest = async ({ params, body }) => {
  const serverData = await Fetch.post('comments', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const editCommentRequest = async ({ params, id, body }) => {
  const serverData = await Fetch.post(`comments/${id}/edit`, params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const deleteCommentRequest = async ({ params, body }) => {
  const serverData = await Fetch.delete('comments', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const getUserByToken = async (params) => {
  const serverData = await Fetch.post('user-by-token', params, {});
  return serverData;
};

export const changeUserData = async ({ params, body }) => {
  const serverData = await Fetch.post('user/edit', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};
