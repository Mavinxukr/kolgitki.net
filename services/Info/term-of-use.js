import { Fetch } from '../../utils/fetcher';

export const getTerms = async (params) => {
  const serverData = await Fetch.get('terms', params, {});
  return serverData;
};
