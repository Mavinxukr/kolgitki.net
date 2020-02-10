import * as actionTypes from '../actions/actionTypes';

const initialState = {
  blog: {},
  isFetch: false,
  isDataReceived: false,
  error: null,
};

export const blog = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.blog.request:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.blog.success:
      return {
        ...state,
        blog: action.body,
        isDataReceived: true,
        isFetch: false,
      };

    case actionTypes.blog.error:
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
