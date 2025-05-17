// redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import visitedReducer from './visited';

const store = configureStore({
  reducer: {
    visited: visitedReducer,
  },
});

export default store;