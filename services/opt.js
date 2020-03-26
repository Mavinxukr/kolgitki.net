import { Fetch } from '../utils/fetcher';

export const sendOptForm = async (params, body) => {
  const serverData = await Fetch.post('wholesale-form', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};
