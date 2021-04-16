import React from 'react';
import {arrayOf, bool} from 'prop-types';
import {Footer, Header, MoviesList} from '../components.jsx';
import {movieType, userType} from '../../types/types.js';
import {ClassName} from '../../const.js';

const MyList = ({
  isAuthorized,
  movies,
  user
}) => {
  return (
    <div className="user-page">
      <Header
        className={ClassName.USER_PAGE_HEADER}
        isAuthorized={isAuthorized}
        user={user}
      >
        <h1 className="page-title user-page__title">My list</h1>
      </Header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MoviesList
          movies={movies}
        />
      </section>
      <Footer />
    </div>
  );
};

MyList.propTypes = {
  movies: arrayOf(movieType).isRequired,
  isAuthorized: bool.isRequired,
  user: userType,
};

export default MyList;
