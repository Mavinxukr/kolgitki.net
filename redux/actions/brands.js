import * as actionTypes from './actionTypes';

export const getBrands = params => ({
    type: actionTypes.brands.request,
    params
});


export const getBrandsSuccess = payload => ({
    type: actionTypes.brands.success,
    payload
});


export const getBrandsError = error => ({
    type: actionTypes.brands.error,
    error
});