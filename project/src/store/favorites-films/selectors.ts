import { State } from '../../types/store';

export const selectFavoritesFilmsState = (state: State) => state.favoritesFilms;
export const selectFavoritesFilms = (state: State) => state.favoritesFilms.data;
export const selectFavoritesFilmsDataLoadingStatus = (state: State) => state.favoritesFilms.isLoading;
export const selectFavoritesFilmsDataLoadingFailed = (state: State) => state.favoritesFilms.error;
