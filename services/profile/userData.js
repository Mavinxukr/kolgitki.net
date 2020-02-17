import { Fetch } from '../../utils/fetcher';

export const changeUserPassword = async (params, body) => {
  const serverData = await Fetch.post('user/change-password', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};
