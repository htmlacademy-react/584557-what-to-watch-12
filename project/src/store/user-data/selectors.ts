import { State } from '../../types/store';

export const selectUserDataState = (state: State) => state.userData;
export const selectUserData = (state: State) => state.userData.data;
export const selectAuthorizationStatus = (state: State) => state.userData.authorizationStatus;
