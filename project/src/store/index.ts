import { getApi } from '../services/api';
import { configureStore } from '@reduxjs/toolkit';
import { redirect } from './middlewares/redirects';
import { rootReducer } from './root-reducer';

const apiInstance = getApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: apiInstance,
      }
    }).concat(redirect),
});
