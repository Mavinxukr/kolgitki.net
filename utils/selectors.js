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
