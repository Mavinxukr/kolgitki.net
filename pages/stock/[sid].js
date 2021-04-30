import StockWrapper from '../../components/Wrappers/Stock/Stock';
import { getStock } from '../../services/stocks';

StockWrapper.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return {
      filters: {},
      property: null
    };
  }

  const filters = { ...query };
  delete filters.sid;

  const replaceFilters = f => {
    const replaceFilters = {};
    Object.keys(f).map(filter => {
      if (filter === 'dencity' || filter === 'materials') {
        replaceFilters.attribute = `${f[filter]}${
          replaceFilters.hasOwnProperty('attribute')
            ? ',' + replaceFilters.attribute
            : ''
        }`;
      } else {
        replaceFilters[filter] = f[filter];
      }
    });
    return replaceFilters;
  };

  const response = await getStock(replaceFilters(filters), query.sid);
  const property = (await response.status) ? response.data : null;

  console.log(property);

  return {
    filters,
    property
  };
};

export default StockWrapper;
