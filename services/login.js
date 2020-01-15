import { stringify } from 'query-string';
import { Fetch, generalOptions } from './fetcher';

export const login = async (params, body) => {
  const serverData = await Fetch.post('apilogin', params, {
    ...generalOptions,
    body: stringify(body),
  });
  return serverData;
};
