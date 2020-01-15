import dynamic from 'next/dynamic';
import { getProductById, getCommentsById } from '../../services/product';

const DynamicComponentWithNoSSRProductWrapper = dynamic(
  () => import('../../components/Wrappers/Product/Product'),
  { ssr: false },
);

DynamicComponentWithNoSSRProductWrapper.getInitialProps = async ({ query }) => {
  const productData = await getProductById({}, Number(query.pid));
  const commentsData = await getCommentsById({}, Number(query.pid));

  return {
    productData: productData.data,
    commentsData: commentsData.data,
  };
};

export default DynamicComponentWithNoSSRProductWrapper;
