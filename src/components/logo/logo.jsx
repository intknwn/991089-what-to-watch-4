import React from 'react';
import {bool, string} from 'prop-types';
import {Link} from 'react-router-dom';

const Letters = () => (
  <React.Fragment>
    <span className="logo__letter logo__letter--1">W</span>
    <span className="logo__letter logo__letter--2">T</span>
    <span className="logo__letter logo__letter--3">W</span>
  </React.Fragment>
);

const Logo = ({
  className,
  isEmpty,
}) => (
  <div className="logo">
    {
      isEmpty ?
        <a href="" className={className}>
          <Letters/>
        </a> :
        <Link to="/" className={className}>
          <Letters/>
        </Link>
    }
  </div>
);

Logo.propTypes = {
  className: string.isRequired,
  isEmpty: bool,
};

export default Logo;
