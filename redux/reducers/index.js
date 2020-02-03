import { combineReducers } from 'redux';
import { comments } from './comments';
import { currentUser } from './currentUser';
import { cart } from './cart';
import { product } from './product';

export default combineReducers({
  comments,
  currentUser,
  cart,
  product,
});
