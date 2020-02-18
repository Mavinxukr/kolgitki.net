import dynamic from 'next/dynamic';
import { getCommentsData } from '../../redux/actions/comment';
import { getProductData } from '../../redux/actions/product';
import { getViewedProducts } from '../../services/product';

const DynamicComponentWithNoSSRProductWrapper = dynamic(
  () => import('../../components/Wrappers/Product/Product'),
  { ssr: false },
);

DynamicComponentWithNoSSRProductWrapper.getInitialProps = async ({
  query,
  store,
}) => {
  const viewedProducts = await getViewedProducts({});
  const isAuth = store.getState().currentUser.isAuth;
  const url = isAuth ? 'goodbyid' : 'goods';
  store.dispatch(getCommentsData({}, Number(query.pid)));
  store.dispatch(
    getProductData({
      params: {},
      id: Number(query.pid),
      url,
    }),
  );

  return {
    viewedProducts: viewedProducts.data,
  };
};

export default DynamicComponentWithNoSSRProductWrapper;
