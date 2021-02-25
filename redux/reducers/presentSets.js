import * as actionTypes from '../actions/actionTypes';

const initialState = {
  presentSets: {},
  isFetch: false,
  isDataReceived: false,
  error: null
};

export const presentSets = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.presentSets.request:
      return {
        ...state,
        isFetch: true
      };
    case actionTypes.presentSets.clear:
      return initialState;

    case actionTypes.presentSets.success:
      return {
        ...state,
        presentSets: action.body,
        isDataReceived: true,
        isFetch: false
      };

    case actionTypes.presentSets.error:
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
