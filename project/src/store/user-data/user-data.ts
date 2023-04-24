import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { checkAuthAction, loginAction } from '../api-actions';
import { TUserData } from '../../types/user';

export type TUserDataState = {
  authorizationStatus: AuthorizationStatus;
  data: TUserData | null;
  isLoading: boolean;
  error: boolean;
}

const initialState: TUserDataState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  data: null,
  isLoading: false,
  error: false
};

const isPendingAction = isPending(checkAuthAction, loginAction);
const isRejectedAction = isRejected(checkAuthAction, loginAction);
const isFulfilledAction = isFulfilled(checkAuthAction, loginAction);

const { reducer: userDataReducer } = createSlice({
  name: NameSpace.UserData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilledAction, (state, { payload }) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.data = payload;

        state.isLoading = false;
        state.error = false;
      })
      .addMatcher(isPendingAction, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;

        state.isLoading = true;
        state.error = false;
      })
      .addMatcher(isRejectedAction, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;

        state.isLoading = false;
        state.error = true;
      });
  },
});

export default userDataReducer;
