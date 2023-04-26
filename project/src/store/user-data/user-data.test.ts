import userDataReducer, { TUserDataState } from './user-data';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { makeUserDataStub } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

describe('Reducer: favoritesFilms', () => {
  let state: TUserDataState;

  beforeEach(() => {
    state = { data: null, authorizationStatus: AuthorizationStatus.Unknown, isLoading: false, error: false };
  });
  it('without additional parameters should return initial state', () => {
    expect(userDataReducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ data: null, authorizationStatus: AuthorizationStatus.Unknown, isLoading: false, error: false });
  });

  const userData = makeUserDataStub();

  it('should update user data by checkAuth', () => {
    expect(userDataReducer(state, { type: checkAuthAction.fulfilled.type, payload: userData }))
      .toEqual({ data: userData, authorizationStatus: AuthorizationStatus.Auth, isLoading: false, error: false });
  });

  it('should update user data by login', () => {
    expect(userDataReducer(state, { type: loginAction.fulfilled.type, payload: userData }))
      .toEqual({ data: userData, authorizationStatus: AuthorizationStatus.Auth, isLoading: false, error: false });
  });

  it('should set isLoading flag if login data is load', () => {
    expect(userDataReducer(state, { type: loginAction.pending.type }))
      .toEqual({ data: null, authorizationStatus: AuthorizationStatus.Unknown, isLoading: true, error: false });
  });

  it('should set isLoading flag if checkAuth is load', () => {
    expect(userDataReducer(state, { type: checkAuthAction.pending.type }))
      .toEqual({ data: null, authorizationStatus: AuthorizationStatus.Unknown, isLoading: true, error: false });
  });

  it('should set hasError flag if server is unavailable after login request', () => {
    expect(userDataReducer(state, { type: loginAction.rejected.type }))
      .toEqual({ data: null, authorizationStatus: AuthorizationStatus.NoAuth, isLoading: false, error: true });
  });

  it('should set hasError flag if server is unavailable after checkAuth request', () => {
    expect(userDataReducer(state, { type: checkAuthAction.rejected.type }))
      .toEqual({ data: null, authorizationStatus: AuthorizationStatus.NoAuth, isLoading: false, error: true });
  });

  it('should update user data by logout', () => {
    expect(userDataReducer(state, { type: logoutAction.fulfilled.type }))
      .toEqual({ data: null, authorizationStatus: AuthorizationStatus.NoAuth, isLoading: false, error: false });
  });
});
