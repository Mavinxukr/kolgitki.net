import { createSelector } from 'reselect';

export const isAuthSelector = createSelector(
  state => state.currentUser.isAuth,
  isAuth => isAuth
);

export const userDataSelector = createSelector(
  state => state.currentUser.userData,
  userData => userData
);

export const favouritesDataSelector = createSelector(
  state => state.favourite.favourites,
  favourites => favourites
);

export const isFavouritesDataReceivedSelector = createSelector(
  state => state.favourite.isDataReceived,
  isDataReceived => isDataReceived
);

export const isDocumentsDataReceivedSelector = createSelector(
  state => state.documents.isDataReceived,
  isDataReceived => isDataReceived
);

export const documentsSelector = createSelector(
  state => state.documents.documents,
  documents => documents
);

export const workersDataSelector = createSelector(
  state => state.workers.workers,
  workers => workers
);

export const isDataReceivedSelectorForCart = createSelector(
  state => state.cart.isDataReceived,
  isDataReceived => isDataReceived
);
export const loadingSelectorForCart = createSelector(
  state => state.cart.isFetch,
  isFetch => isFetch
);

export const cartDataSelector = createSelector(
  state => state.cart.cartData,
  cartData => cartData
);

export const productsSelector = createSelector(
  state => state.products.products,
  products => products
);

export const isDataReceivedSelectorForProducts = createSelector(
  state => state.products.isDataReceived,
  isDataReceived => isDataReceived
);

export const loadingSelectorForProducts = createSelector(
  state => state.products.isFetch,
  isFetch => isFetch
);

export const bonusesDataSelector = createSelector(
  state => state.bonuses.bonuses,
  bonuses => bonuses
);

export const isDataReceivedBonusesSelector = createSelector(
  state => state.bonuses.isDataReceived,
  isDataReceived => isDataReceived
);

export const isDataReceivedBlogSelector = createSelector(
  state => state.blog.isDataReceived,
  isDataReceived => isDataReceived
);

export const blogDataSelector = createSelector(
  state => state.blog.blog,
  blog => blog
);
export const loadingBlogSelector = createSelector(
  state => state.blog.isFetch,
  isFetch => isFetch
);

export const isDataReceivedProductSelector = createSelector(
  state => state.product.isDataReceived,
  isDataReceived => isDataReceived
);

export const productDataSelector = createSelector(
  state => state.product.product,
  product => product
);

export const isDataReceivedPresentSetSelector = createSelector(
  state => state.presentSet.isDataReceived,
  isDataReceived => isDataReceived
);

export const presentSetDataSelector = createSelector(
  state => state.presentSet.presentSet,
  presentSet => presentSet
);

export const commentsDataSelector = createSelector(
  state => state.comments.comments,
  comments => comments
);

export const ordersDataSelector = createSelector(
  state => state.order.orders,
  orders => orders
);

export const isDataReceivedForOrders = createSelector(
  state => state.order.isDataReceived,
  isDataReceived => isDataReceived
);

export const dataCatalogProductsSelector = createSelector(
  state => state.catalogProducts.catalogProducts,
  catalogProducts => catalogProducts
);

export const dataBlogProductsSelector = createSelector(
  state => state.blogProducts.blogProducts,
  blogProducts => blogProducts
);

export const isDataReceivedForCatalogProducts = createSelector(
  state => state.catalogProducts.isDataReceived,
  isDataReceived => isDataReceived
);
export const isDataReceivedForBlogProducts = createSelector(
  state => state.blogProducts.isDataReceived,
  isDataReceived => isDataReceived
);

export const dataPresentSetsSelector = createSelector(
  state => state.presentSets.presentSets,
  presentSets => presentSets
);

export const isDataReceivedForPresentSets = createSelector(
  state => state.presentSets.isDataReceived,
  isDataReceived => isDataReceived
);

export const dataStocksSelector = createSelector(
  state => state.stocks.stocks,
  stocks => stocks
);

export const isDataReceivedForStocks = createSelector(
  state => state.stocks.isDataReceived,
  isDataReceived => isDataReceived
);

export const dataStockSelector = createSelector(
  state => state.stockData.stockData,
  stockData => stockData
);

export const isDataReceivedForStock = createSelector(
  state => state.stockData.isDataReceived,
  isDataReceived => isDataReceived
);
