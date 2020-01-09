import fetch from 'isomorphic-unfetch';
import { API_DOMAIN } from '../enums/api';

export const getDataById = async (params) => {
  const body = await fetch(`${API_DOMAIN}${params.namespace}/${params.id}`, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const serverData = await body.json();
  return serverData;
};
