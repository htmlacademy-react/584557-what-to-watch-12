import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AddReviewForm } from '../../components/add-review-form/add-review-form';
import { Header } from '../../components/header/header';
import { Spinner } from '../../components/spinner/spinner';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectActiveFilm } from '../../store/active-film/selectors';
import { addCommentAction, fetchActiveFilmAction } from '../../store/api-actions';
import { TNewComment } from '../../types/comment';

const AddReview = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActiveFilmAction(Number(id)));
  }, [dispatch, id]);

  const { data, isLoading, error } = useAppSelector(selectActiveFilm);

  const addNewComment = (newCommentData: TNewComment) => {
    const { rating, comment } = newCommentData;

    if(id && rating) {
      const filmId = Number(id);
      dispatch(addCommentAction({rating, comment, filmId }));
    }
  };

  if(isLoading) {
    return <Spinner/>;
  }

  if(error) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  if(data === null) {
    return null;
  }

  const { name, backgroundImage, posterImage, rating } = data.film;

  return (
    <section className="film-card film-card--full" data-testid="add-review-page">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${(id as string)}`} className="breadcrumbs__link">{name}</Link>
              </li>

              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link">Add review</span>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm rating={rating} handleFormSubmit={addNewComment}/>
      </div>
    </section>
  );
};

export default AddReview;
