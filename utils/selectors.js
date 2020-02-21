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
