import { Fetch } from '../../utils/fetcher';

export const addToFavouriteRequest = async (params, body) => {
  const serverData = await Fetch.post('favorite', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const deleteFromFavouriteRequest = async (params, body) => {
  const serverData = await Fetch.delete('favorite', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const getFavouritesRequest = async (params) => {
  const serverData = await Fetch.get('favorite', params, {});
  return serverData;
};
