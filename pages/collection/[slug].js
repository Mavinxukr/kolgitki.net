import CollectionWrapper from '../../components/Wrappers/Collection/Collection';
import { getCollectionById } from '../../services/collction';
import { getAllCategories } from '../../services/home';

export default CollectionWrapper;

// CollectionWrapper.getInitialProps = async ({ query, req }) => {
//   if (!req) {
//     return { collection: null, categories: null };
//   }
//   const collection = await getCollectionById(query.slug);
//   const categories = await getAllCategories({});

//   //TODO: return 404 if collection is null
//   return { collection: collection, categories: categories.data };
// };
