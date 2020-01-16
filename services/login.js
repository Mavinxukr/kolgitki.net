import { Fetch } from '../utils/fetcher';

export const login = async (params, body) => {
  const serverData = await Fetch.post('apilogin', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};
