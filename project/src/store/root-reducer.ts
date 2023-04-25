import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import activeFilmReducer from './acive-film/active-film';
import favoritesFilmsReducer from './favorites-films/favorites-films';
import filmsReducer from './films/films';
import newCommentReducer from './new-comment/new-comment';
import promoFilmReducer from './promo-film/promo-film';
import userDataReducer from './user-data/user-data';

export const rootReducer = combineReducers({
  [NameSpace.Films]: filmsReducer,
  [NameSpace.UserData]: userDataReducer,
  [NameSpace.ActiveFilm]: activeFilmReducer,
  [NameSpace.NewComment]: newCommentReducer,
  [NameSpace.FavoritesFilms]: favoritesFilmsReducer,
  [NameSpace.PromoFilm]: promoFilmReducer,
});
