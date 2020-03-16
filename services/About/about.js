import { Fetch } from '../../utils/fetcher';

export const getAboutText = async (params) => {
  const serverData = await Fetch.get('about', params, {});
  return serverData;
};
