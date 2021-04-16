import React from 'react';
import {bool, func, string} from 'prop-types';
import {Footer, Header} from '../components.jsx';
import {refType, userType} from '../../types/types.js';
import {ClassName} from '../../const.js';

const SignIn = ({
  emailRef,
  error,
  isAuthorized,
  onChange,
  onSubmit,
  passwordRef,
  user
}) => {
  return (
    <div className="user-page">
      <Header
        className={ClassName.USER_PAGE_HEADER}
        isAuthorized={isAuthorized}
        isUserBlockDisabled={true}
        user={user}
      />
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={onSubmit}>
          {
            error &&
            <div className="sign-in__message">
              <p>{error}</p>
            </div>
          }
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input ref={emailRef} onChange={onChange} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input ref={passwordRef} onChange={onChange} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

SignIn.propTypes = {
  emailRef: refType.isRequired,
  error: string,
  isAuthorized: bool.isRequired,
  onChange: func.isRequired,
  onSubmit: func.isRequired,
  passwordRef: refType.isRequired,
  user: userType,
};

export default SignIn;
