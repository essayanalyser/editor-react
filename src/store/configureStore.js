import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import userReducer from './auth';

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers if needed
});

const store = configureStore({reducer: rootReducer});

export default store;
