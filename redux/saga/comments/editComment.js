import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import { getCommentsSuccess, getCommentsError } from '../../actions/comment';
import { editCommentRequest } from '../../../services/product';

const getCommentsData = state => state.comments.comments;

function* editComment(params) {
  const response = yield call(editCommentRequest, params);
  const comments = yield select(getCommentsData);
  if (response.status) {
    const idx = comments.findIndex(item => item.id === response.data.id);
    const newArr = comments.map((item, index) => idx === index ? response.data : item);
    yield put(getCommentsSuccess(newArr));
  } else {
    yield put(getCommentsError('error'));
  }
}

export function* watchEditComment() {
  yield takeLatest(actionTypes.comment.update, editComment);
}
