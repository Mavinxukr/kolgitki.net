import dynamic from 'next/dynamic';
import { getCommentsData } from '../../redux/actions/comment';
import { getProductData } from '../../redux/actions/product';
import { getPresentSet } from '../../redux/actions/presentSet';
import { getViewedProducts } from '../../services/product';
import { getDeliveryData } from '../../services/Info/delivery';
import { definiteUrlAndFunc } from '../../utils/helpers';

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
  const params = definiteUrlAndFunc(
    query,
    isAuth,
    getPresentSet,
    getProductData,
  );
  store.dispatch(getCommentsData({}));
  store.dispatch(
    params.func({
      params: {},
      url: params.url,
    }),
  );
  const deliveryData = await getDeliveryData({});

  return {
    viewedProducts: viewedProducts.data,
    deliveryData: deliveryData.data,
  };
};

export default DynamicComponentWithNoSSRProductWrapper;
