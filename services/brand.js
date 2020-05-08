import { Fetch } from '../utils/fetcher';

export const getBrandById = async (params, id) => {
  const serverData = await Fetch.get(`brand/${id}`, params, {});
  return serverData;
};
