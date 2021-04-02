import CatalogWrapper from '../../components/Wrappers/Catalog/Catalog';
// import {
//   getAllCategories,
//   getAllFilters,
//   getCategoryBySlug
// } from '../../services/home';
// import { getProductsByCategories } from '../../services/product';

export default CatalogWrapper;

// CatalogWrapper.getInitialProps = async ({ query, req }) => {
//   if (!req || !query) {
//     return {
//       goods: null,
//       category: null,
//       usedFilters: null,
//       filterListFromCategory: null,
//       allCategories: null
//     };
//   }

//   //get category by slug
//   const responseCategory = await getCategoryBySlug(
//     query.slug[query.slug.length - 1]
//   );
//   const category = await responseCategory.data;

//   //get usedFilters from query
//   const usedFilters = { ...query };
//   //delete slug from usedFilters
//   delete usedFilters.slug;

//   //initial params variable
//   const params = { ...usedFilters };
//   //add category id in params
//   category !== null && (params.categories = JSON.stringify([category.id]));

//   //get products
//   const responseCatalog = await getProductsByCategories({}, params);
//   const catalog = await responseCatalog;

//   const responseAllFilters = await getAllFilters({ category_id: category.id });
//   const filterListFromCategory = responseAllFilters.data;

//   const responseAllCatagories = await getAllCategories({});
//   const allCategories = responseAllCatagories.data;

//   return {
//     goods: catalog.data,
//     category: category,
//     usedFilters: usedFilters,
//     filterListFromCategory: filterListFromCategory,
//     allCategories: allCategories
//   };
// };
