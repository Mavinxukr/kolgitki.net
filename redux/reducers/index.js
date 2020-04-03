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
import { order } from './order';
import { catalogProducts } from './catalogProducts';
import { presentSets } from './presentSets';
import { presentSet } from './presentSet';
import { stocks } from './stocks';
import { stockData } from './stockData';

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
  order,
  catalogProducts,
  presentSets,
  presentSet,
  stocks,
  stockData,
});
