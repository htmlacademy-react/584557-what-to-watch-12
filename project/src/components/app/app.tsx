import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../../pages/main/main';
import MyList from '../../pages/my-list/my-list';
import AddReview from '../../pages/add-review/add-review';
import Movie from '../../pages/movie/movie-page';
import NotFound from '../../pages/not-found/not-found';
import Player from '../../pages/player/player';
import SignIn from '../../pages/sign-in/sign-in';
import { TPromoFilm } from '../../types/film';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';

const App:FC<{promo: TPromoFilm}> = ({ promo }) => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Root} element={<Main promo={promo}/>}/>
      <Route path={AppRoute.Login} element={<SignIn />}/>
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute isAuthorazed={false}>
            <MyList/>
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Films} element={<Movie/>}/>
      <Route path={AppRoute.Rewiew} element={<AddReview/>}/>
      <Route path={AppRoute.Player} element={<Player/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
);

export default App;
