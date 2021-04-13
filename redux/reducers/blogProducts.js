import * as actionTypes from '../actions/actionTypes';

const initialState = {
  blogProducts: null,
  isFetch: false,
  isDataReceived: false,
  error: null
};

export const blogProducts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.blogProducts.request:
      return {
        ...state,
        isFetch: true
      };

    case actionTypes.blogProducts.success:
      return {
        ...state,
        blogProducts: action.body,
        isDataReceived: true,
        isFetch: false
      };

    case actionTypes.blogProducts.error:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        error: action.error
      };

    case actionTypes.blogProducts.clear:
      return initialState;

    default:
      return state;
  }
};
