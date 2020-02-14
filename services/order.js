import { Fetch } from '../utils/fetcher';

const bodyForPostData = (calledMethod, filterObject, modelName) => ({
  modelName,
  calledMethod,
  methodProperties: filterObject,
  apiKey: '178d7ea79f018c36e0a70ac00c8273fa',
});

export const checkPromoCode = async (params, body) => {
  const serverData = await Fetch.post('promo', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const getNewPostData = async ({
  params,
  calledMethod,
  filterObject,
  modelName,
}) => {
  const serverData = await Fetch.post(
    '',
    params,
    {
      body: JSON.stringify(
        bodyForPostData(calledMethod, filterObject, modelName),
      ),
    },
    true,
  );
  return serverData;
};

export const getProductsByArr = async (params) => {
  const serverData = await Fetch.post('goodsbyArray', params, {});
  return serverData;
};
