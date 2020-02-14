import { Fetch } from '../../utils/fetcher';

export const getUserBonuses = async (params) => {
  const serverData = await Fetch.post('user/get-bonuses', params, {});
  return serverData;
};
