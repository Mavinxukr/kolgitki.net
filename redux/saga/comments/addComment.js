import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getCommentsSuccess, getCommentsError } from '../../actions/comment';
import { addCommentRequest } from '../../../services/product';

const getCommentsData = state => state.comments.comments;

function* addComment(params) {
  const response = yield call(addCommentRequest, params);
  const comments = yield select(getCommentsData);
  if (response.status) {
    const newArr = [...comments, response.data];
    yield put(getCommentsSuccess(newArr));
  } else {
    yield put(getCommentsError('error'));
  }
}

export function* watchAddComment() {
  yield takeLatest(actionTypes.comment.save, addComment);
}
