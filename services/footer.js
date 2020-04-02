import { Fetch } from '../utils/fetcher';

export const sendMailing = async (params, body) => {
  const serverData = await Fetch.post('mailing', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};
