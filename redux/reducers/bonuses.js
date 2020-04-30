import * as actionTypes from '../actions/actionTypes';

const initialState = {
  bonuses: [],
  isFetch: false,
  isDataReceived: false,
  error: null,
};

export const bonuses = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.bonuses.request:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.bonuses.success:
      return {
        ...state,
        bonuses: action.body,
        isDataReceived: true,
        isFetch: false,
      };

    case actionTypes.bonuses.error:
      return {
        ...state,
        isFetch: false,
        isDataReceived: false,
        error: action.error,
      };

    default:
      return state;
  }
};
