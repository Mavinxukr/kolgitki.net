import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  isFetch: false,
  isDataReceived: false,
  error: null,
};

export const order = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.order.request:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.order.success:
      return {
        ...state,
        orders: action.body,
        isDataReceived: true,
        isFetch: false,
      };

    case actionTypes.order.error:
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
