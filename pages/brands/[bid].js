import BrandWrapper from '../../components/Wrappers/Brand/Brand';
import { replaceFilters } from '../../components/Wrappers/Catalog/helpers';
import { getBrandById } from '../../services/brand';
import { getAllFilters } from '../../services/home';
import { getProductsByCategories } from '../../services/product';
import { buildFiltersBySlug, replaceFilter } from '../../utils/products';

BrandWrapper.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return {
      brandData: null,
      brand: null,
      allFilters: null,
      categoryData: {},
      otherFilters: {},
      usedFilters: {},
      goods: null
    };
  }

  const { bid } = query;
  const filters = { ...query };
  delete filters.bid

  const responseBrand = await getBrandById({}, bid);
  const brandData = (await responseBrand.status) ? responseBrand.data : null;

  const responseAllFilters = await getAllFilters({});
  const filterList = (await responseAllFilters.status)
    ? responseAllFilters.data
    : null;

  let allFilters = replaceFilter(filterList)
  allFilters.materials = allFilters.attributes[0].value
  allFilters.density = allFilters.attributes[1].value
  delete allFilters.attributes

  const brand = allFilters.brands.filter(item => item.slug === brandData.slug)
  
  let categoryData = [];

  if(filters.hasOwnProperty('categories')){
    const categoryName = filters.categories;
    if(allFilters.hasOwnProperty('categories')) {
      categoryData = [...allFilters.categories.filter(category =>  category.crumbs === categoryName)]
    }
    delete filters.categories;
  }

  const usedFilters = buildFiltersBySlug(filters, allFilters)

  const otherFilters = {...filters}
  delete otherFilters.colors;
  delete otherFilters.sizes;
  delete otherFilters.density;
  delete otherFilters.materials;

  let filtersForRequest = replaceFilters({...usedFilters})

  const responseCatalog = await getProductsByCategories(
    {},
    {
      ...filtersForRequest,
      ...otherFilters,
      brands: brand[0].name
    }
  );
  const goods = responseCatalog.status ? responseCatalog.data : null;

  return {
    brandData,
    brand,
    allFilters,
    usedFilters,
    categoryData,
    otherFilters,
    goods
  };
};

export default BrandWrapper;
