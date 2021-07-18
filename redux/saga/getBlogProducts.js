import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {
  getBlogProductsSuccess,
  getBlogProductsError
} from '../actions/blogProducts';
import { getProductsByBlog } from '../../services/product';

const getBlogProductsFromStore = state => state.blogProducts.blogProducts;

function* getBlogProducts({ params, body, isConcatData }) {
  const response = yield call(getProductsByBlog, params, body);
  const catalog = yield select(getBlogProductsFromStore);

  if (response.status) {
    const data = isConcatData
      ? { ...response.data, data: [...catalog.data, ...response.data.data] }
      : response.data;
    yield put(getBlogProductsSuccess(data));
  } else {
    yield put(getBlogProductsError('error'));
  }
}

export function* watchGetBlogProducts() {
  yield takeLatest(actionTypes.blogProducts.request, getBlogProducts);
}
