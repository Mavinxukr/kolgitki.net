import BlogWrapper from '../../components/Wrappers/BlogArticle/BlogArticle';
import { getDataBySlug } from '../../services/article';

BlogWrapper.getInitialProps = async ({ query }) => {
  const blogData = await getDataBySlug({ namespace: 'blog', slug: query.slug });

  return {
    blogData: blogData.data,
  };
};

export default BlogWrapper;
