import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userData: {},
  isFetching: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.login.request:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.login.success:
      return {
        ...state,
        userData: action.payload,
        isFetching: false,
      };

    case actionTypes.login.error:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };

    default:
      return state;
  }
};
