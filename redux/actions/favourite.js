import * as actionTypes from './actionTypes';

export const getFavourites = params => ({
  type: actionTypes.favourite.request,
  params,
});

export const addToFavourite = (params, body) => ({
  type: actionTypes.favourite.save,
  params,
  body,
});

export const deleteFromFavourite = (params, body) => ({
  type: actionTypes.favourite.delete,
  params,
  body,
});

export const getFavouritesSuccess = body => ({
  type: actionTypes.favourite.success,
  body,
});

export const getFavouritesError = error => ({
  type: actionTypes.favourite.error,
  error,
});
