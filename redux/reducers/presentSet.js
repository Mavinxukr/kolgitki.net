import * as actionTypes from '../actions/actionTypes';

const initialState = {
  presentSet: {},
  isFetch: false,
  isDataReceived: false,
  error: null,
};

export const presentSet = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.presentSet.request:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.presentSet.success:
      return {
        ...state,
        presentSet: action.body,
        isDataReceived: true,
        isFetch: false,
      };

    case actionTypes.presentSet.error:
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
