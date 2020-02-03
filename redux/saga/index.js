import { all } from 'redux-saga/effects';
import { watchAddComment } from './comments/addComment';
import { watchGetCurrentUser } from './getCurrentUser';
import { watchEditComment } from './comments/editComment';
import { watchDeleteComment } from './comments/deleteComment';
import { watchGetComments } from './comments/getComments';
import { watchGetCartData } from './cart/getCartData';
import { watchAddCartData } from './cart/addCartData';
import { watchUpdateCartData } from './cart/updateCartData';
import { watchDeleteCartItem } from './cart/deleteCartItem';
import { watchGetProductData } from './getProductData';

export function* rootSaga() {
  yield all([
    watchAddComment(),
    watchGetCurrentUser(),
    watchEditComment(),
    watchDeleteComment(),
    watchGetComments(),
    watchGetCartData(),
    watchAddCartData(),
    watchUpdateCartData(),
    watchDeleteCartItem(),
    watchGetProductData(),
  ]);
}
