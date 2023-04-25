import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus, selectUserData } from '../../store/user-data/selectors';
import { Logo } from '../logo/logo';

export const Header:FC<{
  additionalClassName?: string;
  children?: ReactNode | undefined;
}> = ({ additionalClassName, children }) => {
  const isAuthorazed = AuthorizationStatus.Auth === useAppSelector(selectAuthorizationStatus);
  const avatarUrl = useAppSelector(selectUserData)?.avatarUrl;

  return (
    <header className={`page-header ${additionalClassName ?? ''}`}>
      <Logo />

      { children }

      {!isAuthorazed && (
        <div className="user-block">
          <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
        </div>
      )}

      {isAuthorazed && (
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img
                src={avatarUrl}
                alt="User avatar"
                width="63"
                height="63"
              />
            </div>
          </li>
          <li className="user-block__item">
            <Link to={AppRoute.Login} className="user-block__link">Sign out</Link>
          </li>
        </ul>
      )}
    </header>
  );};
