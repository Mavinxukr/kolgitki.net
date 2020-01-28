import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { getCommentsSuccess, getCommentsError } from '../actions/comment';
import { addCommentRequest } from '../../services/product';

function* addComment(params) {
  const response = yield call(addCommentRequest, params);
  if (response.status) {
    const newArr = [...params.comments, response.data];
    yield put(getCommentsSuccess(newArr));
  } else {
    yield put(getCommentsError('error'));
  }
}

export function* watchAddComment() {
  yield takeLatest(actionTypes.comment.save, addComment);
}
