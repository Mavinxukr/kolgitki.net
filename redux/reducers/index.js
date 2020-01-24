import { combineReducers } from 'redux';
import { comments } from './comments';
import { currentUser } from './currentUser';

export default combineReducers({
  comments,
  currentUser,
});
