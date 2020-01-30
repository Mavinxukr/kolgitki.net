import { combineReducers } from 'redux';
import { comments } from './comments';
import { currentUser } from './currentUser';
import { cart } from './cart';

export default combineReducers({
  comments,
  currentUser,
  cart,
});
