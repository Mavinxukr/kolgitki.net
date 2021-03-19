import BlogWrapper from '../../components/Wrappers/Blog/Blog';
import { getBlogData } from '../../redux/actions/blog';
import { getTags } from '../../services/blog';

BlogWrapper.getInitialProps = async ({ store }) => {
  store.dispatch(getBlogData({}));
  const tags = await getTags({});

  return {
    tags: tags.data
  };
};

export default BlogWrapper;
