import { FormEvent, useRef } from 'react';
import { Footer } from '../../components/footer/footer';
import { Logo } from '../../components/logo/logo';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';

const SignIn = () => {
  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if(emailRef.current && passwordRef.current) {
      dispatch(
        loginAction({
          login: emailRef.current.value,
          password: passwordRef.current.value
        })
      );
    }
  };

  return (
    <div className="user-page" data-testid="sign-in">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form onSubmit={handleFormSubmit} action="#" className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input ref={emailRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" required data-testid="email"/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" required data-testid="password"/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );};

export default SignIn;
