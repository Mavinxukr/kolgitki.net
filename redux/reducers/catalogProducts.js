import * as actionTypes from '../actions/actionTypes';

const initialState = {
  catalogProducts: null,
  isFetch: false,
  isDataReceived: false,
  error: null
};

export const catalogProducts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.catalogProducts.request:
      return {
        ...state,
        isFetch: true
      };

    case actionTypes.catalogProducts.success:
      return {
        ...state,
        catalogProducts: action.body,
        isDataReceived: true,
        isFetch: false
      };

    case actionTypes.catalogProducts.error:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        error: action.error
      };

    case actionTypes.catalogProducts.clear:
      return initialState;

    default:
      return state;
  }
};
