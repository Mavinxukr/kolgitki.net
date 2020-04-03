import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { getStockDataSuccess, getStockDataError } from '../actions/stockData';
import { getStock } from '../../services/stocks';

const getStockDataFromStore = state => state.stockData.stockData;

function* getStockData({ params, slug, isConcatData }) {
  const response = yield call(getStock, params, slug);
  const stockData = yield select(getStockDataFromStore);
  if (response.status) {
    const data = isConcatData
      ? {
        ...response.data,
        goods: {
          ...response.data.goods,
          data: [...stockData.goods.data, ...response.data.goods.data],
        },
      }
      : response.data;
    yield put(getStockDataSuccess(data));
  } else {
    yield put(getStockDataError('error'));
  }
}

export function* watchGetStockData() {
  yield takeLatest(actionTypes.stockData.request, getStockData);
}
