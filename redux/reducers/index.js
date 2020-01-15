import { combineReducers } from 'redux';
import brands from './brands';
import registration from './registration';
import login from './login';

export default combineReducers({
  brands,
  registration,
  login,
});
