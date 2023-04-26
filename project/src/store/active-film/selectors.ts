import { State } from '../../types/store';

export const selectActiveFilm = (state: State) => state.activeFilm;
export const selectActiveFilmsDataLoadingStatus = (state: State) => state.activeFilm.isLoading;
export const selectActiveFilmDataLoadingFailed = (state: State) => state.activeFilm.error;
