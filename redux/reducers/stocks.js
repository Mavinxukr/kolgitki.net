import * as actionTypes from '../actions/actionTypes';

const initialState = {
  stocks: {},
  isFetch: false,
  isDataReceived: false,
  error: null
};

export const stocks = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.stocks.clear:
      return initialState;

    case actionTypes.stocks.request:
      return {
        ...state,
        isFetch: true
      };

    case actionTypes.stocks.success:
      return {
        ...state,
        stocks: action.body,
        isDataReceived: true,
        isFetch: false
      };

    case actionTypes.stocks.error:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        error: action.error
      };

    default:
      return state;
  }
};
