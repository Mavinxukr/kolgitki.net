import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {
  getCatalogProductsSuccess,
  getCatalogProductsError,
} from '../actions/catalogProducts';
import { getProductsByCategories } from '../../services/product';

function* getCatalogProducts({ params, body }) {
  const response = yield call(getProductsByCategories, params, body);
  if (response.status) {
    yield put(getCatalogProductsSuccess(response.data));
  } else {
    yield put(getCatalogProductsError('error'));
  }
}

export function* watchGetCatalogProducts() {
  yield takeLatest(actionTypes.catalogProducts.request, getCatalogProducts);
}
