import { Fetch } from '../utils/fetcher';

export const getProductById = async ({ params, id, url }) => {
  const serverData = await Fetch.get(`${url}/${id}`, params, {});
  return serverData;
};

export const getCommentsById = async (params, id, isPresent) => {
  const url = isPresent ? 'present-comments' : 'comments';
  const serverData = await Fetch.get(`${url}/${id}`, params, {});
  return serverData;
};

export const getViewedProducts = async params => {
  const serverData = await Fetch.get('user/viewed', params, {});
  return serverData;
};

export const addCommentRequest = async ({ params, body }) => {
  const serverData = await Fetch.post('comments', params, {
    body: JSON.stringify(body)
  });
  return serverData;
};

export const editCommentRequest = async ({ params, id, body, isPresent }) => {
  const url = isPresent ? 'present-comments' : 'comments';
  const serverData = await Fetch.post(`${url}/${id}/edit`, params, {
    body: JSON.stringify(body)
  });
  return serverData;
};

export const deleteCommentRequest = async ({ params, body, isPresent }) => {
  const url = isPresent ? 'present-comments' : 'comments';
  const serverData = await Fetch.delete(url, params, {
    body: JSON.stringify(body)
  });
  return serverData;
};

export const getProductsByCategories = async (params, body) => {
  const serverData = await Fetch.post('goods', params, {
    body: JSON.stringify(body)
  });
  return serverData;
};

export const buyOneClickRequest = async (params, body) => {
  const serverData = await Fetch.post('order-click', params, {
    body: JSON.stringify(body)
  });
  return serverData;
};

export const goodMailingRequest = async (params, body) => {
  const serverData = await Fetch.post('good-mailing', params, {
    body: JSON.stringify(body)
  });
  return serverData;
};
