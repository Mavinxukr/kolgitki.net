import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { getProductDataSuccess, getProductDataError } from '../actions/product';
import { getProductById } from '../../services/product';

function* getProductData(params) {
  const response = yield call(getProductById, params);
  if (response.status) {
    yield put(getProductDataSuccess(response.data));
  } else {
    yield put(getProductDataError('error'));
  }
}

export function* watchGetProductData() {
  yield takeLatest(actionTypes.product.request, getProductData);
}
