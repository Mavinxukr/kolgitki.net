import { combineReducers } from 'redux';
import brands from './brands';
import userData from './userData';

export default combineReducers({
  brands,
  userData,
});
