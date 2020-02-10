import { Fetch } from '../utils/fetcher';

const bodyForPostData = (urlToGet, filterValue) => ({
  modelName: 'Address',
  calledMethod: urlToGet,
  methodProperties: {
    FindByString: filterValue,
  },
  apiKey: '178d7ea79f018c36e0a70ac00c8273fa',
});

export const getUserBonuses = async (params) => {
  const serverData = await Fetch.post('user/get-bonuses', params, {});
  return serverData;
};

export const checkPromoCode = async (params, body) => {
  const serverData = await Fetch.post('promo', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const getDataNewPost = async (params, urlToGet, searchValue) => {
  const serverData = await Fetch.post('', params, {
    body: JSON.stringify(bodyForPostData(urlToGet, searchValue)),
  }, true);
  return serverData;
};
