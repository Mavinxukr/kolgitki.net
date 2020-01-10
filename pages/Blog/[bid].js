import BlogWrapper from '../../components/Wrappers/Blog/Blog';
import { getDataBySlug } from '../../services/blog';

BlogWrapper.getInitialProps = async ({ query }) => {
  const blogData = await getDataBySlug({ namespace: 'blog', slug: query.slug });

  return {
    blogData: blogData.data,
  };
};

export default BlogWrapper;
