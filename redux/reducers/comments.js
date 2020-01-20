import * as actionTypes from '../actions/actionTypes';

const initialState = {
  comments: [],
  isFetch: false,
  error: null,
};

export const comments = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.comment.request:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.comment.success:
      return {
        ...state,
        comments: [...state.comments, action.body],
        isFetch: false,
      };

    case actionTypes.comment.error:
      return {
        ...state,
        isFetch: false,
        error: action.error,
      };

    default:
      return state;
  }
};