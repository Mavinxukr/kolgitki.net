import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getCommentsSuccess, getCommentsError } from '../../actions/comment';
import { editCommentRequest } from '../../../services/product';

function* editComment(params) {
  const response = yield call(editCommentRequest, params);
  if (response.status) {
    const idx = params.comments.findIndex(item => item.id === response.data.id);
    const newArr = params.comments.map((item, index) => idx === index ? response.data : item);
    yield put(getCommentsSuccess(newArr));
  } else {
    yield put(getCommentsError('error'));
  }
}

export function* watchEditComment() {
  yield takeLatest(actionTypes.comment.update, editComment);
}
