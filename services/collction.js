import { Fetch } from '../utils/fetcher';

export const getCollectionById = async slug => {

  if (slug) {
    const serverData = await Fetch.get(`collections/${slug}`, {}, {});
    return {
      ...serverData.data,
    };
  }
  return null;
};
