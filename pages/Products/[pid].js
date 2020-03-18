import dynamic from 'next/dynamic';
import { getCommentsData } from '../../redux/actions/comment';
import { getProductData } from '../../redux/actions/product';
import { getViewedProducts } from '../../services/product';
import { getDeliveryData } from '../../services/Info/delivery';

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
  const deliveryData = await getDeliveryData({});

  return {
    viewedProducts: viewedProducts.data,
    deliveryData: deliveryData.data,
  };
};

export default DynamicComponentWithNoSSRProductWrapper;
