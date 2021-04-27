import BlogWrapper from '../../components/Wrappers/BlogArticle/BlogArticle';
import { getDataBySlug } from '../../services/article';
import { getRecommendations } from '../../services/blog';
import { getAllBlogFilters } from '../../services/home';
import { getProductsByBlog } from '../../services/product';

BlogWrapper.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return {
      recomendations: null,
      blog: null,
      filters: {},
      goods: null,
      filterListFromPost: null
    };
  }

  const responseRecomendations = await getRecommendations({});
  const recomendations = (await responseRecomendations.status)
    ? responseRecomendations.data
    : null;

  const { bid } = query;
  const responseBlog = await getDataBySlug({}, bid);
  const blog = (await responseBlog.status) ? responseBlog.data : null;

  const responseFiltersList = await getAllBlogFilters({ post_id: blog.id });
  const filterListFromPost = responseFiltersList.status
    ? responseFiltersList.data
    : null;

  const filters = { ...query };
  delete filters.bid;

  const filtersForResponse = {};
  Object.keys(filters).map(filter => {
    if (filter === 'dencity' || filter === 'materials') {
      filtersForResponse.attribute = `${filters[filter]}${
        filtersForResponse.hasOwnProperty('attribute')
          ? '|' + filtersForResponse.attribute
          : ''
      }`;
    } else {
      filtersForResponse[filter] = filters[filter];
    }
  });

  const responseProductsBlog = await getProductsByBlog(
    {},
    {
      ...filtersForResponse,
      post: blog.id
    }
  );
  const goods = responseProductsBlog.status ? responseProductsBlog.data : null;

  return {
    recomendations,
    blog,
    filters,
    filterListFromPost,
    goods
  };
};

export default BlogWrapper;
