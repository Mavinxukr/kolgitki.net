import { createSelector } from 'reselect';

export const isAuthSelector = createSelector(
  state => state.currentUser.isAuth,
  isAuth => isAuth,
);

export const userDataSelector = createSelector(
  state => state.currentUser.userData,
  userData => userData,
);

export const favouritesDataSelector = createSelector(
  state => state.favourite.favourites,
  favourites => favourites,
);

export const isFavouritesDataReceivedSelector = createSelector(
  state => state.favourite.isDataReceived,
  isDataReceived => isDataReceived,
);

export const isDocumentsDataReceivedSelector = createSelector(
  state => state.documents.isDataReceived,
  isDataReceived => isDataReceived,
);

export const documentsSelector = createSelector(
  state => state.documents.documents,
  documents => documents,
);

export const workersDataSelector = createSelector(
  state => state.workers.workers,
  workers => workers,
);


export const isDataReceivedSelectorForCart = createSelector(
  state => state.cart.isDataReceived,
  isDataReceived => isDataReceived,
);

export const cartDataSelector = createSelector(
  state => state.cart.cartData,
  cartData => cartData,
);

export const productsSelector = createSelector(
  state => state.products.products,
  products => products,
);

export const isDataReceivedSelectorForProducts = createSelector(
  state => state.products.isDataReceived,
  isDataReceived => isDataReceived,
);

export const bonusesDataSelector = createSelector(
  state => state.bonuses.bonuses,
  bonuses => bonuses,
);

export const isDataReceivedBonusesSelector = createSelector(
  state => state.bonuses.isDataReceived,
  isDataReceived => isDataReceived,
);

export const isDataReceivedBlogSelector = createSelector(
  state => state.blog.isDataReceived,
  isDataReceived => isDataReceived,
);

export const blogDataSelector = createSelector(
  state => state.blog.blog,
  blog => blog,
);

export const isDataReceivedProductSelector = createSelector(
  state => state.product.isDataReceived,
  isDataReceived => isDataReceived,
);

export const productDataSelector = createSelector(
  state => state.product.product,
  product => product,
);

export const commentsDataSelector = createSelector(
  state => state.comments.comments,
  comments => comments,
);
