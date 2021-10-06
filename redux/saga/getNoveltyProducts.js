import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {
  getCatalogProductsSuccess,
  getCatalogProductsError
} from '../actions/catalogProducts';
import { getNovelty } from '../../services/novelty';

const getCatalogFromStore = state => state.catalogProducts.catalogProducts;

function* getNoveltyProducts({ params, body, isConcatData }) {
  const response = yield call(getNovelty, params, body);
  const catalog = yield select(getCatalogFromStore);
  if (response.status) {
    const data = isConcatData
      ? { ...response.data, data: [...catalog.data, ...response.data.data] }
      : response.data;
    yield put(getCatalogProductsSuccess(data));
  } else {
    yield put(getCatalogProductsError('error'));
  }
}

export function* watchGetNoveltyProducts() {
  yield takeLatest(actionTypes.noveltyProducts.request, getNoveltyProducts);
}
