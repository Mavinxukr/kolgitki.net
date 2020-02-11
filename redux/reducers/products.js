import * as actionTypes from '../actions/actionTypes';

const initialState = {
  products: [],
  isFetch: false,
  isDataReceived: false,
  error: null,
};

export const products = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.products.request:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.products.success:
      return {
        ...state,
        products: action.body,
        isDataReceived: true,
        isFetch: false,
      };

    case actionTypes.products.error:
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
