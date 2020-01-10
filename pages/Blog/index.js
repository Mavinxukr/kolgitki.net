import BlogsWrapper from '../../components/Wrappers/Blogs/Blogs';
import { getData } from '../../services/blogs';

BlogsWrapper.getInitialProps = async () => {
  const blogsData = await getData({ namespace: 'blog' });

  return {
    blogsData: blogsData.data,
  };
};

export default BlogsWrapper;
