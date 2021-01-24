import {combineReducers} from 'redux';

import auth from './auth';
import users from './users';
import profile from './profile';
import photo from './photo';
import message from './message';
import like from './like';

export default combineReducers({
  auth,
  users,
  profile,
  photo,
  message,
  like,
});
