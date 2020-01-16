import dynamic from 'next/dynamic';
import { getProductById, getCommentsById, getViewedProducts } from '../../services/product';

const DynamicComponentWithNoSSRProductWrapper = dynamic(
  () => import('../../components/Wrappers/Product/Product'),
  { ssr: false },
);

DynamicComponentWithNoSSRProductWrapper.getInitialProps = async ({ query }) => {
  const productData = await getProductById({}, Number(query.pid));
  const commentsData = await getCommentsById({}, Number(query.pid));
  const viewedProducts = await getViewedProducts({});

  return {
    productData: productData.data,
    commentsData: commentsData.data,
    viewedProducts: viewedProducts.data,
  };
};

export default DynamicComponentWithNoSSRProductWrapper;
