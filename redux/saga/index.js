import { all } from 'redux-saga/effects';
import { watchAddComment } from './addComment';
import { watchGetCurrentUser } from './getCurrentUser';
import { watchEditComment } from './editComment';
import { watchDeleteComment } from './deleteComment';
import { watchGetComments } from './getComments';

export function* rootSaga() {
  yield all([
    watchAddComment(),
    watchGetCurrentUser(),
    watchEditComment(),
    watchDeleteComment(),
    watchGetComments(),
  ]);
}
