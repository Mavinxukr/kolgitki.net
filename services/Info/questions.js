import { Fetch } from '../../utils/fetcher';

export const getFAQ = async (params) => {
  const serverData = await Fetch.get('faq', params, {});
  return serverData;
};
