import { Fetch } from '../../utils/fetcher';

export const addToFavouriteRequest = async (params, body, isPresent) => {
  const url = isPresent ? 'favoritepresent' : 'favorite';
  const serverData = await Fetch.post(url, params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const deleteFromFavouriteRequest = async (params, body) => {
  const serverData = await Fetch.post('favorite/delete', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const getFavouritesRequest = async (params) => {
  const serverData = await Fetch.get('favorite', params, {});
  return serverData;
};
