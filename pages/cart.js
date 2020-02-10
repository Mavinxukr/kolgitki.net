import CartWrapper from '../components/Wrappers/Cart/Cart';
import { getCartData } from '../redux/actions/cart';

CartWrapper.getInitialProps = async ({ store }) => {
  store.dispatch(getCartData({}));
};

export default CartWrapper;
