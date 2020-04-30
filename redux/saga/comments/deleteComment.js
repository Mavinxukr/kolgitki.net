import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getCommentsSuccess, getCommentsError } from '../../actions/comment';
import { deleteCommentRequest } from '../../../services/product';

const getCommentsData = state => state.comments.comments;

function* deleteComment(params) {
  const response = yield call(deleteCommentRequest, params);
  const comments = yield select(getCommentsData);
  if (response.status) {
    const newArr = comments.filter(
      item => item.id !== params.body.comment_id,
    );
    yield put(getCommentsSuccess(newArr));
  } else {
    yield put(getCommentsError('error'));
  }
}

export function* watchDeleteComment() {
  yield takeLatest(actionTypes.comment.delete, deleteComment);
}
