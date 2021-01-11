import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {
  getCatalogProductsSuccess,
  getCatalogProductsError,
} from '../actions/catalogProducts';
import { getProductsByCategories } from '../../services/product';

// const getCatalogFromStore = state => state.catalogProducts.catalogProducts;

function* getCatalogProducts({ params, body, isConcatData }) {
  const response = yield call(
    getProductsByCategories,
    params,
    body,
    isConcatData,
  );
  // const catalog = yield select(getCatalogFromStore);
  if (response.status) {
    const data = isConcatData ? response.data : response.data;
    yield put(getCatalogProductsSuccess(data));
  } else {
    yield put(getCatalogProductsError('error'));
  }
}

export function* watchGetCatalogProducts() {
  yield takeLatest(actionTypes.catalogProducts.request, getCatalogProducts);
}
