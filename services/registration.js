import { stringify } from 'query-string';
import { Fetch } from './fetcher';

export const registration = async (params, body) => {
  const serverData = await Fetch.post('apiregister', params, {
    body: stringify(body),
  });
  return serverData;
};
