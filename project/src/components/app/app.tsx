import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../../pages/main/main';
import MyList from '../../pages/my-list/my-list';
import AddReview from '../../pages/add-review/add-review';
import Movie from '../../pages/movie/movie';
import NotFound from '../../pages/not-found/not-found';
import Player from '../../pages/player/player';
import SignIn from '../../pages/sign-in/sign-in';
import { TFilm } from '../../types/film';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import { films } from '../../moks/films';

const App:FC<{promo: TFilm}> = ({ promo }) => (
  <HistoryRouter history={browserHistory}>
    <ScrollToTop />
    <Routes>
      <Route path={AppRoute.Root}>
        <Route index element={<Main promo={promo} />}/>
        <Route path={AppRoute.Films} element={<Movie/>}/>
        <Route
          path={AppRoute.Rewiew}
          element={
            <PrivateRoute>
              <AddReview films={films}/>
            </PrivateRoute>
          }
        />
      </Route>
      <Route path={AppRoute.Player} element={<Player films={films}/>}/>
      <Route path={AppRoute.Login} element={<SignIn />}/>
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute>
            <MyList films={films}/>
          </PrivateRoute>
        }
      />
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  </HistoryRouter>
);

export default App;
