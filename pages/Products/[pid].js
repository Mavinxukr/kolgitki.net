import dynamic from 'next/dynamic';
import Cookies from 'universal-cookie/cjs';
import { getCommentsData } from '../../redux/actions/comment';
import {
  getProductById,
  getViewedProducts,
} from '../../services/product';

const cookie = new Cookies();

const DynamicComponentWithNoSSRProductWrapper = dynamic(
  () => import('../../components/Wrappers/Product/Product'),
  { ssr: false },
);

DynamicComponentWithNoSSRProductWrapper.getInitialProps = async ({ query, store }) => {
  const productData = await getProductById({}, Number(query.pid), cookie.get('token'));
  const viewedProducts = await getViewedProducts({});
  store.dispatch(getCommentsData({}, Number(query.pid)));
  return {
    productData: productData.data,
    viewedProducts: viewedProducts.data,
  };
};

export default DynamicComponentWithNoSSRProductWrapper;
