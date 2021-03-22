import React from 'react';
import {func} from 'prop-types';

const ShowMoreButton = ({onClick}) => {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onClick}>Show more</button>
    </div>
  );
};

ShowMoreButton.propTypes = {
  onClick: func.isRequired,
};

export default ShowMoreButton;
