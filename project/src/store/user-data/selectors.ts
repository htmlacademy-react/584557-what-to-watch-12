import { State } from '../../types/store';

export const selectUserData = (state: State) => state.userData.data;
export const selectAuthorizationStatus = (state: State) => state.userData.authorizationStatus;
