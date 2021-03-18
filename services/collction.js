import { Fetch } from '../utils/fetcher';
import { getCollectionsData } from './home';

export const getCollectionById = async slug => {
  const collections = await getCollectionsData({});
  const collection = await collections.data.filter(collection => {
    return collection.slug === slug;
  });

  const collectionId = collection.length > 0 ? collection[0].id : null;

  if (collectionId) {
    const serverData = await Fetch.get(`collections/${collectionId}`, {}, {});
    return {
      ...serverData.data,
      description: collection[0].description,
      description_ua: collection[0].description_ua,
      id: collection[0].id,
      image_link: collection[0].image_link,
      min_price: collection[0].min_price,
      name: collection[0].name,
      name_ua: collection[0].name_ua,
      slug: collection[0].slug
    };
  }
  return null;
};
