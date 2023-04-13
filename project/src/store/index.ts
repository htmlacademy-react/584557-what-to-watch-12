import { getApi } from '../services/api';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { redirect } from './middlewares/redirects';

const apiInstance = getApi();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: apiInstance,
      }
    }).concat(redirect),
});
