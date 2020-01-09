import fetch from 'isomorphic-unfetch';
import { API_DOMAIN } from '../enums/api';

export const getData = async (params) => {
  const res = await fetch(`${API_DOMAIN}${params.namespace}`);
  const serverData = await res.json();
  return serverData;
};
