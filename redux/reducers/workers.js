import * as actionTypes from '../actions/actionTypes';

const initialState = {
  workers: [],
  isFetch: false,
  error: null,
};

export const workers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.workers.delete
    || actionTypes.workers.save:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.workers.success:
      return {
        ...state,
        workers: action.body,
        isFetch: false,
      };

    case actionTypes.workers.error:
      return {
        ...state,
        isFetch: false,
        error: action.error,
      };

    default:
      return state;
  }
};
