import BlogsWrapper from '../../components/Wrappers/Blogs/Blogs';
import { getBlogs } from '../../services/blogs';

BlogsWrapper.getInitialProps = async () => {
  const blogsData = await getBlogs({});

  return {
    blogsData: blogsData.data,
  };
};

export default BlogsWrapper;
