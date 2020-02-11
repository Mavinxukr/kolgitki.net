import OrderWrapper from '../components/Wrappers/Order/Order';
import { getCartData } from '../redux/actions/cart';

OrderWrapper.getInitialState = async ({ store }) => {
  store.dispatch(getCartData({}));
};

export default OrderWrapper;
