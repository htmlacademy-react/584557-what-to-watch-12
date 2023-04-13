import { FC } from 'react';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { TFilms } from '../../types/film';

const MyList:FC<{ films: TFilms }> = ({ films }) => (
  <div className="user-page">
    <Header additionalClassName='user-page__head'>
      <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
    </Header>

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      {/* <FilmsList films={films} /> */}
    </section>

    <Footer />
  </div>
);

export default MyList;
