import React from 'react';
import {bool} from 'prop-types';
import {Link} from 'react-router-dom';
import {userType} from '../../types/types.js';
import {STATIC_RESOURSES_URL} from '../../const.js';

const UserBlock = ({
  isAuthorized,
  user
}) => (
  <div className="user-block">
    {
      isAuthorized ?
        <div className="user-block__avatar">
          <Link to="/mylist"><img src={`${STATIC_RESOURSES_URL}${user.avatarSrc}`} alt={user.email} width={63} height={63} /></Link>
        </div> :
        <div className="user-block">
          <Link to="/sign-in" className="user-block__link">Sign in</Link>
        </div>
    }
  </div>
);

UserBlock.propTypes = {
  isAuthorized: bool.isRequired,
  user: userType,
};

export default UserBlock;
