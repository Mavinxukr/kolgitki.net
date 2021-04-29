import GiftBackets from '../../components/Wrappers/GiftBackets/GiftBackets';

import { getFilters, getPresentSetsRequest } from '../../services/gift-backets';

export default GiftBackets;

GiftBackets.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return {
      goods: null,
      category: null,
      filters: {},
      filterList: null
    };
  }

  const responseAllFilters = await getFilters({});
  const filterList = (await responseAllFilters.status)
    ? responseAllFilters.data
    : null;

  const filters = { ...query };

  const responseCatalog = await getPresentSetsRequest({}, { ...filters });
  const goods = (await responseCatalog.status) ? responseCatalog.data : null;

  return {
    goods,
    category: null,
    filters,
    filterList
  };
};
