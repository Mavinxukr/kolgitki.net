import * as actionTypes from '../actions/actionTypes';

const initialState = {
  stockData: null,
  isFetch: false,
  isDataReceived: false,
  error: null,
};

export const stockData = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.stockData.request:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.stockData.success:
      return {
        ...state,
        stockData: action.body,
        isDataReceived: true,
        isFetch: false,
      };

    case actionTypes.stockData.error:
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
