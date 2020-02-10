import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { getBlogDataSuccess, getBlogDataError } from '../actions/blog';
import { getBlog } from '../../services/blog';

function* getBlogData({ params }) {
  const response = yield call(getBlog, params);
  if (response.status) {
    yield put(getBlogDataSuccess(response.data));
  } else {
    yield put(getBlogDataError('error'));
  }
}

export function* watchGetBlogData() {
  yield takeLatest(actionTypes.blog.request, getBlogData);
}
