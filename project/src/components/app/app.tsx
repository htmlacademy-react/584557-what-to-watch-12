import { FC } from 'react';
import Main from '../../pages/main/main';
import { TPromoFilm } from '../../types/film';

const App:FC<{promo: TPromoFilm}> = ({ promo }) => (
  <Main promo={promo} />
);

export default App;
