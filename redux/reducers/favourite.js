import * as actionTypes from '../actions/actionTypes';

const initialState = {
  favourites: [],
  isFetch: false,
  isDataReceived: false,
  error: null,
};

export const favourite = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.favourite.request
    || actionTypes.favourite.delete
    || actionTypes.favourite.save:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.favourite.success:
      return {
        ...state,
        favourites: action.body,
        isDataReceived: true,
        isFetch: false,
      };

    case actionTypes.favourite.error:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        error: action.error,
      };

    default:
      return state;
  }
};
