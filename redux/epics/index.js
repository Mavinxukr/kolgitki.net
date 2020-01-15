import { combineEpics } from 'redux-observable';
import brandsEpic from './brands';
import registrationEpic from './registration';


const rootEpic = combineEpics(
  brandsEpic,
  registrationEpic,
);

export default rootEpic;
