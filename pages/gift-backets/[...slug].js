import GiftBackets from '../../components/Wrappers/GiftBackets/GiftBackets';
import { getFilters, getPresentSetsRequest } from '../../services/gift-backets';
import { getCategoryBySlug } from '../../services/home';

export default GiftBackets;

GiftBackets.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return {
      goods: null,
      category: null,
      filters: {},
      filterListFromCategory: null
    };
  }

  //get filters
  const { slug } = query;
  const filters = { ...query };
  delete filters.slug;

  //get category by slug
  const responseCategory = await getCategoryBySlug(slug[slug.length - 1]);
  const category = await responseCategory.data;

  //get cagalog by filters
  const responseCatalog = await getPresentSetsRequest(
    {},
    {
      ...filters,
      categories: JSON.stringify([category.id])
    }
  );
  const goods = responseCatalog.status ? responseCatalog.data : null;

  const responseAllFilters = await getFilters({});
  const filterList = (await responseAllFilters.status)
    ? responseAllFilters.data
    : null;

  return {
    goods,
    category,
    filters,
    filterList
  };
};
