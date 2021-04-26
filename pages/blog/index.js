import BlogWrapper from '../../components/Wrappers/Blog/Blog';
import { getBlogData } from '../../redux/actions/blog';
import { getBlog, getRecommendations, getTags } from '../../services/blog';

BlogWrapper.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return {
      recomendations: null,
      blogs: null,
      filters: {},
      tags: null
    };
  }
  const filters = { ...query };

  const responseRecomendations = await getRecommendations({});
  const recomendations = (await responseRecomendations.status)
    ? responseRecomendations.data
    : null;

  const responseBlogs = await getBlog({ ...filters });
  const blogs = (await responseBlogs.status) ? responseBlogs.data : null;

  const tagsResponse = await getTags({});
  const tags = tagsResponse.status ? tagsResponse.data : null;

  return {
    recomendations,
    blogs,
    tags,
    filters
  };
};

export default BlogWrapper;
