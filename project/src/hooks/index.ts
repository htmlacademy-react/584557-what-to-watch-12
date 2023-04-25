import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { AuthorizationStatus } from '../const';
import { selectAuthorizationStatus } from '../store/user-data/selectors';
import type { State, AppDispatch } from '../types/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useAuth = () => AuthorizationStatus.Auth === useAppSelector(selectAuthorizationStatus);
