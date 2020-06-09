import * as actionTypes from '../actions/actionTypes';

const initialState = {
  product: {},
  isFetch: false,
  isDataReceived: false,
  error: null,
};

export const product = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.product.request:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.product.success:
      return {
        ...state,
        product: action.body,
        isDataReceived: true,
        isFetch: false,
      };

    case actionTypes.product.error:
      return {
        ...state,
        isFetch: false,
        isDataReceived: false,
        error: action.error,
      };

    case actionTypes.product.clear:
      console.log('hello');
      return {
        product: {},
        isDataReceived: false,
      };

    default:
      return state;
  }
};
