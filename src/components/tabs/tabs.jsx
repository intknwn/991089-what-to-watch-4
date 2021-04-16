import React from 'react';
import {arrayOf, func, string} from 'prop-types';
import {MovieDetails, MovieOverview, MovieReviews} from '../components.jsx';
import {movieType, reviewType} from '../../types/types.js';
import {Tab} from '../../const.js';

const getInfoByTab = (tabName, movie, reviews) => {
  switch (tabName) {
    case Tab.OVERVIEW:
      return <MovieOverview movie={movie}/>;
    case Tab.DETAILS:
      return <MovieDetails movie={movie}/>;
    case Tab.REVIEWS:
      return <MovieReviews reviews={reviews}/>;
  }

  return <MovieOverview movie={movie}/>;
};

class Tabs extends React.PureComponent {

  componentDidUpdate(prevProps) {
    if (prevProps.movie.id !== this.props.movie.id) {
      this.props.activeItemChangeHandler(Tab.OVERVIEW);
    }
  }

  render() {
    const {
      activeItem: activeTab,
      activeItemChangeHandler: onTabClick,
      movie,
      reviews
    } = this.props;

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {Object.values(Tab).map((tabName) => {
              const className = activeTab === tabName ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`;
              const onTabClickHandler = (evt) => {
                evt.preventDefault();
                onTabClick(tabName);
              };

              return (
                <li key={tabName} className={className}>
                  <a href="#" className="movie-nav__link" onClick={onTabClickHandler}>{tabName}</a>
                </li>
              );
            })}
          </ul>
        </nav>

        {getInfoByTab(activeTab, movie, reviews)}

      </div>
    );
  }
}

Tabs.propTypes = {
  activeItem: string.isRequired,
  activeItemChangeHandler: func.isRequired,
  movie: movieType.isRequired,
  reviews: arrayOf(reviewType).isRequired
};

export default Tabs;
