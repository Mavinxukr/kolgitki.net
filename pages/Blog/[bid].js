import BlogWrapper from '../../components/Wrappers/BlogArticle/BlogArticle';
import { getDataBySlug } from '../../services/article';

BlogWrapper.getInitialProps = async ({ query }) => {
  const blogData = await getDataBySlug({}, query.bid.split('_')[0]);

  return {
    blogData: blogData.data,
  };
};

export default BlogWrapper;
