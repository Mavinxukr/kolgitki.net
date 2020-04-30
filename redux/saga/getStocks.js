import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { getStocksSuccess, getStocksError } from '../actions/stocks';
import { getStocksByCategoryRequest } from '../../services/stocks';

const getStocksFromStore = state => state.stocks.stocks;

function* getStocks({ params, body, isConcatData }) {
  const response = yield call(getStocksByCategoryRequest, params, body);
  const stocks = yield select(getStocksFromStore);
  if (response.status) {
    const data = isConcatData
      ? { ...response.data, data: [...stocks.data, ...response.data.data] }
      : response.data;
    yield put(getStocksSuccess(data));
  } else {
    yield put(getStocksError('error'));
  }
}

export function* watchGetStocks() {
  yield takeLatest(actionTypes.stocks.request, getStocks);
}
