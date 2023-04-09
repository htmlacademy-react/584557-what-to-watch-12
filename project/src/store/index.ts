import { getApi } from './../api';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';

const apiInstance = getApi();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: apiInstance,
      }
    }),
});
