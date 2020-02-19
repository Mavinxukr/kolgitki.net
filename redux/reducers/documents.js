import * as actionTypes from '../actions/actionTypes';

const initialState = {
  documents: [],
  isFetch: false,
  isAuth: false,
  isDataReceived: false,
  error: null,
};

export const documents = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.documents.request
    || actionTypes.documents.delete
    || actionTypes.documents.save:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.documents.success:
      return {
        ...state,
        documents: action.body,
        isAuth: true,
        isDataReceived: true,
        isFetch: false,
      };

    case actionTypes.documents.error:
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
