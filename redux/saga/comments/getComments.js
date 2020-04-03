import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getCommentsSuccess, getCommentsError } from '../../actions/comment';
import { getCommentsById } from '../../../services/product';

function* getComments({ params, id, isPresent }) {
  const response = yield call(getCommentsById, params, id, isPresent);
  if (response.status) {
    yield put(getCommentsSuccess(response.data));
  } else {
    yield put(getCommentsError('error'));
  }
}

export function* watchGetComments() {
  yield takeLatest(actionTypes.comment.request, getComments);
}
