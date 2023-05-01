import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, MovieTab } from '../../const';
import { TComments } from '../../types/comment';
import { TFilm } from '../../types/film';
import { Details } from '../details/details';
import { Overview } from '../overview/overview';
import { Reviews } from '../reviews/reviews';

const tabsMap = {
  [MovieTab.Details]: Details,
  [MovieTab.Reviews]: Reviews,
  [MovieTab.Overview]: Overview,
};

export const MovieTabs:FC<{ film: TFilm; activeTab: MovieTab; filmComments: TComments }> = ({ film, activeTab, filmComments }) => {
  const { id } = film;
  const TabComponent = tabsMap[activeTab] || Overview;

  return (
    <div className="film-card__desc" data-testid="movie-tabs">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {
            Object.keys(MovieTab).map((movieTabName) => (
              <li
                key={movieTabName}
                className={`film-nav__item ${activeTab === movieTabName ? 'film-nav__item--active' : ''}`}
              >
                <Link
                  to={`/${
                    AppRoute.Films
                      .replace(':id', String(id))
                      .replace(':tabName?', movieTabName)}`}
                  className="film-nav__link"
                >
                  {movieTabName}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>

      <TabComponent film={film} filmComments={filmComments} />
    </div>
  );};
