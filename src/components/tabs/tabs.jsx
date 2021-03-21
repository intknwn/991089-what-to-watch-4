import React from 'react';
import {string, func} from 'prop-types';
import MovieOverview from '../movie-overview/movie-overview.jsx';
import MovieDetails from '../movie-details/movie-details.jsx';
import MovieReviews from '../movie-reviews/movie-reviews.jsx';
import reviews from '../../mocks/reviews.js';
import {Tab} from '../../const.js';
import {movieType} from '../../types/types.js';

const Tabs = ({activeTab, onTabClick, movie}) => {
  const getInfoByTab = (tabName, movieData) => {
    switch (tabName) {
      case Tab.OVERVIEW:
        return <MovieOverview movie={movieData}/>;
      case Tab.DETAILS:
        return <MovieDetails movie={movieData}/>;
      case Tab.REVIEWS:
        return <MovieReviews reviews={reviews}/>;
    }

    return <MovieOverview movie={movieData}/>;
  };

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {Object.values(Tab).map((tabName) => {
            const activeClass = activeTab === tabName ? `movie-nav__item--active` : ``;

            return (
              <li key={tabName} className={`movie-nav__item ${activeClass}`} onClick={() => onTabClick(tabName)}>
                <a href="#" className="movie-nav__link">{tabName}</a>
              </li>
            );
          })}
        </ul>
      </nav>

      {getInfoByTab(activeTab, movie)}

    </div>
  );
};

Tabs.propTypes = {
  activeTab: string.isRequired,
  onTabClick: func.isRequired,
  movie: movieType.isRequired,
};

export default Tabs;
