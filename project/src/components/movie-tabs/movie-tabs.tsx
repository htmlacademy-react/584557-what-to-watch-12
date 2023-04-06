import { FC, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoute, MovieTab } from '../../const';
import { TFilm } from '../../types/film';
import { getRaitingText } from '../../utils/common';

const OverviewTab:FC<{ film: TFilm }> = ({ film }) => {
  const { rating, scoresCount, description, director, starring } = film;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{String(rating).replace('.', ',')}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRaitingText(rating)}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.join(', ')} and other</strong></p>
      </div>
    </>
  );
};

const DetailsTab:FC<{ film: TFilm }> = ({ film }) => {
  const { director, starring, genre, released, runTime } = film;

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {
              starring.map((actor) => (<Fragment key={actor}>{actor}, <br/></Fragment>))
            }
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">
            {Math.trunc(runTime / 60)}h {runTime - Math.trunc(runTime / 60) * 60}m
          </span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
};

const ReviewsTab = () => (
  <div className="film-card__reviews film-card__row">
    <div className="film-card__reviews-col">
      <div className="review">
        <blockquote className="review__quote">
          <p className="review__text">Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director&quot;s funniest and most exquisitely designed films in years.</p>

          <footer className="review__details">
            <cite className="review__author">Kate Muir</cite>
            <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
          </footer>
        </blockquote>

        <div className="review__rating">8,9</div>
      </div>

      <div className="review">
        <blockquote className="review__quote">
          <p className="review__text">Anderson&apos;s films are too precious for some, but for those of us willing to lose ourselves in them, they&apos;re a delight. &quot;The Grand Budapest Hotel&quot; is no different, except that he has added a hint of gravitas to the mix, improving the recipe.</p>

          <footer className="review__details">
            <cite className="review__author">Bill Goodykoontz</cite>
            <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
          </footer>
        </blockquote>

        <div className="review__rating">8,0</div>
      </div>

      <div className="review">
        <blockquote className="review__quote">
          <p className="review__text">I didn&quot;t find it amusing, and while I can appreciate the creativity, it&quot;s an hour and 40 minutes I wish I could take back.</p>

          <footer className="review__details">
            <cite className="review__author">Amanda Greever</cite>
            <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
          </footer>
        </blockquote>

        <div className="review__rating">8,0</div>
      </div>
    </div>
    <div className="film-card__reviews-col">
      <div className="review">
        <blockquote className="review__quote">
          <p className="review__text">The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.</p>

          <footer className="review__details">
            <cite className="review__author">Matthew Lickona</cite>
            <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
          </footer>
        </blockquote>

        <div className="review__rating">7,2</div>
      </div>

      <div className="review">
        <blockquote className="review__quote">
          <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

          <footer className="review__details">
            <cite className="review__author">Paula Fleri-Soler</cite>
            <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
          </footer>
        </blockquote>

        <div className="review__rating">7,6</div>
      </div>

      <div className="review">
        <blockquote className="review__quote">
          <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

          <footer className="review__details">
            <cite className="review__author">Paula Fleri-Soler</cite>
            <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
          </footer>
        </blockquote>

        <div className="review__rating">7,0</div>
      </div>
    </div>
  </div>
);


const tabsMap = {
  [MovieTab.Details]:  OverviewTab,
  [MovieTab.Reviews]:  DetailsTab,
  [MovieTab.Overview]:  ReviewsTab,
};

export const MovieTabs:FC<{ film: TFilm; activeTab: `${MovieTab}` }> = ({ film, activeTab }) => {
  const { id } = film;
  const TabComponent = tabsMap[activeTab] || OverviewTab;

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {
            Object.keys(MovieTab).map((movieTabName) => (
              <li
                key={movieTabName}
                className={`film-nav__item ${activeTab === movieTabName ? 'film-nav__item--active' : ''}`}
              >
                <NavLink
                  to={`/${
                    AppRoute.Films
                      .replace(':id', String(id))
                      .replace(':tabName?', movieTabName)}`}
                  className="film-nav__link"
                >
                  {movieTabName}
                </NavLink>
              </li>
            ))
          }
        </ul>
      </nav>

      <TabComponent film={film}/>
    </div>
  );};
