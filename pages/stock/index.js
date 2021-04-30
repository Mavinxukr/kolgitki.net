import StockWrapper from '../../components/Wrappers/Stocks/Stocks';
import {
  getStockCategories,
  getStocksByCategoryRequest
} from '../../services/stocks';

StockWrapper.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return {
      filters: null,
      property: null,
      goods: null
    };
  }

  const filters = { ...query };

  const responseProperty = await getStockCategories({});
  const property = (await responseProperty.status)
    ? responseProperty.data
    : null;

  const responseCatalog = await getStocksByCategoryRequest(
    {},
    {
      ...filters
    }
  );
  const goods = (await responseCatalog.status) ? responseCatalog.data : null;

  return {
    property,
    filters,
    goods
  };
};

export default StockWrapper;
