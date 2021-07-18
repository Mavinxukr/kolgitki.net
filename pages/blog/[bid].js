import BlogWrapper from '../../components/Wrappers/BlogArticle/BlogArticle';
import { replaceFilters } from '../../components/Wrappers/BlogArticle/helpers';
import { getDataBySlug } from '../../services/article';
import { getRecommendations } from '../../services/blog';
import { getAllBlogFilters } from '../../services/home';
import { getProductsByBlog } from '../../services/product';
import { buildFiltersBySlug, replaceFilter } from '../../utils/products';

BlogWrapper.getInitialProps = async ({ query, req }) => {
  // not SSR
  if (!req) {
    return {
      recomendations: null,
      blog: null,
      goods: null,
      allFilters: null,
      categoryData: {},
      otherFilters: {},
      usedFilters: {}
    };
  }
  //get recomendation list
  const responseRecomendations = await getRecommendations({});
  const recomendations = (await responseRecomendations.status)
    ? responseRecomendations.data
    : null;

  //get slug article form query
  const { bid } = query;

  //get blog by slug
  const responseBlog = await getDataBySlug({}, bid);
  const blog = (await responseBlog.status) ? responseBlog.data : null;

  //get all filters list from blog id
  const responseFiltersList = await getAllBlogFilters({ post_id: blog.id });
  const allFilterList = responseFiltersList.status
    ? responseFiltersList.data
    : null;

  //format all filters
  let allFilters = replaceFilter(allFilterList)
  allFilters.materials = allFilters.attributes[0].value
  allFilters.density = allFilters.attributes[1].value
  delete allFilters.attributes


  //get slugs in query
  const filters = { ...query };
  delete filters.bid;

  let categoryData = [];

  if(filters.hasOwnProperty('categories')){
    const categoryName = filters.categories;
    if(allFilters.hasOwnProperty('categories')) {
      categoryData = [...allFilters.categories.filter(category =>  category.crumbs === categoryName)]
    }
    delete filters.categories;
  }


  //build filters from slugs
  const usedFilters = buildFiltersBySlug(filters, allFilters)
  
  const otherFilters = {...filters}
  delete otherFilters.categories;
  delete otherFilters.colors;
  delete otherFilters.sizes;
  delete otherFilters.brands;
  delete otherFilters.density;
  delete otherFilters.materials;

  let filtersForRequest = replaceFilters(usedFilters)

  if(categoryData){
    filtersForRequest.category = categoryData.map(item => item.id).join(',');
  } 

  const responseProductsBlog = await getProductsByBlog(
    {},
    {
      ...otherFilters,
      ...filtersForRequest,
      post: blog.id
    }
  );
  const goods = responseProductsBlog.status ? responseProductsBlog.data : null;


  return {
    recomendations,
    blog,
    allFilters,
    usedFilters,
    categoryData,
    otherFilters,
    goods
  };
};

export default BlogWrapper;
