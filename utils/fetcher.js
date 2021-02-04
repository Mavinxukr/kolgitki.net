import qs from 'query-string';
import fetch from 'isomorphic-unfetch';
import _ from 'lodash';
import { cookies } from './getCookies';
import { API_DOMAIN, API_NEW_POST } from '../enums/api';

export const generalOptions = co => ({
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: co.get('token')
  }
});

const Fetcher = method => async (url, params, options, isUseNewPostApi) => {
  const domain = isUseNewPostApi ? API_NEW_POST : API_DOMAIN;
  const paramsString = !_.isEmpty(params) ? `?${qs.stringify(params)}` : '';
  const body = await fetch(`${domain}${url}${paramsString}`, {
    method,
    ...generalOptions(cookies),
    ...options
  });
  const serverData = await body.json();
  return serverData;
};

export const Fetch = {
  get: Fetcher('GET'),
  post: Fetcher('POST'),
  delete: Fetcher('DELETE'),
  put: Fetcher('PUT')
};
