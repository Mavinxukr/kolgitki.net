import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {
  getBlogProductsSuccess,
  getBlogProductsError
} from '../actions/blogProducts';
import { getProductsByBlog } from '../../services/product';

function* getBlogProducts({ params, body }) {
  const response = yield call(getProductsByBlog, params, body);
  if (response.status) {
    const data = response.data;
    yield put(getBlogProductsSuccess(data));
  } else {
    yield put(getBlogProductsError('error'));
  }
}

export function* watchGetBlogProducts() {
  yield takeLatest(actionTypes.blogProducts.request, getBlogProducts);
}
