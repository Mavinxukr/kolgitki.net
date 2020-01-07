import * as actionTypes from '../actions/actionTypes';
const initialState = {
    brands: [],
    isFetching: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.brands.request:
            return {
                ...state,
                isFetching: true
            };

        case actionTypes.brands.success:
            return {
                ...state,
                brands: action.payload,
                isFetching: false
            };

        case actionTypes.brands.error:
            return {
                ...state,
                error: action.error,
                isFetching: false
            };

        default:
            return state;
    }
};