import { Fetch } from '../../utils/fetcher';

export const changeUserPassword = async (params, body) => {
  const serverData = await Fetch.post('user/change-password', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const getUserByToken = async (params) => {
  const serverData = await Fetch.post('user-by-token', params, {});
  return serverData;
};

export const changeUserData = async (params, body) => {
  const serverData = await Fetch.post('user/edit', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};
