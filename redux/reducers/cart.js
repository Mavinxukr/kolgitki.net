import * as actionTypes from '../actions/actionTypes';

const initialState = {
  cartData: [],
  isFetch: false,
  error: null,
};

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.cart.request
    || actionTypes.cart.update
    || actionTypes.cart.delete
    || actionTypes.cart.save:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.cart.success:
      return {
        cartData: action.body,
        isFetch: false,
        error: null,
      };

    case actionTypes.cart.error:
      return {
        ...state,
        isFetch: false,
        error: action.error,
      };

    default:
      return state;
  }
};
