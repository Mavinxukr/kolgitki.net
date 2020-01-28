import * as actionTypes from '../actions/actionTypes';

const initialState = {
  comments: [],
  isFetch: false,
  error: null,
};

export const comments = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.comment.request
      || actionTypes.comment.update
      || actionTypes.comment.delete
      || actionTypes.comment.save:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.comment.success:
      return {
        ...state,
        comments: action.body,
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
