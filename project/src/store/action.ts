import { AppRoute } from './../const';
import { createAction } from '@reduxjs/toolkit';

export const redirectToRoute = createAction(
  'router/redirectToRoute',
  (route: AppRoute) => ({
    payload: route
  })
);
