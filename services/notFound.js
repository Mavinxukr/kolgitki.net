import { Fetch } from '../utils/fetcher';

export const searchRequest = async (params, body) => {
  const serverData = await Fetch.post('search', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};
