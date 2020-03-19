import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userData: {},
  isFetch: false,
  isAuth: false,
  error: null,
};

export const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.currentUser.request
      || actionTypes.currentUser.update
      || actionTypes.currentUser.save:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.currentUser.success:
      return {
        ...state,
        userData: action.body,
        isAuth: true,
        isFetch: false,
      };

    case actionTypes.currentUser.error:
      return {
        ...state,
        isFetch: false,
        error: action.error,
      };

    case actionTypes.currentUser.delete:
      return {
        ...state,
        userData: {},
        isAuth: false,
      };

    default:
      return state;
  }
};
