import React from 'react';
import {arrayOf, bool, node, oneOfType, string} from 'prop-types';
import {Logo, UserBlock} from '../components.jsx';
import {userType} from '../../types/types.js';
import {ClassName} from '../../const.js';

const Header = ({
  children,
  className,
  isAuthorized,
  isEmpty,
  isUserBlockDisabled,
  user,
}) => (
  <header className={className}>
    <Logo
      className={ClassName.LOGO_LINK}
      isEmpty={isEmpty}
    />
    {children}
    {
      !isUserBlockDisabled &&
      <UserBlock
        isAuthorized={isAuthorized}
        user={user}
      />
    }
  </header>
);

Header.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node
  ]),
  className: string.isRequired,
  isAuthorized: bool.isRequired,
  isEmpty: bool,
  isUserBlockDisabled: bool,
  user: userType,
};

export default Header;
