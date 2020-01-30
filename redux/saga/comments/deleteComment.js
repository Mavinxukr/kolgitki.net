import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getCommentsSuccess, getCommentsError } from '../../actions/comment';
import { deleteCommentRequest } from '../../../services/product';

function* deleteComment(params) {
  const response = yield call(deleteCommentRequest, params);
  if (response.status) {
    const newArr = params.comments.filter(
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
