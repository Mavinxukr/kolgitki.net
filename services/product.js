import { Fetch } from '../utils/fetcher';

export const getProductById = async (params, id, token) => {
  if (token) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    };

    const serverData = await Fetch.get(`goodbyid/${id}`, params, { headers });
    return serverData;
  }
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

export const addCommentRequest = async ({ params, body, token }) => {
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

export const editCommentRequest = async ({
  params, id, body, token,
}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const serverData = await Fetch.post(`comments/${id}/edit`, params, {
    headers,
    body: JSON.stringify(body),
  });
  return serverData;
};

export const deleteCommentRequest = async ({ params, body, token }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const serverData = await Fetch.delete('comments', params, {
    headers,
    body: JSON.stringify(body),
  });
  return serverData;
};

export const getUserByToken = async (params, token) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const serverData = await Fetch.post('user-by-token', params, { headers });
  return serverData;
};

export const changeUserData = async ({ params, body, token }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const serverData = await Fetch.post('user/edit', params, {
    headers,
    body: JSON.stringify(body),
  });
  return serverData;
};
