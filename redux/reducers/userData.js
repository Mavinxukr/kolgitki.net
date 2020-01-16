import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userData: {},
  isFetching: false,
  error: null,
  isAuth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.registration.request:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.registration.success:
      return {
        ...state,
        userData: action.payload,
        isFetching: false,
        isAuth: true,
      };

    case actionTypes.registration.error:
      return {
        ...state,
        error: action.error,
        isFetching: false,
        isAuth: false,
      };

    case actionTypes.currentUser.request:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.currentUser.success:
      return {
        ...state,
        userData: action.payload,
        isFetching: false,
        isAuth: true,
      };

    case actionTypes.currentUser.error:
      return {
        ...state,
        error: action.error,
        isFetching: false,
        isAuth: false,
      };

    default:
      return state;
  }
};
