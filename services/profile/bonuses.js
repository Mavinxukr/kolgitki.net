import { Fetch } from '../../utils/fetcher';

export const getUserBonuses = async (params, isUserNotAuth) => {
  const url = isUserNotAuth && 'get-unregistered-bonuses' || 'get-bonuses';
  const method = isUserNotAuth && 'get' || 'post';
  const serverData = await Fetch[method](`user/${url}`, params, {});
  return serverData;
};
