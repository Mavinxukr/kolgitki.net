import { Fetch } from '../utils/fetcher';

export const sendOptForm = async (params, body) => {
  const serverData = await Fetch.post('wholesale-form', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};


export const getDocs = async params => {
  const data = await Fetch.get('opt/documents', params, {});
  return data;
};