import fetch from 'isomorphic-unfetch';
import { API_DOMAIN } from '../enums/api';

export const getDataBySlug = async (params) => {
  const res = await fetch(`${API_DOMAIN}${params.namespace}/${params.slug}`);
  const serverData = await res.json();
  return serverData;
};
