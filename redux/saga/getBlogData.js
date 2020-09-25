import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { getBlogDataSuccess, getBlogDataError } from '../actions/blog';
import { getBlog } from '../../services/blog';

const getBlogDataFromStore = state => state.blog.blog;

function* getBlogData({ params, isConcatData }) {
  const response = yield call(getBlog, params);
  const blogData = yield select(getBlogDataFromStore);
  if (response.status) {
    const data = isConcatData
      ? { ...response.data, data: [...blogData.data, ...response.data.data] }
      : response.data;
    yield put(getBlogDataSuccess(data));
  } else {
    yield put(getBlogDataError('error'));
  }
}

export function* watchGetBlogData() {
  yield takeLatest(actionTypes.blog.request, getBlogData);
}
