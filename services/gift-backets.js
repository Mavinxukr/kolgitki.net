import { Fetch } from '../utils/fetcher';

export const getFilters = async (params) => {
  const serverData = await Fetch.get('filters-present', params, {});
  return serverData;
};

export const getPresentSetsRequest = async (params, body) => {
  const serverData = await Fetch.post('presentsets', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const getPresentSetRequest = async (params, id, url) => {
  const serverData = await Fetch.post(`${url}${id}`, params, {});
  return serverData;
};
