import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { addCommentSuccess, addCommentError } from '../actions/comment';
import { addCommentRequest } from '../../services/product';

function* addComment({ params, body, token }) {
  const response = yield call(addCommentRequest, params, body, token);
}

export function* watchAddComment() {
  yield takeLatest(actionTypes.comment.request, addComment);
}
