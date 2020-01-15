import { stringify } from 'query-string';
import { Fetch, generalOptions } from './fetcher';

export const registration = async (params, body) => {
  const serverData = await Fetch.post('apiregister', params, {
    ...generalOptions,
    body: stringify(body),
  });
  return serverData;
};
