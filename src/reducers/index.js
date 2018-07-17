import { combineReducers } from 'redux';
import { notedReducer } from './notedReducer';

export default combineReducers({
  noted: notedReducer
})
