import { Fetch } from '../../utils/fetcher';

export const getAdvantages = async (params) => {
  const serverData = await Fetch.get('advantages', params, {});
  return serverData;
};
