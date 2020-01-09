import fetch from 'isomorphic-unfetch';
import { API_DOMAIN } from '../enums/api';

export const getData = async (params) => {
  const body = await fetch(`${API_DOMAIN}${params.namespace}`);
  const serverData = await body.json();
  return serverData;
};
