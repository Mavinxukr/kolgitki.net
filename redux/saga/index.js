import { all } from 'redux-saga/effects';
import { watchAddComment } from './comments/addComment';
import { watchGetCurrentUser } from './userData/getCurrentUser';
import { watchEditCurrentUserData } from './userData/editCurrentUser';
import { watchLoginViaFacebook } from './userData/loginViaFacebook';
import { watchEditComment } from './comments/editComment';
import { watchDeleteComment } from './comments/deleteComment';
import { watchGetComments } from './comments/getComments';
import { watchGetCartData } from './cart/getCartData';
import { watchAddCartData } from './cart/addCartData';
import { watchUpdateCartData } from './cart/updateCartData';
import { watchDeleteCartItem } from './cart/deleteCartItem';
import { watchGetProductData } from './getProductData';
import { watchGetBlogData } from './getBlogData';
import { watchGetProducts } from './getProducts';
import { watchGetBonuses } from './getBonuses';
import { watchGetFavourites } from './favourite/getFavourites';
import { watchAddToFavourite } from './favourite/addToFavourite';
import { watchDeleteFromFavourite } from './favourite/deleteFromFavourite';
import { watchGetDocuments } from './documents/getDocuments';
import { watchDeleteDocument } from './documents/deleteDocument';
import { watchUploadDocuments } from './documents/uploadDocuments';
import { watchAddWorker } from './workers/addWorker';
import { watchDeleteWorker } from './workers/deleteWorker';

export function* rootSaga() {
  yield all([
    watchAddComment(),
    watchGetCurrentUser(),
    watchEditCurrentUserData(),
    watchLoginViaFacebook(),
    watchEditComment(),
    watchDeleteComment(),
    watchGetComments(),
    watchGetCartData(),
    watchAddCartData(),
    watchUpdateCartData(),
    watchDeleteCartItem(),
    watchGetProductData(),
    watchGetBlogData(),
    watchGetProducts(),
    watchGetBonuses(),
    watchGetFavourites(),
    watchAddToFavourite(),
    watchDeleteFromFavourite(),
    watchGetDocuments(),
    watchDeleteDocument(),
    watchUploadDocuments(),
    watchAddWorker(),
    watchDeleteWorker(),
  ]);
}
