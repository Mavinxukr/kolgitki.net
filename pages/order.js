import OrderWrapper from '../components/Wrappers/Order/Order';
import { sendCurrentUserData } from '../redux/actions/currentUser';
import { getCartData } from '../redux/actions/cart';

OrderWrapper.getInitialState = async ({ store }) => {
  store.dispatch(sendCurrentUserData({}));
  store.dispatch(getCartData({}));
};

export default OrderWrapper;
