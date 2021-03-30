import React from 'react';
import {string, func} from 'prop-types';
import MovieOverview from '../movie-overview/movie-overview.jsx';
import MovieDetails from '../movie-details/movie-details.jsx';
import MovieReviews from '../movie-reviews/movie-reviews.jsx';
import {Tab} from '../../const.js';
import {movieType} from '../../types/types.js';

const getInfoByTab = (tabName, movie) => {
  switch (tabName) {
    case Tab.OVERVIEW:
      return <MovieOverview movie={movie}/>;
    case Tab.DETAILS:
      return <MovieDetails movie={movie}/>;
    case Tab.REVIEWS:
      return <MovieReviews id={movie.id}/>;
  }

  return <MovieOverview movie={movie}/>;
};

const Tabs = ({activeTab, onTabClick, movie}) => {
  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {Object.values(Tab).map((tabName) => {
            const className = activeTab === tabName ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`;

            return (
              <li key={tabName} className={className} onClick={() => onTabClick(tabName)}>
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
