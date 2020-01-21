import { combineReducers } from 'redux';
import commentsReducers from './comment';
import authReducer from './auth';

export default combineReducers({
    comments: commentsReducers,
    auth: authReducer
});
