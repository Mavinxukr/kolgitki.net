import { combineReducers } from 'redux';
import { comments } from './comments';
import { currentUser } from './currentUser';
import { cart } from './cart';
import { product } from './product';
import { products } from './products';
import { blog } from './blog';
import { bonuses } from './bonuses';
import { favourite } from './favourite';
import { documents } from './documents';
import { workers } from './workers';

export default combineReducers({
  comments,
  currentUser,
  cart,
  product,
  products,
  blog,
  bonuses,
  favourite,
  documents,
  workers,
});
