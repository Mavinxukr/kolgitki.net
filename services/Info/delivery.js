import { Fetch } from '../../utils/fetcher';

export const getDeliveryData = async (params) => {
  const serverData = await Fetch.get('delivery-payment', params, {});
  return serverData;
};
