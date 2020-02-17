import { createSelector } from 'reselect';

export const isAuthSelector = createSelector(
  state => state.currentUser.isAuth,
  isAuth => isAuth,
);

export const userDataSelector = createSelector(
  state => state.currentUser.userData,
  userData => userData,
);
