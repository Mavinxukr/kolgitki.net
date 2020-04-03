import { Fetch } from '../utils/fetcher';

export const registration = async (params, body) => {
  const serverData = await Fetch.post('apiregister', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};
