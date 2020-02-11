import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { getProductsDataSuccess, getProductsDataError } from '../actions/products';
import { getProductsByArr } from '../../services/order';

function* getProducts({ params }) {
  const response = yield call(getProductsByArr, params);
  if (response.status) {
    yield put(getProductsDataSuccess(response.data));
  } else {
    yield put(getProductsDataError('error'));
  }
}

export function* watchGetProducts() {
  yield takeLatest(actionTypes.products.request, getProducts);
}
