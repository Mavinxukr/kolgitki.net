import qs from 'query-string';
import fetch from 'isomorphic-unfetch';
import _ from 'lodash';
import { cookies } from './getCookies';
import { API_DOMAIN } from '../enums/api';

export const generalOptions = {
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: cookies.get('token'),
  },
};

const Fetcher = method => async (url, params, options) => {
  console.log(cookies.get('token'));
  const paramsString = !_.isEmpty(params) ? `?${qs.stringify(params)}` : '';
  const body = await fetch(`${API_DOMAIN}${url}${paramsString}`, {
    method,
    ...generalOptions,
    ...options,
  });
  const serverData = await body.json();
  return serverData;
};

export const Fetch = {
  get: Fetcher('GET'),
  post: Fetcher('POST'),
  delete: Fetcher('DELETE'),
  put: Fetcher('PUT'),
};
